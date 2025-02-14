import json

# Get Twitter Frequency Rank for Each Kanji 

# Build Data 
'''
----------------
kanji_main_info_json
----------------

1. main meaning
2. main on 
3. main kun
4. jlpt
5. stroke
6. rtk
7. wanikani

kanji_main_info[kanji] = [
    meaning,
    on_reading,
    kun_reading,
    jlpt,
    strokes,
    rtk_index
]

----------------
kanji_frequency_info.json
----------------

1 to 6. aozora, online news and wikipedia - https://github.com/scriptin/kanji-frequency/
7. zcanning 5100 Novels - https://drive.google.com/file/d/1zbClv0H5VgswEDAkVmF3ikiVnoi6yGsW/view, https://www.reddit.com/r/LearnJapanese/comments/fhx27j/comment/fkdyksq/
8. drama subtitles - https://github.com/Matchoo95/JP-Subtitles, https://github.com/chriskempson/japanese-subtitles-word-kanji-frequency-lists
9. netflix - OhTalkWho オタク - https://www.youtube.com/watch?v=DwJWld8hW0M 
10. newspapers 1 - https://github.com/Lemmmy/KanjiSchool/blob/master/src/data/jisho-data.json
11. newspapers 2 - https://github.com/davidluzgouveia/kanji-data
12 rank_twitter - https://github.com/scriptin/kanji-frequency/

[
    rank_aozora_char,
    rank_online_news_char,
    rank_wikipedia_char,
    rank_aozora_doc,
    rank_online_news_doc,
    rank_wikipedia_doc,
    rank_fiction_5100,
    rank_drama_subtitles,
    rank_netflix,
    rank_newspapers_1,
    rank_newspapers_2,
    rank_twitter,
]
'''

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

# -------------------
# FUNCTIONS TO GET MAIN INFORMATION
# -------------------
def get_meaning(kanji_info):
    all_ = kanji_info.get('meanings', {})
    def dig(source_key):
        return all_.get(source_key, {}).get('main', None)

    return dig('kanjiKeys') \
        or dig('rtk5100') \
        or dig('davidluzgouveiaJlpt') \
        or dig('shirabeJishou')

def get_on_reading(kanji_info):
    all_ = kanji_info.get('readings', {}).get('onyomi', {})
    def dig(source_key):
        return (all_.get(source_key, {}) or {}).get('main', None)

    return dig('davidluzgouveiaJlpt')

def get_kun_reading(kanji_info):
    all_ = kanji_info.get('readings', {}).get('kunyomi', {})  
    def dig(source_key):
        return (all_.get(source_key, {}) or {}).get('main', None)

    return dig('davidluzgouveiaJlpt')

def get_jlpt(kanji_info):
    all_ = kanji_info.get('jlpt', {})
    def dig(source_key):
        return all_.get(source_key, None)
    
    return dig('shirabeJishou') or dig('davidluzgouveiaJlpt') or dig('kanjiSchool')

def get_strokes(kanji_info):
    all_ = kanji_info.get('strokes', {})
    def dig(source_key):
        return all_.get(source_key, None)
    
    return dig('topoKanji') or dig('davidluzgouveiaJlpt') or dig('kanjiSchool')

def get_rtk_index(kanji_info):
    all_ = kanji_info.get('rtkIndex', {})
    def dig(source_key):
        return all_.get(source_key, None)
    
    return to_int(dig('rtk5100'))

# -------------------
# FUNCTIONS TO GET FREQUENCY RANK INFORMATION
# -------------------

'''
1 frequency - drama subtitles rank
2 frequency - netflix rank
3 frequency - fiction 5100 rank
4 frequency - aozora document rank
5 frequency - aozora character rank
6 frequency - online news document rank
7 frequency - online news character rank
8 frequency - wikipedia document rank
9 frequency - wikipedia character rank
10 frequency - twitter rank
11 frequency - newspaper rank (kanji school)
'''



