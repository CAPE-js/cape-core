# Cape Framework

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Running unit tests
```
npm run test
```
See `e2e\readme.e2e.md` for running end-to-end tests.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Additional Vue Components

To register additional vue components for the application. Pass the vue configuration in
a global variable in a script tag in your index.html page.

    cape_extensions = { components: {} }
    cape_extensions["components"]["<<<componentID>>>"] = { <<<component spec>>> }

Please note, for any function calls use old JS function(){} format not ES6 ()=>{} format,
as the old format will set "this" to the expected object.

## CSS Classes

For the most part, cape uses Bootstrap 4 to style HTML.

Cape also defines the following CSS classes that may be restyled in site.css

* cape-between-number-filter 
* cape-error 
* cape-dismissable 
* cape-field-label 
* cape-field-label-and-value 
* cape-field-null 
* cape-field-value 
* cape-filter-form 
* cape-floating-summary 
* cape-record-count 
* cape-results-summary 

In addition the following classes are defined in index.html and may be styled or removed

* intro-text 
* index-card 
* index-card-nav 
* next-record 
* previous-record 
* summary-card 
* test-box-label
* test-box-value 

The multitag plugin defineds these classes that it maybe useful to style

* custom__remove 
* custom__tag 

The bootstrap switch plugin defines these classes

* switch 
* switch-sm 

