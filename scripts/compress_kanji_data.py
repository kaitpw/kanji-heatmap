from functools import reduce
import json

# -------------------
# Compress existing json
# -------------------


def compress_json(path_in, path_out):
    with open(path_in, mode="r", encoding="utf-8") as read_file:
        original_data = json.load(read_file)
        with open(path_out, mode="w", encoding="utf-8") as write_file:
            json.dump(
                original_data,
                write_file,
                indent=None,
                separators=(',', ':'),
                ensure_ascii=False
            )

OUT_DIR = "./scripts/generated"
ORIGINAL_COMPONENTS_FILE_PATH = "./original_data/kanji_components.json"
REFORMATTED_COMPONENTS_FILE_PATH = f"{OUT_DIR}/generated_kanji_reformatted_info.json"

ORIGINAL_PHONETIC_FILE_PATH = "./original_data/phonetic_components.json"
REFORMATTED_PHONETIC_FILE_PATH = f"{OUT_DIR}/generated_reformatted_phonetic.json"


compress_json(
    ORIGINAL_COMPONENTS_FILE_PATH,
    REFORMATTED_COMPONENTS_FILE_PATH
)
compress_json(
    ORIGINAL_PHONETIC_FILE_PATH ,
    REFORMATTED_PHONETIC_FILE_PATH
)

# -------------------
# COMMON HELPER FUNCTIONS
# -------------------

def to_int(str, default_value=None):
    if isinstance(str, (int)):
        return str

    if not str:
        return default_value

    try: 
        num = int(str)
        return num
    except:
        return default_value

def get_all_generic(all_, all_source_keys):

    def dig_main(source_key):
        main = all_.get(source_key, {}).get('main', None)
        if main is None:
            return None
        

        return main.strip().lower()
    
    def dig_others(source_key):
        # temporary hack, remove onces fixed
        ## TODO: Tell mikong, found a bug at rtk5100 (SHOULD be array not an array)
        if source_key == 'rtk5100':
            other = all_.get(source_key, {}).get('others', None)
            if other is not None:
                words = [word.strip().lower() for word in other.split(',')]
                return words

        raw_others = all_.get(source_key, {}).get('others', [])
        return [word.strip().lower() for word in raw_others]
    
    item_set = set(())
    for source_key in all_source_keys:
        main = dig_main(source_key)
        
        if main is not None:
            item_set.update([main])
        others = dig_others(source_key)

        item_set.update(others)
        item_set.discard('')

    item_list = list(item_set)

    if len(item_list) == 0:
        return None
    return item_list

# -------------------
# FUNCTIONS TO GET KANJI INFORMATION MINUS FREQUENCY INFO
# -------------------

def running_count_diff_GLOBAL_COUNT_UNSTABLE(a, b, c, r, pref):
    if (a and a != r) or (b and b != r) or (c and c != r):
        global global_count 
        global_count += 1
        print (global_count, pref, a, b, c)

def get_component_parts(kanji_info):
    deps = kanji_info.get('componentDependencies', {}).get('topoKanji', [])
    return deps

def get_keyword(kanji_info):
    all_ = kanji_info.get('meanings', {})
    def dig(source_key):
        return all_.get(source_key, {}).get('main', None)

    keyword = dig('kanjiKeys') \
        or dig('rtk5100') \
        or dig('davidluzgouveiaJlpt') \
        or dig('shirabeJishou') \
        or dig('waniKani')
    
    if keyword is None:
        return None

    return keyword.strip().lower()

def get_all_meanings(kanji_info):
    all_source_keys = [
        'kanjiKeys',
        'rtk5100',
        'davidluzgouveiaJlpt',
        'shirabeJishou',
        'waniKani'
    ]
    all_ = kanji_info.get('meanings', {})
    return get_all_generic(all_, all_source_keys)

def get_main_on_reading(kanji_info):
    all_ = kanji_info.get('readings', {}).get('onyomi', {})
    def dig(source_key):
        return (all_.get(source_key, {}) or {}).get('main', None)

    return dig('davidluzgouveiaJlpt') or dig('waniKani')

