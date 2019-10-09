# Frontend assets

Some simple little things to use in frontend.

## px - partial loading (jquery plug-in)

By using markup in html, the scrips can automaticly load partials on a page.
The fetched partial replaces current content of target element.
The fetched partial can define additional targets, partials within partials within partials …

The script automaticly loads partial specified by `data-px-url`.
```html
<script src="jquery.px.js"></script>
<div data-px-url="path/to/partial.html">Content will be replaced</div>
<div data-px-url="path/to/another/partial.html">Content will be replaced</div>
```

It also supports links that loads partials into any target element, by using `data-px-href` and `data-px-target`.
```html
<script src="jquery.px.js"></script>
<div id="my_target">Content will be replaced</div>
<a data-px-href="path/to/partial.html" data-px-target="my_target">Load partial into target</a>
<a data-px-href="path/to/another/partial.html" data-px-target="my_target">Load another partial into target</a>
```

Partials can also be explicitly loaded with `$(element).pxLoad(url)` call.
```html
<script src="jquery.px.js"></script>
<div id="my_target">Content will be replaced</div>
<button onclick="$('#my_target').pxLoad('path/to/partial.html');">Load partial into something</a>
```

The scipts applies CSS classes and trigger events whenever state is changed;
* When loading starts; `px-loading` class and `loading.px` event
* When loading is complete; `px-loaded` class and `loaded.px` event
* If loading fails; `px-failed` class and `failed.px` event