# HTML Tag Builder

Quickly create well-formed, self-documenting, semantic-driven HTML tags using builder pattern methods!

## Documentation

For a complete overview of methods, subclasses and usage view the [documentation page](https://soulshined.github.io/html-tag-builder/)

html-tag-builder supports `headless` mode which generates html elements without DOM or browser based logic, useful for node projects that aren't front-end driven. For more info see the documentation page

## Usage

```
> npm install html-tag-builder
```

Builder pattern elements:
```js
const div = new TagBuilder('div').innerHTML('Lorem eiusmod amet velit cillum.')
                                 .contentEditable()
                                 .caret('red')
                                 .style({ 'font-size': '2rem' })
                                 .build();

document.body.appendChild(div);
//<div contenteditable="true" style="font-size: 2rem; caret-color: red;">Lorem eiusmod amet velit cillum.</div>
```

Note that all CSS properties are as-is, not the javascript camel case variant and validated against the browers default `window.CSS.supports()` function.

Some built-in convenience methods like the one for screen readers:
```js
const button = new TagBuilder('button').innerText('click me screen reader!')
                                       .screenReaderOnly()
                                       .build();
```

Numerous subclasses for self-documenting code and semantic driven html:
```js
const table = new TableBuilder().collapse()
                                .addHeader('Date', 'Name', 'Age')
                                .addRow('2017-03-24', 'John', '26')
                                .addRow('2019-02-01', 'Jane', '29')
                                .addRow('2015-08-11', 'Joe', '23')
                                .build();
document.body.appendChild(table);
```
Will generate the equivalent of:
```html
<table style="border-collapse: collapse">
    <thead>
        <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2019-02-01</td>
            <td>Jane</td>
            <td>29</td>
        </tr>
        <tr>
            <td>2015-08-11</td>
            <td>Joe</td>
            <td>23</td>
        </tr>
        <tr>
            <td>2017-03-24</td>
            <td>John</td>
            <td>26</td>
        </tr>
    </tbody>
```