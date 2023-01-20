# SlimKit
Lightweight Vue3 UI components

## Demo
[View Demo Here](https://arnique.github.io/slimkit/)

## Installation
```sh
yarn install slimkit
```

## Development
Dev server will launch a page with all the components
```sh
yarn install
yarn dev
```

## Building
Build sript will copy compiled files to dist folder.
```sh
yarn build
```
## Usage
Add all components to your vue app
```js
import Slimkit from 'slimkit';
import 'slimkit/style.css';

app.use(Slimkit);
```

Add selected components
```js
import Slimkit from 'slimkit';
import 'slimkit/style.css';

app.use(Slimkit, ['SkButton', 'SkCard']);
```

## SCSS Variables
Instead of using the compiled css file, you can import the source `build.scss` file then you can override the variables e.g

```scss
// Colors
$primary: blue;

// Utilities 
$ut-margins: (
  sm: 5px,
  md: 10px,
  lg: 20px
);

@import 'node_modules/slimkit/scss/build.scss';

```

For list of variables explore these files
```
node_modules/slimkit/scss/_colors.scss
node_modules/slimkit/scss/_vars.scss
node_modules/slimkit/scss/_vars.utils.scss
```
