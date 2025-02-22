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

### Simple Data Types

0. keyword
1. main_on_reading
2. main_kun_reading
3. jlpt
4. strokes
5. rtk_index
6. wanikani_lvl
7. jouyou_grade

### Array Data Types

1. all_meanings
2. all_kun
3. all_on
4. component_parts

### Frequency Info

1. rank_aozora_char
2. rank_online_news_char
3. rank_wikipedia_char
4. rank_aozora_doc
5. rank_online_news_doc
6. rank_wikipedia_doc
7. rank_novels_5100
8. rank_drama_subtitles
9. rank_netflix
10. rank_newspapers_1
11. rank_newspapers_2
12. rank_google
13. rank_kuf
14. rank_mcd
15. rank_bunka
16. rank_jisho
17. rank_kd

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

### `useKanjiCache()`

1. `getKanjiInfo()`

- returns all information from `kanji-info` object store given a kanji, and if `phoneticComponent` exists, also return `phonetic: { kanji, kana }`

2. `getPartComponentMeaning()`

- given an array of part_component return an array of corresponding keyword

3. `getKanjiVocab()`

- Given a kanji, return all information from the `vocab_info` store, which is `{word, meaning, spacedKana }[]`

Kanji Cache looks like this:

```
{
    phonetic: { [part_component]: reading }
    part_component_keyword: { [part_component]: keyword }
    kanjiInfo: {
        [kanji]:
            {
                mainInfo: {},
                vocab: { definition, spacedKana, word }[]
        }
    }
    computed: {
        [kanji]:
            {
                dependentKanjis: [],
                similarKanjis: [],
            }
        }
    }
}
```

### `useVennDiagramCache()`

- Caches `getVennDiagramCount()` and `getVennDiagramOverlap()`

### `useCumulativeUseDataCache()`

- Return cumulative information

## Kanji Card Summary

Contains

## Kanji Drawer

Aside from the main card. The drawer will have the following sections

1. General
2. Notes
3. Selected Vocabulary
4. Stroke Order Animation
5. Frequency Rank
6. Related Kanji

## Settings

```ts

sortSettings =  {
	primary: 'JLPT',
	secondary: 'RTK Index'
}

filterSettings = {
	strokeRange: { min: 10, max: 30 }
	jlpt: ['N1'],
	freq: {
	    source: 'Netflix',
	    rankRange: { min: 0, max: 250 }
	}
}

cardSettings = {
	cardType: 'expanded'
	borderMeaning: 'jlpt' | null
	backgroundMeaning: 'freq-netflix' | null
}

searchSettings = {
    type: 'Keyword', 'Onyomi', 'Kunyomi', 'Part Component', 'Meaning'
    text: "Shou"
}
```

### Venn Diagram Page

```ts
{
  source: {
    A: 'Netflix'
    B: 'Wikipedia',
    C: 'Twitter',
  },
  maxRank: 50,
  vennDiagramSelected: 'A intersection B'
}
```

## Data Generation

Run the script to generate data

```python
python ./scripts/compress_kanji_data.py
```

## Questions to Answer

1. How many kanji are there with just one onyomi reading?
2. What are the maximum number of readings for single kanji?
3. Is it better to use `idb` or `idb-keyval`, how do I deal with indexdb upgrade when two tabs are open?

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
- Make Venn Diagram Page
- Make Cumulative Use Page
- Add a combo box for searching for onyomi readings
- Add pictures for each notes of each Kanji
- Handle the issue with having multiple tabs open with different indexdb versions
- Allow search by:
  - Meaning
  - Part Component
  - Phonetic Component
  - Visually Similar
- Allow use of custom colors for card background and JLPT border

**🛠️🛠️Bugs To Fix🛠️🛠️**

- 🪲🐞 Some fonts don't load when app is installed and is working offline

## Generating PWA Manifest

- https://maskable.app/
- https://favicon.io
- https://redketchup.io/icon-converter
- https://vite-pwa-org.netlify.app/assets-generator/
- https://progressier.com/pwa-manifest-generator
