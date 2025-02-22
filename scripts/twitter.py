import json


def get_sorted_by_twitter_occurence_data(kanji_data):

    def get_twitter_data(kanji):
        all_ = kanji_data[kanji].get('frequency', {}).get('scriptin', {}).get('year2015',{}).get('twitter', {})
        fraction =  all_.get('fraction', 0)

        result = {
            'kanji': kanji,
            'fraction': fraction,
            'count': all_.get('occurence', 0),
        }
        return result

    twitter_array = [get_twitter_data(kanji) for kanji in kanji_data.keys()]

    def sort_func(item):
        return item['count']

    running_cum_use = 0
    def include_rank(pair):
        [rank, item] = pair

        nonlocal running_cum_use 
        fraction = item['fraction'] 
        running_cum_use += fraction

        item['rank'] = rank + 1
        item['cum_use'] = running_cum_use
        return item

    # An array of items { kanji, count, fraction, cum_use } now sorted by frequency, most frequent at the top 
    twitter_array.sort(key=sort_func, reverse=True)
    twitter_array_with_rank = [include_rank(pair) for pair in enumerate(twitter_array)]
    return twitter_array_with_rank

 # { kanji, count }[]
def build_twitter_dictionary(twitter_array):
    twitter_freq_ranks = {}
    # A dictionary where key=kanji value={ rank, count, occurence, cum_use }
    for item in twitter_array:
        twitter_freq_ranks[item['kanji']] = { 'rank': item['rank'], 'count': item['count'] }

    return twitter_freq_ranks


# -------------------
# MAIN SCRIPT HERE
# -------------------

kanji_main_info = {}
kanji_frequency_rank_info = {}
kanji_list = []

ORIGINAL_KANJI_JSON = "./original_data/kanji.json"

with open(ORIGINAL_KANJI_JSON, mode="r", encoding="utf-8") as read_file:
    kanji_data = json.load(read_file);
    kanji_list = [kanji for kanji in kanji_data.keys()]
    print("number of kanjis:", len(kanji_list))

    # -----------
    # Main Info
    # -----------

    for kanji in kanji_list:
        kanji_info = kanji_data[kanji]

    twitter_freq_array = get_sorted_by_twitter_occurence_data(kanji_data)
    twitter_freq_data = build_twitter_dictionary(twitter_freq_array)
    
    print(twitter_freq_array)
    print(twitter_freq_data)