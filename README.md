# Kanji Companion

## Data Generation

Run the script to generate data

```python
python ./scripts/compress_kanji_data.py
```

## Information that can be computed on the fly

1. `ultimate_average_rank` = `(goog + kuf + mcd + bunka + jisho + kd + wkfr) / 7`
2. `ultimate_average_weighted` = `( 2 * goog + 2 * kuf + 2 * bunka + mcd + jisho + kd + wkfr ) / 10`
3. `ultimate_rank_weighted5` = `(2 * goog + 3 * kuf + 2 *  mcd + 2 * bunka + jisho ) / 10`
4. Frequency star for example `5⭐`.

- `5⭐` - top 250
- `4⭐` - top 251 - 500
- `3⭐` - top 501 - 750
- `2⭐` - top 751 - 1250
- `1⭐` - top 1251 - 2000
- `0⭐` - top 2000+

* Note the segregation and cut-offs is not finalized yet

**Miscellaneous**

1. Dependent Kanjis

- Given kanji `A` loop through each kanji `B` and check its `part_components` array. If kanji `A` is a `part_component` of `B` then include in the list of dependent kanjis.

2. Similar Kanjis

- Given kanji `A`, check `part components of A` loop through each kanji `B` and look at `parts components of B`.If they have overlapping part components then this is a similar kanji. Then sort this list of kanjis by the difference of their stroke count. Then, given the difference in stroke count, sort by number of overlapping components they have. Get only the top 10.
- This algorithm can be tweaked in the future.

## Pages (Coming Soon)

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