def get_all_on_readings(kanji_info):
    all_source_keys = [
        'davidluzgouveiaJlpt',
        'waniKani'
    ]
    all_ = kanji_info.get('readings', {}).get('onyomi', {})
    return get_all_generic(all_, all_source_keys)

def get_main_kun_reading(kanji_info):
    all_ = kanji_info.get('readings', {}).get('kunyomi', {})  
    def dig(source_key):
        return (all_.get(source_key, {}) or {}).get('main', None)

    return dig('davidluzgouveiaJlpt') or dig('waniKani')

def get_all_kun_readings(kanji_info):
    all_source_keys = [
        'davidluzgouveiaJlpt',
        'waniKani'
    ]
    all_ = kanji_info.get('readings', {}).get('kunyomi', {})
    return get_all_generic(all_, all_source_keys)

def get_jlpt(kanji_info):
    all_ = kanji_info.get('jlpt', {})
    def dig(source_key):
        return all_.get(source_key, None)
    
    a = dig('shirabeJishou') 
    b = dig('kanjiSchool')
    c = dig('davidluzgouveiaJlpt')
    r = a or b or c

    # running_count_diff_GLOBAL_COUNT_UNSTABLE(a, b, c, r, f"{kanji} jl:")
    # 416 Kanji do not match

    return r

def get_jouyou(kanji_info):
    all_ = kanji_info.get('jouyouGrade', {})
    def dig(source_key):
        return all_.get(source_key, None)

    a = dig('kanjiSchool')
    b = dig('davidluzgouveiaJlpt')

    # running_count_diff_GLOBAL_COUNT_UNSTABLE(a, b, b, a or b, f"{kanji} jy:")
    # 1437 Kanji do not match

    return a or b

def get_strokes(kanji_info):
    all_ = kanji_info.get('strokes', {})
    def dig(source_key):
        return all_.get(source_key, None)

    a = dig('topoKanji')
    b = dig('kanjiSchool')
    c = dig('davidluzgouveiaJlpt')
    r = a or b or c

    # running_count_diff_GLOBAL_COUNT_UNSTABLE(a, b, c, r, f"{kanji} sr:")
    # 96 Kanji do not match
    return r

def get_rtk_index(kanji_info):
    all_ = kanji_info.get('rtkIndex', {})
    def dig(source_key):
        return all_.get(source_key, None)
    
    return to_int(dig('rtk5100'))

def get_wanikani_lvl(kanji_info):
    return kanji_info.get('waniKani', {}).get('level', None)


DEFAULT_VAL = -1
DEFAULT_ARRAY_VAL = []
# -------------------
# FUNCTIONS TO GET FREQUENCY RANK INFORMATION
# -------------------

