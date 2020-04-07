# scss-powertools :monorail:
[![npm](https://img.shields.io/npm/v/scss-powertools.svg)](https://www.npmjs.com/package/scss-powertools)
[![Build Status](https://travis-ci.org/Tutrox/scss-powertools.svg?branch=master)](https://travis-ci.org/Tutrox/scss-powertools)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=Tutrox/scss-powertools)](https://dependabot.com)

Lint, compile, prefix and minify¹ SCSS using one command!

:stars: _v2 is coming soon with optimizations and new features!_

**Docs for v1**: https://www.npmjs.com/package/scss-powertools

## Installation
### As a development dependency

`npm install scss-powertools -D`

### Use once (locally)

`npx scss-powertools <input> <output> [options]` No install needed!

## Usage
**scss-powertools is made really simple**, and only consists of one command:

```bash
scss-powertools <input> <output> [options]
```

`input (SCSS)` and `output (CSS)` are references to your input SCSS and output CSS, relative to your project root (or where the command is run). If you have your SCSS in `scss/app.scss` and want to output to `dist/styles.css`, your command will look like:

```
scss-powertools scss/app.scss dist/styles.css
```

#### Options
Currently there are three options. `--production` and `--separate` **can be** combined. `--minify` **should not** be combined with any other option.

```
-p or --production => Minify the output CSS,
                      disable source maps and ERROR (non-zero exit code)
                      if any issues, like linting issues (use on your CI)
-m or --minify     => Minify the output CSS, even though you are on dev enviroment
-s or --separate   => Creates both an unminified and a minified file, the unminified
                      file will be named x.css when the minified will be named x.min.css
                      X is the name that you have configured as output
-d or --directory  => Specify the output directory for the compiled CSS files.
                      Use this when processing multiple files at a time.
                      In this case you cannot set the output parameter, the
                      CSS name will be generated from the input file name.
```

## Cool features and bonuses

### Process multiple files and use globs

You can easily process multiple SCSS files by separating them with a comma (`,`) or use globs.
In these cases you **cannot** set output file names, but you should set the output directory with `--output`.

```bash
scss-powertools scss/app.scss,scss/secret.scss --directory dist
```

```bash
# Put the glob inside single quotes or bad things will happen
scss-powertools 'scss/*.scss' --directory dist
```

### SCSS imports can resolve to the `node_modules` folder

Did you write your imports like this earlier?

```scss
@import "node_modules/bootstrap";
```

No need to, anymore. Just write:

```scss
@import "bootstrap";
```

Easy!

### Running tests with NPM

`npm run x` allows us to add flags to a command, so running test commands from existing commands is easy. Check this example `package.json`:

```diff
{
  "name": "scss-superpackage",
  "description": "The awesome stylesheet collection",
  "version": "1.0.0",
  "scripts": {
+   "test": "npm run build -- --production",
+   "build": "scss-powertools scss/style.scss build/done.css"
  }
}
```

Or with [`npm-run-all`](https://www.npmjs.com/package/npm-run-all):

```diff
{
  "name": "scss-superpackage",
  "description": "The awesome stylesheet collection",
  "version": "1.0.0",
  "scripts": {
+   "test": "npm-run-all build:* -- --production",
+   "build:styles": "scss-powertools scss/style.scss build/done.css",
+   "build:otherstyles": "scss-powertools scss/other.scss build/other_done.css"
  }
}
```

### Use in your CI-enviroment

Running `scss-powertools` in your CI is easy. Just make sure to include the **`--production`** flag. It will make sure that your CI build will error if anything happens (like a lint issue).

### No config needed

`scss-powertools` does not need any config. Everything from linting to minifying is preconfigured using recommended settings. You can find the configuration in the [`util.js`](https://github.com/Tutrox/scss-powertools/blob/master/lib/util.js) functions.

#### Custom config?

There's always someone who wants to do some custom configuring. Keep in mind that `scss-powertools` is made to be really simple and fast to get up and running, and therefore isn't super-configurable! Stylelint config is in [consideration](https://github.com/Tutrox/scss-powertools/issues/24).

---

¹Only in production or using `--minify`
