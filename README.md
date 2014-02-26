#shCheckset
Multiple select box alternative.

Pavel Tzonkov <sunhater@sunhater.com>

http://jquery.sunhater.com/shCheckset

##Description
shCheckset is replacement of the standard multiple *&lt;select>* HTML tag.

##Licenses
* GNU General Public License, version 3
* MIT License

##Features
* Optional search box to filter the options.
* Uniform compatibility.
* Customizable CSS "namespaces".

##Installation
Just include jQuery and shCheckset source files into the head tag.

```html
<html>
  <head>
    ...
    <script src="http://code.jquery.com/jquery-2.0.3.min.js" type="text/javascript"></script>
    <script src="/your/path/to/jquery.shCheckset-min.js" type="text/javascript"></script>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

##Creation
To create a checkset widget, first you have to put a *<select multiple>* tag at the right spot on the page.

```html
<select id="checkset" multiple="multiple" name="test[]" style="height:200px">
    <option value="1">Example Option One</option>
    <option value="2" selected="selected">Example Option Two</option>
    <option value="3">Example Option Three</option>
    <option value="4" selected="selected">Example Option Four</option>
    <option value="5" selected="selected">Example Option Five</option>
    <option value="6">Example Option Six</option>
    <option value="7">Example Option Seven</option>
    <option value="8" selected="selected">Example Option Eight</option>
    <option value="9" selected="selected">Example Option Nine</option>
    <option value="10" selected="selected">Example Option Ten</option>
    <option value="11">Example Option Eleven</option>
    <option value="12">Example Option Twelve</option>
</select>
```

Next you have to call *shCheckset()* plugin function applied to the created select box. You can use options to customize the widget (see next section).

```javascript
$('#checkset').shCheckset();
```

Also you can apply the checkset to all multiple *<select>* tags on the page.

```javascript
$('select[multiple]').shCheckset();
```

##Options

| labels | Type: Object | Default: {search:"Search..."} |
|--------|--------------|-------------------------------|

This option contains the text labels used in the plugin. Currently there is search property only.

| namespace | Type: String | Default: "shcs" |
|-----------|--------------|-----------------|

CSS namespace. Actualy it is CSS class, which can be used to customize the widget. This class will be applied to the outer widget *<div>* container.

| search | Type: Boolean | Default: false |
|--------|---------------|----------------|

If it is set to true, a search box will be added.

| uniform | Type: Boolean | Default: true |
|---------|---------------|---------------|

Whether to use Uniform jQuery plugin for the checkboxes. It is safe to leave this option true. If the Uniform plugin is not included the option will be set to false automaticaly.

##Transformation and CSS tips

Let see an example and how the select tag transforms.

```html
<select multiple="multiple" name="test[]">
    <option value="1">Example Option One</option>
    <option value="2" selected="selected">Example Option Two</option>
</select>
```

When the shCheckset() is applied, the select box will be detached from the page. On the same spot the checkset widget will be created.

```html
<div class="shcs">
    <input type="text" placeholder="Search..." spellcheck="false" />
    <div>
        <label for="shcs_test1_0">
            <input type="checkbox" name="test[]" id="shcs_test_0" value="1" />
            <span>Example Option One</span>
        </label>
        <label for="shcs_test2_1" class="checked">
            <input type="checkbox" name="test[]" id="shcs_test_1" value="2" checked="checked" />
            <span>Example Option Two</span>
        </label>
    </div>
</div>
```

So, you can define your custom CSS syles for the widget:

```css
.shcs {
    border: 1px solid #ccc;
    margin: 15px;
}
.shcs > input, .shcs > input:focus, .shcs > input:hover {
    border: 0;
    border-bottom: 1px solid #ccc;
    padding: 4px;
    margin: 0;
    outline: none;
    background: #fff;
}
.shcs > input:focus {
    background: #dfe;
}
.shcs label {
    padding: 3px;
}
.shcs label:hover {
    background: #cdf;
    cursor: pointer;
}
.shcs label.checked {
    background: #cfd;
}
.shcs span {
    position: relative;
    top: -2px;
}
```

If you are using custom namespace option you should use the same as the class name (replace shcs).
