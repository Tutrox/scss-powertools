# scss-powertools :monorail:
[![npm](https://img.shields.io/npm/v/scss-powertools.svg)](https://www.npmjs.com/package/scss-powertools)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=Tutrox/scss-powertools)](https://dependabot.com)

Lint, compile, prefix and minify¹ SCSS using one command!

## Installation

### As a development dependency

`npm install scss-powertools -D`

### Use once (locally)

`npx scss-powertools <input> <output> [options]`

No need to install separately!

## Usage

**scss-powertools is made really simple to set up**, just type this to your terminal to compile your SCSS to a linted and prefixed CSS-file.

```bash
scss-powertools -i path/to/your.scss
```

You'll see a new file (in this case `path/to/your`**`.css`**).

---
You can also specify your output file:

```bash
scss-powertools -i path/to/your.scss -o path/to/my.css
```

---
When you want to get your CSS minified, use the production mode:

```bash
scss-powertools -i path/to/your.scss -p
```

When you're in production mode, all errors, including lint-warnings will result in a **non-zero exit code**.

---

### All options, listed

```
Required:
-i => path to input SCSS
      default: none
      example: folder/some.scss

Optional:
-o => path to output CSS
      default: same as input, but with .css extension
      example: folder/my.css
-p => Production. Minify. All errors result in a non-zero exit code.
      default: disabled
-c => Fetch config from file, see details below
      default: disabled

```

## Want to do some advanced config?

Ok, that's easy to set up as well:

Create a `.powertoolsrc`-file. Format it like this:

```json
{
  "input": "path/to/input.scss",
  "output": "path/to/output.css",
  "steps": {
    "lint": true,
    "prefix": true,
    "minify": true,
    "write": true
  }
}
```

Run the powertools like this:

```bash
scss-powertools -c
```

## So, why should I use `scss-powertools`?

### No config needed

`scss-powertools` does not need any config. Everything from linting to minifying is preconfigured using recommended settings.

### SCSS imports can resolve to the `node_modules` folder

Did you write your imports like this earlier?

```scss
@import "node_modules/bootstrap";
```

No need to, anymore. Just write:

```scss
@import "bootstrap";
```

That looks great!

### Easy to integrate with `package.json` and NPM tests

`npm run x` allows us to add flags to a command, so running test commands from existing commands is easy. Check this example `package.json`:

```diff
{
  "name": "scss-superpackage",
  "description": "The awesome stylesheet collection",
  "version": "1.0.0",
  "scripts": {
-   "test": "scss-powertools -i my/file.scss -p",
+   "test": "npm run build -- -p",
    "build": "scss-powertools -i my/file.scss"
  }
}
```

### Use in your CI-enviroment

Running `scss-powertools` in your CI is easy. Just make sure to include the **`--production`** flag. It will make sure that your CI build will error if anything happens (like a lint issue).

---

¹Only in production!
