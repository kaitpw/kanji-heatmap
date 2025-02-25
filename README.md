# Kanji Companion

## Indexeddb Stores

```
1. kanji_info: Kanji -> General Information and Frequency Information
2. parts_info: Part_Component -> Keyword
3. phonetic_info: Phonetic_Part_Component -> Onyomi
4. vocab_info kanji -> [[word, spacedKana, definition]]
5. notes_info kanji -> Notes (coming soon)
6. cumulative_use_info
```

1. The first store `kanji_info` contains information used potentially for "searching, sorting and filtering".
   Note that `vocab_info` and `notes_info` are not use for this purpose which is why they're stored separately.

2. `cumulative_use_info` is only used in the `Cumulative Use Graph` page

## Kanji Information (found in `kanji` object store)

### MAIN DATA

0 - keyword
1 - main_on_reading
2 - main_kun_reading
3 - jlpt

### SECONDARY DATA

0 - rtk_index
1 - wanikani_lvl
2 - strokes
3 - component_parts
4 - jouyou_grade
5 - all_meanings
6 - all_on
7 - all_kun

### FREQUENCY DATA

0 - rank_aozora_char
1 - rank_aozora_doc
2 - rank_online_news_char
3 - rank_online_news_doc
4 - rank_wikipedia_char
5 - rank_wikipedia_doc
6 - rank_novels_5100
7 - rank_drama_subtitles
8 - rank_netflix
9 - rank_google
10 - rank_kuf
11 - rank_mcd
12 - rank_bunka
13 - rank_kd
14 - rank_jisho

### MAIN VOCAB DATA and SECONDARY VOCAB DATA

`{ word, spacedKana, meaning}[]`

### Notes

`string`

### Information that can be computed on the fly

**Additional Frequency Information**

1. `ultimate_average_rank` = `(goog + kuf + mdc + bunka + jisho + kd + wkfr) / 7`
2. `ultimate_average_weighted` = `( 2 * goog + 2 * kuf + 2 * bunka + mdc + jisho + kd + wkfr ) / 10`
3. `ultimate_rank_weighted5` = `(2 * goog + 3 * kuf + 2 *  mcd + 2 * bunka + jisho ) / 10`
4. Frequency star IE: `5⭐`.

- `5⭐` - top 250
- `4⭐` - top 251 - 500
- `3⭐` - top 501 - 750
- `2⭐` - top 751 - 1250
- `1⭐` - top 1251 - 2000
- `0⭐` - top 2000+

**Miscellaneous**

1. Dependent Kanjis

- Given kanji `A` loop through each kanji `B` and check its `part_components` array. If kanji `A` is a `part_component` of `B` then include in the list of dependent kanjis.

2. Similar Kanjis

- Given kanji `A`, check `part components of A` loop through each kanji `B` and look at `parts components of B`.If they have overlapping part components then this is a similar kanji. Then sort this list of kanjis by the difference of their stroke count. Then, given the difference in stroke count, sort by number of overlapping components they have. Get only the top 10.
- This algorithm can be tweaked in the future.

## JSON FILE SEGREGATION

In order of priority

1 - main kanji data
2 - part-component => keyword
3 - semantic-component => reading 4. ex
5 - secondary_kanji_data
6 - secondary_vocab_data
7 - notes

## Web Worker Functions

### Priority 0

1. `getKanjiItems()`

- Returns a list of kanjis given "search, sort, and filter settings"

2. `getKanjiItemsCount()`

- Returns the count of kanjist that match the "search, sort, and filter settings"

3. `getRelatedKanji()`

- Given a kanji returns `{ similarKanji: [], dependentKanjis: [] }`

### Priority 1

1. `getVennDiagramCount()`

- Given three frequency ranks data source `A`, `B`, `C`, returns seven numbers - the count for each possible overlaps `A intersect B`, `A intersect B - C` etc.

2. `getVennDiagramOverlap()`

- Given one of the seven possible overlaps, return the list of kanjis

## Caching

### `useVennDiagramCache()`

- Caches `getVennDiagramCount()` and `getVennDiagramOverlap()`

## Data Generation

Run the script to generate data

```python
python ./scripts/compress_kanji_data.py
```

## Features To Do

### Priority

- ✅ Make app `PWA` including adding icons for manifest
- Populate index db with kanji information using a loading screen at the beginning of page load if it doesn't exist yet
- Create the cache hooks listed above to retrieve kanji information from index db
- Make sorting and filtering work with web workers
- Put sorting and item presentation settings in local storage
- Add debouncing for text search
- Make text search work with webworkers and fuzzy search
- Design "expanded item card" layout
- Improve hovercard kanji
- Make the following sections
  - General Info
  - Frequency Ranks
  - Stroke Order Animation
  - Related Kanji
  - Notes
  - Selected Vocabulary
- Add description and links for each Frequency Rank Source

### Not priority

- Add error boundaries
- Add better descriptions for navigation items
- Add links and better descriptions for frequency rank data source options
- ✅ When selecting JLPT in filtering selection box display corresponding color for JLPT
- Add icons for frequency rank options
- Use new fonts and improve fonts and font optimization with japanese fonts
- Add a combo box for searching for onyomi readings
- Add pictures for each notes of each Kanji
- Handle the issue with having multiple tabs open with different indexdb versions
- Allow search by:
  - Meaning
  - Part Component
  - Phonetic Component
  - Visually Similar
- Allow use of custom colors for card background and JLPT border

### Pages

- Make Venn Diagram Page
- Make Cumulative Use Page (multiline chart)
- Make page for certain kanji collections
  1. Kanjis with only one kun reading
  2. Kanjis with only one on reading
  3. On reading with only one kanji
  4. Kun reading with only one kanji
- Make page for bar graph mapping field to count
  1. on reading -> kanji count (max less than 400)
  2. dependencies -> kanji count (max 8)
  3. stroke -> kanji count (max 24)

**🛠️🛠️Bugs To Fix🛠️🛠️**

- 🪲🐞 Some fonts don't load when app is installed and is working offline

## Generating PWA Manifest

- https://maskable.app/
- https://favicon.io
- https://redketchup.io/icon-converter
- https://vite-pwa-org.netlify.app/assets-generator/
- https://progressier.com/pwa-manifest-generator
