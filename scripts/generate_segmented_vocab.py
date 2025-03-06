import json
import re
import sys

# --- Utility functions ---

def is_kanji(ch):
    # Check if the character is in the CJK Unified Ideographs block.
    return '\u4e00' <= ch <= '\u9faf'

def katakana_to_hiragana(text):
    # Convert katakana characters (fullwidth) to hiragana.
    return ''.join(chr(ord(ch) - 0x60) if 'ァ' <= ch <= 'ン' else ch for ch in text)

def normalize_reading(r):
    # First convert to hiragana.
    r = katakana_to_hiragana(r)
    # Remove punctuation used to mark okurigana boundaries (e.g. dots and hyphens).
    return re.sub(r'[\.-]', '', r)

# --- Load the JSON files ---

with open("./scripts/generated/readings.json", "r", encoding="utf-8") as f:
    raw_readings = json.load(f)

with open("./scripts/generated/vocab.json", "r", encoding="utf-8") as f:
    raw_vocab = json.load(f)

# --- Preprocess the readings ---
# Build a dictionary mapping each kanji to a set of its candidate readings (all in hiragana, normalized).
readings_dict = {}
for kanji, data in raw_readings.items():
    # data is expected to be a dict with keys "on" and "kun"
    candidates = set()
    for reading_list in data.get("on", []):
        for r in reading_list:
            candidates.add(normalize_reading(r))
    for reading_list in data.get("kun", []):
        for r in reading_list:
            candidates.add(normalize_reading(r))
    readings_dict[kanji] = candidates

# --- Preprocess the vocab readings ---
# Convert all vocab readings to hiragana.
vocab = {word: katakana_to_hiragana(pron) for word, pron in raw_vocab.items()}

# --- Segmentation function ---

def segment_word(word, reading, readings_dict):
    # If the word is entirely kana, leave it as is.
    if all(not is_kanji(ch) for ch in word):
        return reading

    # Split the word into segments: a segment is either
    #   - a kanji followed by zero or more kana (the okurigana), or
    #   - a standalone kana character.
    segments = []
    i = 0
    while i < len(word):
        if is_kanji(word[i]):
            seg = word[i]
            i += 1
            # Append following kana (if any) as part of the segment.
            while i < len(word) and not is_kanji(word[i]):
                seg += word[i]
                i += 1
            segments.append(seg)
        else:
            # For non-kanji, treat each character as its own segment.
            segments.append(word[i])
            i += 1

    # Backtracking function: try to partition 'reading' (starting at index r_idx)
    # into parts corresponding to segments[seg_idx:].
    results = []
    def backtrack(seg_idx, r_idx, current):
        if seg_idx == len(segments) and r_idx == len(reading):
            results.append(current)
            return
        if seg_idx >= len(segments) or r_idx > len(reading):
            return

        seg = segments[seg_idx]
        # If the segment starts with a kanji and that kanji exists in readings_dict,
        # try to match a candidate reading for that kanji.
        if is_kanji(seg[0]) and seg[0] in readings_dict:
            kanji = seg[0]
            okuri = seg[1:]  # trailing kana, if any (may be empty)
            # Determine how many characters we must match for the okurigana (if present)
            okuri_len = len(okuri)
            # Try all possible splits for the part coming from the kanji.
            # We require that the segment of reading from r_idx can be divided into:
            #   X (the candidate part for the kanji) + Y (which must equal okuri if okuri exists)
            for split in range(1, len(reading) - r_idx - okuri_len + 1):
                X = reading[r_idx:r_idx+split]
                Y = reading[r_idx+split:r_idx+split+okuri_len] if okuri_len > 0 else ""
                if okuri and Y != okuri:
                    continue
                seg_reading = X + (" " + okuri if okuri else "")
                full_piece = X + okuri  # the total reading for this segment
                # Check if X (or full_piece) is acceptable:
                # We allow X to be an exact candidate or a prefix of one of the candidate readings.
                candidates = readings_dict.get(kanji, set())
                if any(cand.startswith(X) for cand in candidates):
                    # Also, if okuri is present, optionally require that the full piece (X+okuri)
                    # is either exactly one of the candidates or a prefix.
                    if okuri and not any(cand.startswith(full_piece) for cand in candidates):
                        continue
                    # Proceed to next segment.
                    backtrack(seg_idx + 1, r_idx + split + okuri_len, current + [seg_reading])
        else:
            # For segments that are not a kanji (or if we lack reading data for it), we assume the segment is written in kana.
            L = len(seg)
            if reading[r_idx:r_idx+L] == seg:
                backtrack(seg_idx+1, r_idx+L, current + [seg])
    backtrack(0, 0, [])
    if results:
        # Use the first valid segmentation result.
        return " ".join(results[0])
    else:
        # If no segmentation was found, return the original reading.
        return reading