def get_ranks(kanji_info):
    all_ = kanji_info.get('frequency', {})
    def dig_1224(source_key):
        rank = all_.get(source_key, {}).get('rank1224', None)
        return to_int(rank)

    all_scriptin = all_.get('scriptin', {}).get('mostRecent', {})
    def dig_scriptin(source_key, rank_type_key = 'charRank'):
        rank = all_scriptin.get(source_key, {}).get(rank_type_key, None)
        return to_int(rank)

    all_ultimate = all_.get('ultimate', {})
    def dig_ultimate(source_key):
        rank = all_ultimate.get(source_key, None)
        return to_int(rank)

    rank_aozora_char = dig_scriptin('aozora') or DEFAULT_VAL
    rank_aozora_doc = dig_scriptin('aozora', 'docRank') or DEFAULT_VAL
    rank_wikipedia_char = dig_scriptin('wikipedia') or DEFAULT_VAL
    rank_wikipedia_doc = dig_scriptin('wikipedia', 'docRank') or DEFAULT_VAL
    rank_online_news_char = dig_scriptin('news') or DEFAULT_VAL
    rank_online_news_doc = dig_scriptin('news', 'docRank') or DEFAULT_VAL

    rank_netflix = dig_1224('ohTalkWhoNetflix') or DEFAULT_VAL
    rank_novels_5100 = dig_1224('rtk5100') or DEFAULT_VAL
    rank_drama_subtitles = dig_1224('chriskempsonSubtitles') or DEFAULT_VAL

    rank_google = dig_ultimate("google") or DEFAULT_VAL
    rank_kuf = dig_ultimate("kuf") or DEFAULT_VAL
    rank_mcd = dig_ultimate("mcd") or DEFAULT_VAL
    rank_bunka = dig_ultimate("bunka") or DEFAULT_VAL
    rank_kd = dig_ultimate("kd") or DEFAULT_VAL

    rank_jisho = dig_ultimate("jisho") or None
    rank_newspapers_1 = all_.get('davidluzgouveiaJlpt', None) or None
    rank_newspapers_2 = all_.get('kanjiSchool', None) or None

    # a = rank_jisho
    # b = rank_newspapers_1
    # c = rank_newspapers_2 
    # r = a or b or c
    # running_count_diff_GLOBAL_COUNT_UNSTABLE(a, b, c, r, f"{kanji} nw:")
    # only 6 kanji do not match
    # 1 飛 r: 619 580 580
    # 2 弁 r: 2077 619 619
    # 3 裁 r: 269 297 297
    # 4 逮 r: 1423 766 766
    # 5 殊 r: 1352 1361 1361
    # 6 緻 r: 2500 2460 None

    return [
    rank_aozora_char,
    rank_aozora_doc,
    rank_wikipedia_char,
    rank_wikipedia_doc,
    rank_online_news_char,
    rank_online_news_doc,
    rank_netflix,
    rank_novels_5100,
    rank_drama_subtitles,
    rank_google,
    rank_kuf,
    rank_mcd,
    rank_bunka,
    rank_kd,
    rank_jisho,
    rank_newspapers_1 ,
    rank_newspapers_2,
    ]

# -------------------
# MAIN SCRIPT HERE
# -------------------

def get_kanji_data_from_file(file_path):
    with open(file_path, mode="r", encoding="utf-8") as read_file:
        return json.load(read_file)
    
    return {}

kanji_reformatted = {}

kanji_reformatted_array_data = {}
kanji_reformatted_simple_data = {}
kanji_reformatted_freq_data = {}
kanji_reformatted_parts_data = {}

ORIGINAL_KANJI_JSON_FILE_PATH = "./original_data/kanji.json"
REFORMATTED_KANJI_FILE_PATH = f"{OUT_DIR}/generated_reformatted_kanji.json"

kanji_data = get_kanji_data_from_file(ORIGINAL_KANJI_JSON_FILE_PATH) 

kanji_list = [kanji for kanji in kanji_data.keys()]

global global_count
global_count = 0

