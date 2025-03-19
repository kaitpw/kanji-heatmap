# Kanji Heatmap (previously Kanji Companion)

![main page](./IMG/preview.png)

| ![kanji details](./IMG/kanji-details.png) | ![mobile screen](./IMG/kanji-expanded.png) |
| ----------------------------------------- | ------------------------------------------ |
|                                           |                                            |

![sort and filter dialog](./IMG/sort-dialog.png)

## Data (Re) Generation

```
$ cd ./DATA-SCRIPTS

# inspect input data
$ python3 ./kanji_inspect.py
$ ls -la ./original_data/*.json
 12154421 ./original_data/MERGED_KANJI.json
      356 ./original_data/PIKAPIKAGEMS_KEYWORDS.json
       63 ./original_data/PIKAPIKAGEMS_PARTS_OVERRIDE.json
    11318 ./original_data/cum_use.json
  1686914 ./original_data/kanji_to_vocabulary.json
     2183 ./original_data/missing_components.json
     2693 ./original_data/phonetic_components.json

# generate output jsons from input `./DATA-SCRIPTS/original_data/*`
$ python3 ./kanji_build_output_jsons.py
$ ls -la ./generated/*.json
  1759 component_keyword.json
  2118 cum_use.json
392623 kanji_extended.json
284748 kanji_main.json
  2187 phonetic.json
512324 vocabulary.json

# copy to public folder
$ cp ./generated/*.json ../public/json/

# Check if everything is working
$ cd ..
$ pnpm install
$ pnpm run peek
  ➜  Local:   http://localhost:4173/
  ➜  Network: http://192.168.254.107:4173/
  ➜  press h + enter to show help
```

## Talk to Us

- [Discord](https://discord.gg/Ash8ZrGb4s)
- [Ko-Fi](https://ko-fi.com/minimithi")