# --- Process the vocab entries ---

segmented_vocab = {}
for word, pron in vocab.items():
    # If the word consists of a single character (or all one kanji) then we can leave it unchanged
    # (or you could choose to segment further if you like).
    if len(word) == 1:
        segmented_vocab[word] = pron
    else:
        segmented = segment_word(word, pron, readings_dict)
        segmented_vocab[word] = segmented

# --- Write the result to a new JSON file ---
with open("./scripts/segmented_vocab.json", "w", encoding="utf-8") as f:
    json.dump(segmented_vocab, f, ensure_ascii=False, indent=2)

print("Generated segmented_vocab.json")

'''
Out of 3,764 vocabulary entries that contain at least one kanji (and are longer than one character),
the script was able to segment 2,683 of them (i.e. inserted spaces to show the segmentation), while for 1,081 
words it was unable to confidently split the reading (so those entries were left unchanged).
'''


def is_kanji(ch):
    return '\u4e00' <= ch <= '\u9faf'

def split_word_into_segments(word):
    """
    Splits a word into segments where each segment is defined as:
      - a kanji character optionally followed by one or more kana (okurigana)
    Non-kanji (pure kana) parts are ignored since we only want to map kanji.
    """
    segments = []
    i = 0
    while i < len(word):
        if is_kanji(word[i]):
            seg = word[i]
            i += 1
            # Collect trailing kana (non-kanji)
            while i < len(word) and not is_kanji(word[i]):
                seg += word[i]
                i += 1
            segments.append(seg)
        else:
            # Skip any standalone kana
            i += 1
    return segments

def map_kanji_to_reading(word, spaced_reading):
    """
    Given a vocabulary word and its spaced reading (e.g. "三人" -> "さん にん" or
    "立つ" -> "た つ"), returns a mapping from each kanji (the first character of each segment)
    to the reading candidate for that kanji.
    
    For segments with okurigana (i.e. more than one character), it assumes that the spaced reading
    was produced by splitting into two parts: the first part is the candidate reading for the kanji,
    and the second is the okurigana (which we ignore in the mapping).
    
    Returns None if the reading parts do not align.
    """
    segments = split_word_into_segments(word)
    reading_parts = spaced_reading.split()
    mapping = {}
    i = 0  # index in reading_parts
    for seg in segments:
        # Only process segments that start with a kanji
        if is_kanji(seg[0]):
            if len(seg) == 1:
                # segment with a single kanji: expect one reading part
                if i < len(reading_parts):
                    mapping[seg[0]] = reading_parts[i]
                    i += 1
                else:
                    return None
            else:
                # segment with kanji + okurigana: expect two reading parts.
                if i + 1 < len(reading_parts):
                    mapping[seg[0]] = reading_parts[i]  # assign only the first reading part
                    i += 2
                else:
                    return None
    # It is acceptable if not all reading parts are used (extra parts might correspond to non-kanji segments).
    return mapping

# --- Load the segmented_vocab.json file ---
with open("./scripts/generated_segmented_vocab.json", "r", encoding="utf-8") as f:
    segmented_vocab = json.load(f)

kanji_to_reading = {}
parsed_count = 0
not_parsed_count = 0
total_words_with_kanji = 0

for word, spaced_reading in segmented_vocab.items():
    # Only consider words that contain at least one kanji and are longer than one character.
    if any(is_kanji(ch) for ch in word) and len(word) > 1:
        total_words_with_kanji += 1
        mapping = map_kanji_to_reading(word, spaced_reading)
        if mapping is not None:
            kanji_to_reading[word] = mapping
            parsed_count += 1
        else:
            not_parsed_count += 1
    else:
        # For words with a single character (or no kanji), we skip or could include as-is.
        continue

# Write the resulting mapping to a new JSON file.
with open("./scripts/generated/kanji_reading_map.json", "w", encoding="utf-8") as f:
    json.dump(kanji_to_reading, f, ensure_ascii=False, indent=2)

print("Generated kanji_reading_map.json.json")
print("Total words with kanji (and expected segmentation):", total_words_with_kanji)
print("Successfully parsed:", parsed_count)
print("Unable to parse:", not_parsed_count)

"""
Total words with kanji (and expected segmentation): 3764
Successfully parsed: 2765
Unable to parse: 999
"""