for kanji in kanji_list:

    '''
    { [kanji]: { s: [], f: [], a: [] } }
    
    -------------
    SIMPLE DATA TYPES: string | number
    -------------
    
    0 - keyword
    1 - main_on_reading
    2 - main_kun_reading
    3 - jlpt
    4 - strokes
    5 - rtk_index
    6 - wanikani_lvl
    7 - jouyou_grade
    
    -------------
    ARRAY DATA TYPES: string[]
    -------------
    
    0 - all_meanings
    1 - all_on
    2 - all_kun 
    3 - component_parts
    
    -------------
    FREQUENCY RANK INFO: number
    -------------
    
    0  - rank_aozora_char
    1  - rank_aozora_doc
    2  - rank_online_news_char
    3  - rank_online_news_doc
    4  - rank_wikipedia_char
    5  - rank_wikipedia_doc
    6  - rank_novels_5100
    7  - rank_drama_subtitles
    8  - rank_netflix
    9  - rank_google
    10 - rank_kuf
    11 - rank_mcd
    12 - rank_bunka
    13 - rank_kd
    14 - rank_jisho
    15 - rank_newspapers_1
    16 - rank_newspapers_2
    '''

    kanji_info = kanji_data[kanji]

    simple_info = [
        get_keyword(kanji_info) or DEFAULT_VAL,
        get_main_on_reading(kanji_info) or DEFAULT_VAL,
        get_main_kun_reading(kanji_info) or DEFAULT_VAL,
        get_jlpt(kanji_info) or DEFAULT_VAL,
        get_strokes(kanji_info) or DEFAULT_VAL,
        get_rtk_index(kanji_info) or DEFAULT_VAL,
        get_wanikani_lvl(kanji_info) or DEFAULT_VAL,
        get_jouyou(kanji_info) or DEFAULT_VAL,
    ]

    component_parts = get_component_parts(kanji_info) or []
    array_info = [
        (get_all_meanings(kanji_info) or DEFAULT_ARRAY_VAL)[:],
        (get_all_on_readings(kanji_info) or DEFAULT_ARRAY_VAL)[:],
        (get_all_kun_readings(kanji_info) or DEFAULT_ARRAY_VAL)[:],
        component_parts or DEFAULT_ARRAY_VAL,
    ]

    freq_info = get_ranks(kanji_info)

    kanji_reformatted[kanji] = {
        's': simple_info, 
        'f': freq_info,
        'a': array_info
    }

    kanji_reformatted_freq_data[kanji] = freq_info
    kanji_reformatted_array_data[kanji] = array_info
    kanji_reformatted_simple_data[kanji] = simple_info
    kanji_reformatted_parts_data[kanji] = component_parts

# -----------------
# Dump Json
# -----------------

INDENT = None # 2 # None # 4
SEPARATORS = (',', ':') #None

def dump_json(file_name, data, indent=INDENT, separators=SEPARATORS):
    with open(file_name, mode="w", encoding="utf-8") as write_file:
        json.dump(data, write_file, indent=indent, separators=separators, ensure_ascii=False)

dump_json(REFORMATTED_KANJI_FILE_PATH , kanji_reformatted)
# dump_json( f"{OUT_DIR}/generated_reformatted_kanji_array_data.json", kanji_reformatted_array_data)
# dump_json( f"{OUT_DIR}/generated_reformatted_kanji_simple_data.json", kanji_reformatted_simple_data)
# dump_json( f"{OUT_DIR}/generated_reformatted_kanji_freq_data.json", kanji_reformatted_freq_data)
# dump_json( f"{OUT_DIR}/generated_reformatted_kanji_parts_data.json", kanji_reformatted_parts_data)

# -----------------
# Inspect Data 
# -----------------

def get_max_strokes(acc, kanji):
    kanji_info = kanji_data[kanji]
    strokes = get_strokes(kanji_info)
    if strokes is not None:
        return max(strokes, acc)
    return acc

def generic_get_max(retrieve_data):
    def get_max(acc, kanji):
        kanji_info = kanji_data[kanji]
        items = retrieve_data(kanji_info) or []
        new_acc = max(len(items), acc)

        if new_acc > acc:
            print(kanji, ":", items)
        return new_acc

    return get_max

print("\n. . . . . . .\n")

print("number of kanjis:", len(kanji_list))
# number of kanjis: 2427

max_strokes = reduce(get_max_strokes, kanji_list, 0)
print("max strokes count:", max_strokes)
# max strokes count: 24

print("\n. . . . . . .\n")
max_deps = reduce(generic_get_max(get_component_parts), kanji_list, 0)
print("max dependencies count:", max_deps)
# max dependencies count: 8

print("\n. . . . . . .\n")
max_on_readings = reduce(generic_get_max(get_all_on_readings), kanji_list, 0)
print("max onyomi count:", max_on_readings)

print("\n. . . . . . .\n")
max_kun_readings = reduce(generic_get_max(get_all_kun_readings), kanji_list, 0)
print("max kun count:", max_kun_readings)
# max kun count: 21

