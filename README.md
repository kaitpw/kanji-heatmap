# Kanji Companion

## Kanji Information (found in `kanji` object store)

### Information that can be computed on the fly

1. `ultimate_average_rank` = `(goog + kuf + mcd + bunka + jisho + kd + wkfr) / 7`
2. `ultimate_average_weighted` = `( 2 * goog + 2 * kuf + 2 * bunka + mcd + jisho + kd + wkfr ) / 10`
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
