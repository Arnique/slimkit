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

## Base Variables
```scss
// Font
$font-sans: ui-sans-serif;
$font-serif: ui-serif;
$font-mono: ui-monospace;
$font-body: $font-sans;
$font-heading: $font-sans;
$font-input: $font-body;

// Font size
$font-size: 16px;
$font-size-xs: 0.8rem;
$font-size-sm: 0.9rem;
$font-size-md: 1rem;
$font-size-h4: 1.5rem;
$font-size-h3: 1.8rem;
$font-size-h2: 2.2rem;
$font-size-h1: 3rem;
$font-size-xl: 4rem;
$font-size-2xl: 6rem;

$body-fw: normal;
$body-lh: 1.5;
$type-margin: 1.25rem;

// Headings
$heading-font: $font-body;
$heading-lh: 1.2;
$heading-fw: bold;

$headings: (
  h6: $font-size-sm,
  h5: $font-size-md,
  h4: $font-size-h4,
  h3: $font-size-h3,
  h2: $font-size-h2,
  h1: $font-size-h1,
);

// Spacing
$space-xs: 0.5rem;
$space-sm: 0.7rem;
$space-md: 1rem;
$space-lg: 1.5rem;
$space-xl: 3rem;

// Borders
$border-r: 0.3rem;
$border-r-lg: 0.5rem;
$border-r-sm: 0.2rem;

// Card
$card-pad: $space-lg;
$card-border-r: $border-r-lg;

// Form
$input-lh: 1.4;
$input-pad-x: 1.25rem;
$input-pad-y: 0.7rem; 
$input-h: ($input-pad-y * 2) + ($input-lh * 1rem);
$input-border-r: $border-r;

// Buttons
$btn-h: $input-h;
$btn-pad-x: $input-pad-x;
$btn-pad-y: $input-pad-y;
$btn-border-r: $border-r;

// Grid
$grid-bps: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

## UI Colors

```scss
// Base colors
$dark: $slate;
$dark-plt: $slate-plt;

$primary: $blue;
$primary-plt: $blue-plt;

$secondary: $indigo;
$secondary-plt: $indigo-plt;

$info: $cyan;
$info-plt: $cyan-plt;

$success: $green;
$success-plt: $green-plt;

$warning: $amber;
$warning-plt: $amber-plt;

$danger: $rose;
$danger-plt: $rose-plt;


// Light UI(default)
$bg: your-color;
$text: your-color;
$mute: your-color;
$mute-l: your-color;
$title: your-color;

$link: your-color;
$link-hover: your-color;
$link-active: your-color;

$input-bg: your-color;
$input-fg: your-color;
$input-bg-focus: your-color;
$input-bd: your-color;
$input-bd-focus: your-color;
$input-hint: your-color;

$card-bg: your-color;
$card-bd: your-color;
$shadow: your-color;

// Dark Mode UI
$dmd-bg: your-color;
$dmd-text: your-color;
$dmd-mute: your-color;
$dmd-mute-l: your-color;
$dmd-title: your-color;

$dmd-link: your-color;
$dmd-link-hover: your-color;
$dmd-link-active: your-color;

$dmd-input-bg: your-color;
$dmd-input-fg: your-color;
$dmd-input-bg-focus: your-color;
$dmd-input-bd: your-color;
$dmd-input-bd-focus: your-color;
$dmd-input-hint: your-color;

$dmd-card-bg: your-color;
$dmd-card-bd: your-color;
$dmd-shadow: your-color;
```
