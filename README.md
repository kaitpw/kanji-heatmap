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

**Miscellaneous**

1. Dependent Kanjis

- Given kanji `A` loop through each kanji `B` and check its `part_components` array. If kanji `A` is a `part_component` of `B` then include in the list of dependent kanjis.

2. Similar Kanjis

- Given kanji `A`, check `part components of A` loop through each kanji `B` and look at `parts components of B`.If they have overlapping part components then this is a similar kanji. Then sort this list of kanjis by the difference of their stroke count. Then, given the difference in stroke count, sort by number of overlapping components they have. Get only the top 10.
- This algorithm can be tweaked in the future.
