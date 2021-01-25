# scss-powertools :zap:
[![npm package](https://img.shields.io/npm/v/scss-powertools.svg)](https://www.npmjs.com/package/scss-powertools)
[![dependency updates available](https://img.shields.io/github/issues-pr-raw/Tutrox/scss-powertools/dependencies?label=dependency%20updates%20available)](https://github.com/Tutrox/scss-powertools/pulls?q=is%3Apr+is%3Aopen+label%3Adependencies)
[![Build Status](https://travis-ci.org/Tutrox/scss-powertools.svg?branch=master)](https://travis-ci.org/Tutrox/scss-powertools)

Lint, compile, prefix and minify¹ SCSS using one command!

## The future of this package

Please read the article at https://klooven.link/powertools.

---

## Setup

### As a development dependency

`npm install scss-powertools --save-dev`

### Use without installing

`npx scss-powertools <input> <output> [options]`

## Usage

**scss-powertools is made really simple to use**, and only consists of one command:

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
                      disable source maps and error (non-zero exit code)
                      if any issues, like linting issues occur (use on your CI)
-m or --minify     => Minify the output CSS, even though you are on dev environment
```

## Cool features

### SCSS imports can resolve to the `node_modules` folder

Did you write your imports like this earlier?

```
@import "node_modules/bootstrap";
```

No need to, anymore. Just write:

```
@import "bootstrap";
```

Simple!

### Use in your CI-environment

Running `scss-powertools` in your CI is easy. Just make sure to include the **`--production`** flag. It will make sure that your CI build will error if anything bad happens (like a lint issue).

### No config needed

`scss-powertools` does not need any config. Everything from linting to minifying is preconfigured using recommended settings. You can find them in [`powertools.js`](https://github.com/Tutrox/scss-powertools/blob/master/lib/powertools.js).


---

¹Only when enabled