print("\n. . . . . . .\n")
max_meaning = reduce(generic_get_max(get_all_meanings), kanji_list, 0)
print("max meaning count:", max_meaning)
# max meaning count: 16

# Verify if keyword is unique
keyword_list = [
    get_keyword(kanji_data[kanji]) for kanji in kanji_list
]

print("Unique Keywords", len(set(keyword_list)))
# Unique Keywords 2423

no_keys = list(filter(lambda x: get_keyword(kanji_data[x]) is None, kanji_list))
print("No keywords:", no_keys)
# No keywords: ['呟', '睨', '頷']

# TODO: Write a function to find duplicate keyword (there is atleast one)

one_on_reading = list(filter(lambda x: len(get_all_on_readings(kanji_data[x]) or []) == 1, kanji_list))
print("number of kanjis with one onyomi reading", len(one_on_reading))
# one onyomi 1590 

one_kun_reading = list(filter(lambda x: len(get_all_kun_readings(kanji_data[x]) or []) == 1, kanji_list))
print("number of kanjis with one kunyomi reading", len(one_kun_reading))
# one kunyomi 545

# number of possible onyomi readings
def get_on_set(acc, kanji):
    kanji_info = kanji_data[kanji]
    items = get_all_on_readings(kanji_info) or []
    acc.update(items)
    return acc

def get_kun_set(acc, kanji):
    kanji_info = kanji_data[kanji]
    items = get_all_kun_readings(kanji_info) or []
    acc.update(items)
    return acc

all_on_readings = reduce(get_on_set, kanji_list, set())
print("All possible onyomi readings", len(list(all_on_readings)))
# All possible onyomi readings 338

all_kun_readings = reduce(get_kun_set, kanji_list, set())
print("All possible kunyomi readings", len(list(all_kun_readings)))
# There are many duplicates here. Need to clean up
# All possible kunyomi readings 3199
# Note that the number of kanji's with one onyomi reading is 545

# Top X onyomi readings

onyomi_counts = {}
for kanji in kanji_list:
    onyomis = get_all_on_readings(kanji_data[kanji]) or []
    for on_reading in onyomis:
        onyomi_counts[on_reading] = onyomi_counts.get(on_reading, 0) + 1

onyomi_counts_array = [ 
    { 'reading': reading , 'count': count } for reading, count in onyomi_counts.items()
]

unique_onyomi_count = len(onyomi_counts_array)
print("unique onyomis", unique_onyomi_count)

multiple_on_count = len(list(filter(lambda x: x['count'] > 1, onyomi_counts_array)))
single_on_count = len(list(filter(lambda x: x['count'] <= 1, onyomi_counts_array)))

print("onyomi with multiple kanjis", multiple_on_count) 
print("onyomi with single kanji", single_on_count) 

def sort_func(item):
    return item['count']

# An array of items { kanji, count, fraction, cum_use } now sorted by frequency, most frequent at the top 
onyomi_counts_array.sort(key=sort_func, reverse=True)

print("{:<10} {:<15}".format('On Reading','Count'))

# mapping count of onyomi reading
for item in onyomi_counts_array[:50]:
    print("{:<10} {:<15}".format(item['count'], item['reading']))

# -----------------
# Questions to Answer
# -----------------

# TODO: Check which have null data and populate them manually
# TODO: How much KB will be saved if we remove main_on and main_kun since they're redundant information? 
# TODO: Check is (1) jlpt, (2)jouyou, (3)strokes etc.. match for all sources or if there is a disrepancy
# TODO: What are the maximum number of readings for single kanji?

# Index DB MAIN STORES
# 1. kanji_info: Kanji -> General Information and Frequency Information
# 2. parts_info: Part_Component -> Keyword
# 3. phonetic_info: Phonetic_Part_Component -> Onyomi
# 4. TODO: vocab_info kanji -> [[word, spacedKana, definition]]
# 5. TODO: notes_info kanji -> Notes 
# 6. TODO: cumulative_use_info
