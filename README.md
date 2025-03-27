# Kanji Heatmap (previously Kanji Companion)

![main page](./IMG/preview.png)

| ![kanji details](./IMG/kanji-details.png) | ![mobile screen](./IMG/kanji-expanded.png) |
| ----------------------------------------- | ------------------------------------------ |
|                                           |                                            |

![sort and filter dialog](./IMG/sort-dialog.png)

## Running the app

```
$ pnpm install
$ pnpm run peek
  ➜  Local:   http://localhost:4173/
  ➜  Network: http://192.168.254.107:4173/
  ➜  press h + enter to show help
```

or analyze the build

```
ANALYZE=true ANALYZE_TEMPLATE=flamegraph pnpm run build
# ANALYZE_TEMPLATE can be sunburst, treemap, network, raw-data, list, or flamegraph
```

Configure the visualizer settings in vite.config.ts if you want

## Updating the Data (Production)

Get the latest `tar.gz` from the [Kanji Heatmap Data](https://github.com/PikaPikaGems/kanji-heatmap-data) repository

```
curl -OL https://github.com/PikaPikaGems/kanji-heatmap-data/releases/latest/download/kanji-heatmap-data.tar.gz
```

Uncompress and store the json files in `./public/json`

```
tar -xzf ./kanji-heatmap-data.tar.gz -C ./public/json/
```

You should have the following files updated

```
ls -la public/json

  1759 component_keyword.json
  2118 cum_use.json
366900 kanji_extended.json
284748 kanji_main.json
  2187 phonetic.json
510601 vocabulary.json
```

Delete the `tar.gz` file since it's not needed anymore

```
rm kanji-heatmap-data.tar.gz
```

## Talk to Us

- [Discord](https://discord.gg/Ash8ZrGb4s)
- [Ko-Fi](https://ko-fi.com/minimithi")