def get_ranks(kanji_info):
    all_ = kanji_info.get('frequency', {})
    def dig_1224(source_key):
        rank = all_.get(source_key, {}).get('rank1224', None)
        return to_int(rank)

    all_scriptin = all_.get('scriptin', {}).get('mostRecent', {})
    def dig_scriptin(source_key, rank_type_key = 'charRank'):
        rank = all_scriptin.get(source_key, {}).get(rank_type_key, None)
        return to_int(rank)
    
    rank_aozora_char = dig_scriptin('aozora')  or '❌'
    rank_online_news_char = dig_scriptin('news') or '❌'
    rank_wikipedia_char = dig_scriptin('wikipedia') or '❌'
    rank_aozora_doc = dig_scriptin('aozora', 'docRank') or '❌'
    rank_online_news_doc = dig_scriptin('news', 'docRank') or '❌'
    rank_wikipedia_doc = dig_scriptin('wikipedia', 'docRank')     or '❌'
    rank_fiction_5100 = dig_1224('rtk5100') or '❌'
    rank_drama_subtitles = dig_1224('chriskempsonSubtitles') or '❌'
    rank_netflix = dig_1224('ohTalkWhoNetflix') or '❌'
    rank_newspapers_1 = all_.get('davidluzgouveiaJlpt', None) or '❌'
    rank_newspapers_2 = all_.get('kanjiSchool', None) or '❌'

    return [
        rank_aozora_char,
        rank_online_news_char,
        rank_wikipedia_char,
        rank_aozora_doc,
        rank_online_news_doc,
        rank_wikipedia_doc,
        rank_fiction_5100,
        rank_drama_subtitles,
        rank_netflix,
        rank_newspapers_1,
        rank_newspapers_2,
    ]
    

def get_sorted_by_twitter_occurence(kanji_data):
    def get_twitter_occurrence(kanji):
        return kanji_data[kanji].get('frequency', {}).get('scriptin', {}).get('year2015',{}).get('twitter', {}).get('occurence', 0)

    kanji_count_pairs = [{'kanji': kanji , 'count': get_twitter_occurrence(kanji) } for kanji in kanji_data.keys()]

    def sortFunc(item):
        return item['count']

    kanji_count_pairs.sort(key=sortFunc, reverse=True)

    twitter_freq_ranks = {}
    for idx, item in enumerate(kanji_count_pairs):
        twitter_freq_ranks[item['kanji']] = { 'rank': idx, 'count': item['count'] }

    return twitter_freq_ranks

    



# -------------------
# MAIN SCRIPT HERE
# -------------------

kanji_main_info = {}
kanji_frequency_rank_info = {}
kanji_list = []

with open("./src/db/kanji.json", mode="r", encoding="utf-8") as read_file:
    kanji_data = json.load(read_file);
    kanji_list = [x for x in kanji_data.keys()]

    # -----------
    # Main Info
    # -----------

    for kanji in kanji_list:
        kanji_info = kanji_data[kanji]

        meaning = get_meaning(kanji_info) or '❌'
        on_reading = get_on_reading(kanji_info) or '❌'
        kun_reading = get_kun_reading(kanji_info) or '❌'
        jlpt = get_jlpt(kanji_info) or '❌'
        strokes = get_strokes(kanji_info) or '❌'
        rtk_index = get_rtk_index(kanji_info) or '❌'

        # TODO: include wanikani level as well


        kanji_main_info[kanji] = [
            meaning,
            on_reading,
            kun_reading,
            jlpt,
            strokes,
            rtk_index
        ]
    # -----------
    # Frequency Info
    # -----------
    twitter_freq_data = get_sorted_by_twitter_occurence(kanji_data)
    for kanji in kanji_list:
        kanji_info = kanji_data[kanji]
        kanji_frequency_rank_info[kanji] = get_ranks(kanji_info)
        kanji_frequency_rank_info[kanji].append(twitter_freq_data[kanji]['rank'])

with open("./scripts/generated/generated_kanji_twitter_freq.json", mode="w", encoding="utf-8") as write_file:
    json.dump(twitter_freq_data, write_file, indent=2, ensure_ascii=False)


with open("./scripts/generated/generated_kanji_list.json", mode="w", encoding="utf-8") as write_file:
    json.dump(kanji_list, write_file, indent=2, ensure_ascii=False)

with open("./scripts/generated/generated_kanji_main.json", mode="w", encoding="utf-8") as write_file:
    json.dump(kanji_main_info, write_file, indent=2, ensure_ascii=False)

with open("./scripts/generated/generated_kanji_freq.json", mode="w", encoding="utf-8") as write_file:
    json.dump(kanji_frequency_rank_info, write_file, indent=2, ensure_ascii=False)