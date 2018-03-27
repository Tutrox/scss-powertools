# scss-powertools :zap:
Lint, compile, prefix and minify¹ SCSS using one command!

## Installation
### As a development dependency

`npm install scss-powertools --save-dev`

### Use once (locally)

`npx scss-powertools <input> <output> [options]` No install needed!

_or_

`npm install scss-powertools --global` For older versions of NPM.

## Usage
**scss-powertools is made really simple**, and only consists of one command:

```
scss-powertools <input> <output> [options]
```

`input (SCSS)` and `output (CSS)` are references to your input SCSS and output CSS, relative to your project root (or where the command is run). If you have your SCSS in `scss/app.scss` and want to output to `dist/styles.css`, your command will look like:

```
scss-powertools scss/app.scss dist/styles.css
```

#### Options
Currently there are two options. These should **not** be combined.

```
-p or --production => Minify the output CSS,
                      disable source maps and ERROR (non-zero exit code)
                      if any issues, like linting issues (use on your CI)
-m or --minify     => Minify the output CSS, even though you are on dev enviroment
```

---

¹Only in production
