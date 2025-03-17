# Kanji Heatmap (previously Kanji Companion)

![main page](./IMG/preview.png)

| ![kanji details](./IMG/kanji-details.png) | ![mobile screen](./IMG/kanji-expanded.png) |
| ----------------------------------------- | ------------------------------------------ |
|                                           |                                            |

![sort and filter dialog](./IMG/sort-dialog.png)

## Data Generation

Merged scraped data can be found on `./DATA-SCRIPTS/original_data/`

- `kanji.json`
- `kanji_to_vocabulary.json`
- `missing_components.json`
- `composition.json`
- `cum_use.json`
- `PIKAPIKAGEMS_KEYWORDS.json`

--- 🚧 🚧 WIP TODO: Write what the above files contain 🚧 🚧 ---

Run the script and copy generated data to public folder for `kanji-worker` to access

```
python3 ./DATA-SCRIPTS/compress_kanji_data.py
cp ./DATA-SCRIPTS/generated/* ./public/json/
```

--- 🚧 🚧 WIP TODO: Write what the script does 🚧 🚧 ---

Running the python script will generate the following files
and then copy to `public/json` with `cp` so that `kanji-worker.ts` can access the data

- `kanji_main_reformatted.json`
- `kanji_other_reformatted.json`
- `word_details.json`
- `generated_reformatted_part_keyword_info.json`
- `generated_reformatted_phonetic.json`
- `cum_use.json`

--- 🚧 🚧 TODO: Write what the above files contain 🚧 🚧 ---

## Run the app

```
pnpm install
pnpm run dev --host
pnpm run build
pnpm run preview --host

# prettier --write . && eslint . && tsc -b && vite build && vite preview --host
pnpm run peek
```

## Talk to Us

- [Discord](https://discord.gg/Ash8ZrGb4s)
- [Ko-Fi](https://ko-fi.com/minimithi")
