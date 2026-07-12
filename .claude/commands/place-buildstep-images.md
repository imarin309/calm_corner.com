R2にアップロード済みの画像を、MDX記事の `<BuildStepGroup>` に配置してください。

## 対象ファイル

`$ARGUMENTS` で指定されたMDXファイルを読み込んでください。
引数が空の場合は、対象ファイルのパスを聞いてください。

## 前提

- 画像は `scripts/convertImage/dataEdited/` 配下で編集済みで、Cloudflare R2 の `https://assets.calm-corner.com/posts/{slug}/{ファイル名}` に既にアップロードされている
- `{slug}` は対象MDXファイル名（拡張子を除いたもの）と一致する

## 手順

1. 対象MDXファイルを読み込み、slug（ファイル名）を確認する
2. `scripts/convertImage/dataEdited/` 配下の `.webp` ファイル一覧を取得する
3. MDX内で既に `src` に設定済みの画像をファイル名で照合し、まだ配置されていない画像を特定する
4. 対象の `<BuildStepGroup>` の位置と、既存の `<BuildStep>` の構成（number・title・images）を確認する
5. 未配置画像のファイル名から工程・パーツ（例: `body` `hair` `leg` `skirt` `face` `decal` `arm` `topcoat` などの接頭辞やキーワード）を推測してグルーピングする
6. `AskUserQuestion` で配置方針を確認する。選択肢の例:
   - パーツ別に `<BuildStep>` を再構成する（既存ステップを組み替えて新しく作り直す）
   - 既存の `<BuildStep>` の枠内に振り分ける（タイトルは変えず近いステップに追加する）
   - 単純に全部並べるだけ（後で本文と一緒に整理する前提）
7. 決まった方針に沿って `<BuildStepGroup>` 内を編集する
   - 各画像は `{ src: "https://assets.calm-corner.com/posts/{slug}/{ファイル名}", alt: "", caption: "" }` の形式で追加する
   - `number` は連番で振り直す
   - `title` は画像ファイル名から推測して仮でつけてよいが、確信が持てない場合はユーザーに確認する
   - 各 `<BuildStep>` の本文（`xxx` などのプレースホルダー）はここでは変更しない
8. 編集後、`scripts/convertImage/dataEdited/` の全画像がMDX内で参照されているかをファイル名の突合で検証する

## 出力

- 配置したステップ構成の一覧（番号・タイトル・画像枚数）を表示する
- alt・caption・本文が未記入であることを伝え、必要なら `/gen-alt` や `/collab-writing` の利用を案内する
