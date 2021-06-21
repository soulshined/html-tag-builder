const SELF_CLOSING = [
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];
class Objects {
    static requireNonNull(obj, prop) {
        if (!this.isDefined(obj))
            throw new Error(`Null or undefined value not allowed for ${prop}`);
        return obj;
    }
    static ofNullable(obj, defaultValue) {
        if (!this.isDefined(obj))
            obj = Objects.requireNonNull(defaultValue, 'defaultValue');
        return obj;
    }
    static isDefined(obj) {
        return obj !== undefined && obj !== null;
    }
    static isEmptyOrWhitespace(obj) {
        if (!this.isDefined(obj))
            return true;
        if (typeof obj == 'string' && obj.constructor === String)
            return obj.toString().trim().length === 0;
        return false;
    }
}
class Attributes extends Map {
    clone() {
        const clone = new Attributes();
        this.forEach((v, k) => clone.set(k, v));
        return clone;
    }
}
class AbstractTagBuilder {
    constructor(tagName, id, xmlns) {
        this._node = null;
        this._hNode = null;
        this._isCached = false;
        Objects.requireNonNull(tagName, 'tagName in TagBuilder');
        tagName = tagName.trim().toLowerCase();
        if (TagBuilderOptions.mode === 'headless') {
            this.hNode = this.headlessBuilder(tagName, id, xmlns);
            return;
        }
        if (!Objects.isEmptyOrWhitespace(xmlns)) {
            const elem = document.createElementNS(xmlns, tagName);
            this.node = elem;
        }
        else {
            const elem = document.createElement(tagName);
            elem.contentEditable = 'inherit';
            elem.draggable = false;
            this.node = elem;
        }
        if (!Objects.isEmptyOrWhitespace(id)) {
            if (document.querySelector(`#${id}`) !== null)
                throw new Error(`Tag with '${id}' id already exists in the document tree`);
            this.node.id = id;
        }
    }
    attr(key, value) {
        if (this.isHeadlessMode)
            this.hNode.attr(key, value);
        else
            this.node.setAttribute(key, `${value}`);
        return this;
    }
    slot(value) {
        if (this.isHeadlessMode)
            this.hNode.attr('slot', value);
        else
            this.node.slot = value;
        return this;
    }
    tabIndex(index) {
        if (this.isHeadlessMode)
            this.hNode.attr('tabindex', index);
        else
            this.node.tabIndex = index;
        return this;
    }
    append(...child) {
        child = child.filter(e => Objects.isDefined(e));
        if (child.length === 0)
            return this;
        if (this.isHeadlessMode) {
            this.hNode.append(...child.map(e => {
                if (e instanceof AbstractTagBuilder)
                    return e.buildHTML();
                else
                    return e;
            }));
            return this;
        }
        this.node.append(...child.map(e => {
            if (e instanceof AbstractTagBuilder)
                return e.build();
            else
                return e;
        }));
        return this;
    }
    prepend(...child) {
        child = child.filter(e => Objects.isDefined(e));
        if (child.length === 0)
            return this;
        if (this.isHeadlessMode) {
            this.hNode.prepend(...child.map(e => {
                if (e instanceof AbstractTagBuilder)
                    return e.buildHTML();
                else
                    return e;
            }));
            return this;
        }
        this.node.prepend(...child.map(e => {
            if (e instanceof AbstractTagBuilder)
                return e.build();
            else
                return e;
        }));
        return this;
    }
    insertAdjacent(sibling, placement = 'after') {
        if (this.isHeadlessMode)
            this.hNode.insertAdjacent(sibling.buildHTML(), placement === 'before' ? 'before' : 'after');
        else
            this.node.insertAdjacentElement(placement === 'before' ? 'beforebegin' : 'afterend', sibling.build());
        return this;
    }
    innerHTML(html) {
        if (this.isHeadlessMode)
            this.hNode.innerHTML(html);
        else
            this.node.innerHTML = html;
        return this;
    }
    classes(...aClass) {
        if (!Array.isArray(aClass))
            throw new Error(`Invalid datatype for classes. Got '${typeof aClass}' expecting array of strings for node: [type = '${this.node.nodeType}', tagName = '${this.node.tagName}']`);
        if (this.isHeadlessMode) {
            this.hNode.classes(aClass);
            return this;
        }
        aClass.forEach(e => {
            if (typeof e !== 'string' || e.constructor !== String)
                throw new Error(`Invalid datatype for class name. Got '${typeof e}' expecting string for node: [type = '${this.node.nodeType}', tagName = '${this.node.tagName}']`);
            if (!this.node.classList.contains(e))
                this.node.classList.add(e);
        });
        return this;
    }
    margin(...cssShorthand) {
        if (cssShorthand.length > 4 || cssShorthand.length === 0)
            return this;
        this.style({ 'margin': cssShorthand.join(" ") });
        return this;
    }
    origin(top, right, bottom, left) {
        if (!Objects.isEmptyOrWhitespace(top))
            this.style({ top });
        if (!Objects.isEmptyOrWhitespace(right))
            this.style({ right });
        if (!Objects.isEmptyOrWhitespace(bottom))
            this.style({ bottom });
        if (!Objects.isEmptyOrWhitespace(left))
            this.style({ left });
        return this;
    }
    padding(...cssShorthand) {
        if (cssShorthand.length > 4 || cssShorthand.length === 0)
            return this;
        this.style({ 'padding': cssShorthand.join(" ") });
        return this;
    }
    position(value) {
        this.style({ 'position': value });
        return this;
    }
    style(obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (key === 'undefined' || key === 'null' || !Objects.isDefined(value))
                continue;
            if (this.isHeadlessMode) {
                this.hNode.style(key, value);
                continue;
            }
            if (window.CSS.supports(key, value.toString()))
                this.node.style[key] = value.toString();
            else
                console.debug(`Entry/value is not supported => ${key} : ${value}`);
        }
        return this;
    }
    on(event, listener, options) {
        if (this.isHeadlessMode)
            this.hNode.attr(`on${event}`.toLowerCase(), listener);
        else
            this.node.addEventListener(event, listener, options);
        return this;
    }
    build() {
        return this.node;
    }
    buildHTML() {
        return this.isHeadlessMode ? this.hNode.build() : this.build().outerHTML;
    }
    get isSVGElement() {
        return this.node instanceof SVGElement;
    }
    get isCached() {
        return this._isCached;
    }
    set isCached(val) {
        this._isCached = val;
    }
    get node() {
        return this._node;
    }
    set node(node) {
        this._node = node;
    }
    get hNode() {
        return this._hNode;
    }
    set hNode(hNode) {
        this._hNode = hNode;
    }
    get tagName() {
        return this.isHeadlessMode ? this.hNode.tagName().toUpperCase() : this.node.tagName;
    }
    get tagId() {
        return this.isHeadlessMode ? this.hNode.tagId() : this.node.id;
    }
    get isHeadlessMode() {
        return TagBuilderOptions.mode === 'headless' || Objects.isDefined(this.hNode);
    }
    headlessBuilder(tagName, id, xmlns) {
        class HNode {
            constructor(tagName, id) {
                this._attrs = new Attributes();
                this._children = [];
                this._siblings = new Attributes([
                    ['before', []],
                    ['after', []]
                ]);
                this._styles = new Attributes();
                this._tagName = tagName;
                if (!Objects.isEmptyOrWhitespace(id))
                    this.attrs.set('id', id);
                if (!Objects.isEmptyOrWhitespace(xmlns))
                    this.attrs.set('xmlns', xmlns);
                else
                    this.attrs.set('draggable', false);
                this.attrs.set('class', new Set());
            }
            get tagName() {
                return this._tagName;
            }
            get attrs() {
                return this._attrs;
            }
            get children() {
                return this._children;
            }
            get siblings() {
                return this._siblings;
            }
            get styles() {
                return this._styles;
            }
            get classes() {
                return this.attrs.get('class');
            }
            static from(node) {
                const newnode = new HNode(node._tagName, node.attrs.get('id'));
                newnode._attrs = node.attrs.clone();
                newnode._children = [...node._children];
                newnode._siblings = node._siblings.clone();
                newnode._styles = node._styles.clone();
                return newnode;
            }
        }
        const createNode = function (tagName, id, node) {
            let hnode = new HNode(tagName, id);
            if (node !== undefined && node !== null)
                hnode = HNode.from(node);
            return {
                attr: function (key, value) {
                    hnode.attrs.set(key, `${value}`);
                    return this;
                },
                append: function (...child) {
                    hnode.children.push(...child);
                    return this;
                },
                prepend: function (...child) {
                    hnode.children.unshift(...child);
                    return this;
                },
                insertAdjacent: function (sibling, placement) {
                    hnode.siblings.get(placement).push(sibling);
                    return this;
                },
                innerHTML: function (html) {
                    hnode.children.splice(0, hnode.children.length, html);
                    return this;
                },
                classes: function (classes) {
                    classes.forEach(e => {
                        if (typeof e !== 'string' || e.constructor !== String)
                            throw new Error(`Invalid datatype for class name. Got '${typeof e}' expecting string for node: [tagName = '${tagName}']`);
                        hnode.classes.add(e.trim());
                    });
                    return this;
                },
                style: function (property, value) {
                    if (!Objects.isDefined(property) || !Objects.isDefined(value))
                        return this;
                    hnode.styles.set(property, `${value}`);
                    return this;
                },
                tagName: () => {
                    return hnode.tagName;
                },
                tagId: () => {
                    var _a;
                    return _a = hnode.attrs.get('id'), (_a !== null && _a !== void 0 ? _a : null);
                },
                clone: function () {
                    return createNode(tagName, id, hnode);
                },
                build: () => {
                    let attributes = ``;
                    hnode.attrs.forEach((v, k) => {
                        if (k.trim() === 'class') {
                            if (v.size > 0)
                                attributes += ` class="${[...v].join(" ")}"`;
                            return;
                        }
                        v = Objects.isEmptyOrWhitespace(v) ? '' : v;
                        attributes += ` ${k}="${v}"`;
                    });
                    if (hnode.styles.size > 0) {
                        attributes += ` style="`;
                        let style = '';
                        hnode.styles.forEach((v, k) => {
                            v = Objects.isEmptyOrWhitespace(v) ? '' : v;
                            style += ` ${k.trim()}: ${v.trim()};`;
                        });
                        attributes += `${style.trim()}"`;
                    }
                    if (SELF_CLOSING.includes(tagName))
                        return `<${tagName}${attributes}>`;
                    return hnode.siblings.get('before').join() +
                        `<${tagName}${attributes}>` +
                        (hnode.children.length === 0 ? '' : hnode.children.join("")) +
                        `</${tagName}>` +
                        hnode.siblings.get('after').join();
                }
            };
        };
        return createNode(tagName, id);
    }
}
class TagBuilder extends AbstractTagBuilder {
    constructor(tagName, id) {
        super(tagName, id);
    }
    accessKey(value) {
        if (this.isHeadlessMode)
            this.hNode.attr('accesskey', value);
        else
            this.node.accessKey = value.trim();
        return this;
    }
    inputMode(value = 'text') {
        value = Objects.ofNullable(value, 'text');
        if (this.isHeadlessMode)
            this.hNode.attr('inputmode', value);
        else
            this.node.inputMode = value;
        return this;
    }
    contentEditable() {
        if (this.isHeadlessMode)
            this.hNode.attr('contenteditable', true);
        else
            this.node.contentEditable = 'true';
        return this;
    }
    dir(value) {
        if (this.isHeadlessMode)
            this.hNode.attr('dir', value);
        else
            this.node.dir = value;
        return this;
    }
    draggable() {
        if (this.isHeadlessMode)
            this.hNode.attr('draggable', true);
        else
            this.node.draggable = true;
        return this;
    }
    hidden() {
        if (this.isHeadlessMode)
            this.hNode.attr('hidden', true);
        else
            this.node.hidden = true;
        return this;
    }
    spellcheck() {
        if (this.isHeadlessMode)
            this.hNode.attr('spellcheck', true);
        else
            this.node.spellcheck = true;
        return this;
    }
    title(title) {
        if (this.isHeadlessMode)
            this.hNode.attr('title', title);
        else
            this.node.title = title;
        return this;
    }
    innerText(text) {
        if (this.isHeadlessMode)
            this.hNode.innerHTML(text);
        else
            this.node.innerText = text;
        return this;
    }
    autocapitalize(value) {
        if (this.isHeadlessMode)
            this.hNode.attr('autocapitalize', value);
        else
            this.node.autocapitalize = value;
        return this;
    }
    bounds(width, height) {
        this.style({ width, height });
        return this;
    }
    caret(color) {
        this.style({ 'caret-color': color });
        return this;
    }
    height(height) {
        this.style({ height });
        return this;
    }
    textcase(transform) {
        if (['uppercase', 'lowercase', 'none', 'capitalize', 'inherit'].includes(transform)) {
            this.style({ 'text-transform': transform });
        }
        return this;
    }
    visibility(value) {
        this.style({ 'visibility': value });
        return this;
    }
    width(width) {
        this.style({ width });
        return this;
    }
    screenReaderOnly() {
        this.style({
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            width: '1px'
        });
        return this;
    }
    clone() {
        const builder = new TagBuilder(this.tagName, this.tagId);
        builder.isCached = this.isCached;
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
    static parse(html) {
        if (TagBuilderOptions.mode === 'headless')
            throw new Error('Parse is not supported in headless mode');
        const template = document.createElement('template');
        template.innerHTML = html;
        const nodes = template.content.childNodes;
        if (nodes.length === 0)
            return null;
        const result = [...nodes].filter(e => e.nodeType === 1).map((e) => {
            const builder = new TagBuilder(e.tagName, e.id);
            Object.entries(e.attributes).forEach(entry => {
                builder.attr(entry[1].name, entry[1].value);
            });
            builder.node.append(...e.children);
            return builder;
        });
        return result.length === 0 ? null : result;
    }
}
class TagBuilderOptions {
    static get mode() {
        return this._mode;
    }
    static set mode(v) {
        this._mode = v;
    }
    static get scriptAsync() {
        return this._defaultScriptAsync;
    }
    static set scriptAsync(v) {
        this._defaultScriptAsync = v;
    }
    static get useOptionContentForEmptyOptionValue() {
        return this._useOptionContentForEmptyOptionValue;
    }
    static set useOptionContentForEmptyOptionValue(v) {
        this._useOptionContentForEmptyOptionValue = v;
    }
    static get defaultInputType() {
        return this._defaultInputType;
    }
    static set defaultInputType(v) {
        this._defaultInputType = v;
    }
    static reset() {
        this._defaultInputType = 'text';
        this._useOptionContentForEmptyOptionValue = true;
        this._defaultScriptAsync = true;
    }
}
TagBuilderOptions._defaultInputType = 'text';
TagBuilderOptions._useOptionContentForEmptyOptionValue = true;
TagBuilderOptions._defaultScriptAsync = true;
class BlockquoteBuilder extends TagBuilder {
    constructor(cite, id) {
        super('blockquote', id);
        if (this.isHeadlessMode)
            this.attr('cite', cite);
        else
            this.node.cite = cite;
    }
}
class FieldsetBuilder extends TagBuilder {
    constructor(legend, id) {
        super('fieldset', id);
        if (!Objects.isEmptyOrWhitespace(legend))
            this.append(new TagBuilder('legend').innerText(legend));
    }
}
class FigureBuilder extends TagBuilder {
    constructor(caption, captionPlacement = 'bottom', id) {
        super('figure', id);
        this.caption = new TagBuilder("figcaption");
        this.captionPlacement = 'bottom';
        if (!Objects.isEmptyOrWhitespace(caption))
            this.caption.innerHTML(caption);
        this.captionPlacement = captionPlacement;
    }
    clone() {
        const builder = new FigureBuilder();
        builder.caption = this.caption;
        builder.captionPlacement = this.captionPlacement;
        builder.isCached = this.isCached;
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
    build() {
        if (this.isCached)
            return this.node;
        this.isCached = true;
        if (this.captionPlacement === 'bottom')
            this.append(this.caption);
        else
            this.prepend(this.caption);
        return this.node;
    }
    buildHTML() {
        if (this.isCached)
            return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
        this.isCached = true;
        if (this.captionPlacement === 'bottom')
            this.append(this.caption);
        else
            this.prepend(this.caption);
        return this.hNode.build();
    }
}
class AnchorBuilder extends TagBuilder {
    constructor(href, target = '_self', id) {
        super('a', id);
        href = Objects.requireNonNull(href, 'href');
        target = Objects.requireNonNull(target, 'target');
        if (this.isHeadlessMode) {
            this.attr('href', href);
            this.attr('target', target);
        }
        else {
            this.node.href = href;
            this.node.target = target;
        }
    }
    hreflang(lang) {
        if (this.isHeadlessMode)
            this.attr('hreflang', lang);
        else
            this.node.hreflang = lang;
        return this;
    }
    mimeType(value) {
        if (this.isHeadlessMode)
            this.attr('type', value);
        else
            this.node.type = value;
        return this;
    }
    ping(urls) {
        if (this.isHeadlessMode)
            this.attr('ping', urls.join(" "));
        else
            this.node.ping = urls.join(" ");
        return this;
    }
    rel(value) {
        if (this.isHeadlessMode)
            this.attr('rel', value);
        else
            this.node.rel = value;
        return this;
    }
}
class DownloadLinkBuilder extends AnchorBuilder {
    constructor(href, filename, id) {
        super(href, '_self', id);
        filename = Objects.requireNonNull(filename, 'filename in DownloadLinkBuilder');
        if (this.isHeadlessMode)
            this.attr('download', filename);
        else
            this.node.download = filename;
    }
}
class AreaBuilder extends TagBuilder {
    constructor(coords, shape = 'default', id) {
        super('area', id);
        coords = Objects.requireNonNull(coords, 'coords');
        if (this.isHeadlessMode) {
            this.attr('coords', coords);
            if (Objects.isDefined(shape))
                this.attr('shape', shape);
        }
        else {
            this.node.coords = coords;
            if (Objects.isDefined(shape))
                this.node.shape = shape;
        }
    }
    href(url, alt) {
        url = Objects.requireNonNull(url, 'href');
        alt = Objects.requireNonNull(alt, 'alt');
        if (this.isHeadlessMode) {
            this.attr('href', url);
            this.attr('alt', alt);
        }
        else {
            this.node.href = url;
            this.node.alt = alt;
        }
        return this;
    }
    hreflang(lang) {
        this.attr('hreflang', lang);
        return this;
    }
    ping(urls) {
        if (this.isHeadlessMode)
            this.attr('ping', urls.join(" "));
        else
            this.node.ping = urls.join(" ");
        return this;
    }
    rel(value) {
        if (this.isHeadlessMode)
            this.attr('rel', value);
        else
            this.node.rel = value;
        return this;
    }
    target(value) {
        if (this.isHeadlessMode)
            this.attr('target', value);
        else
            this.node.target = value;
        return this;
    }
}
class DownloadAreaBuilder extends AreaBuilder {
    constructor(filename, coords, shape = 'default', id) {
        super(coords, shape, id);
        filename = Objects.requireNonNull(filename, 'filename in DownloadAreaBuilder');
        if (this.isHeadlessMode)
            this.attr('download', filename);
        else
            this.node.download = filename;
    }
}
class DataBuilder extends TagBuilder {
    constructor(value, id) {
        super('data', id);
        if (this.isHeadlessMode)
            this.attr('value', value);
        else
            this.node.value = value;
    }
}
class SpanBuilder extends TagBuilder {
    constructor(style, id) {
        super('span', id);
        if (Objects.isDefined(style)) {
            style.sort();
            style.forEach(style => {
                if (style === 'bold')
                    this.bold();
                else if (style === 'bolder')
                    this.bolder();
                else if (style === 'lighter')
                    this.lighter();
                else if (style === 'italic')
                    this.italic();
                else if (style === 'underline')
                    this.underline();
                else if (style === 'strikethrough')
                    this.strikethrough();
            });
        }
    }
    bold() {
        this.style({ 'font-weight': 'bold' });
        return this;
    }
    bolder() {
        this.style({ 'font-weight': 'bolder' });
        return this;
    }
    italic() {
        this.style({ 'font-style': 'italic' });
        return this;
    }
    lighter() {
        this.style({ 'font-weight': 'lighter' });
        return this;
    }
    underline() {
        this.style({ 'text-decoration': 'underline' });
        return this;
    }
    strikethrough() {
        this.style({ 'text-decoration': 'strikethrough' });
        return this;
    }
    color(value) {
        this.style({ 'color': value });
        return this;
    }
}
class InputBuilder extends TagBuilder {
    constructor(type, id) {
        super('input', id);
        if (this.isHeadlessMode) {
            this.attr('spellcheck', false);
            this.attr('checked', false);
            this.attr('required', false);
            this.attr('type', (type !== null && type !== void 0 ? type : TagBuilderOptions.defaultInputType));
        }
        else {
            this.node.spellcheck = false;
            this.node.checked = false;
            this.node.required = false;
            this.node.type = (type !== null && type !== void 0 ? type : TagBuilderOptions.defaultInputType);
        }
    }
    autocomplete(value) {
        if (this.isHeadlessMode)
            this.attr('autocomplete', value);
        else
            this.node.autocomplete = value;
        return this;
    }
    autofocus() {
        if (this.isHeadlessMode)
            this.attr('autofocus', true);
        else
            this.node.autofocus = true;
        return this;
    }
    datalist(id) {
        this.attr('list', Objects.requireNonNull(id, 'id'));
        return this;
    }
    disabled() {
        if (this.isHeadlessMode)
            this.attr('disabled', true);
        else
            this.node.disabled = true;
        return this;
    }
    name(value) {
        if (this.isHeadlessMode)
            this.attr('name', value);
        else
            this.node.name = value;
        return this;
    }
    onInvalid(value) {
        if (this.isHeadlessMode)
            this.attr('oninvalid', `this.setCustomValidity('${value}');`);
        else
            this.node.setCustomValidity(value);
        return this;
    }
    placeholder(value) {
        if (this.isHeadlessMode)
            this.attr('placeholder', value);
        else
            this.node.placeholder = value;
        return this;
    }
    readOnly() {
        if (this.isHeadlessMode)
            this.attr('readonly', true);
        else
            this.node.readOnly = true;
        return this;
    }
    required() {
        if (this.isHeadlessMode)
            this.attr('required', true);
        else
            this.node.required = true;
        return this;
    }
    value(value) {
        if (this.isHeadlessMode)
            this.attr('value', value);
        else
            this.node.value = value;
        return this;
    }
}
class NumberInputBuilder extends InputBuilder {
    constructor(value, id) {
        super('number', id);
        if (Objects.isDefined(value))
            if (this.isHeadlessMode)
                this.attr('value', value);
            else
                this.node.value = value;
    }
    min(value) {
        if (this.isHeadlessMode)
            this.attr('min', value);
        else
            this.node.min = value;
        return this;
    }
    max(value) {
        if (this.isHeadlessMode)
            this.attr('max', value);
        else
            this.node.max = value;
        return this;
    }
    step(interval) {
        if (this.isHeadlessMode)
            this.attr('step', interval);
        else
            this.node.step = interval;
        return this;
    }
}
class RangeInputBuilder extends NumberInputBuilder {
    constructor(value, id) {
        super(value, id);
        if (this.isHeadlessMode)
            this.attr('type', 'range');
        else
            this.node.type = 'range';
    }
}
class CheckboxInputBuilder extends InputBuilder {
    constructor(isIndeterminate = false, id) {
        super("checkbox", id);
        if (!this.isHeadlessMode)
            this.node.indeterminate = isIndeterminate;
    }
    checked() {
        if (this.isHeadlessMode)
            this.attr('checked', true);
        else
            this.node.checked = true;
        return this;
    }
}
class RadioInputBuilder extends InputBuilder {
    constructor(checked, id) {
        super('radio', id);
        checked = Objects.ofNullable(checked, false);
        if (this.isHeadlessMode)
            this.attr('checked', checked);
        else
            this.node.checked = checked;
    }
}
class DateInputBuilder extends NumberInputBuilder {
    constructor(value, id) {
        super(value, id);
        if (this.isHeadlessMode)
            this.attr('type', 'date');
        else
            this.node.type = 'date';
    }
}
class DateTimeLocalInputBuilder extends DateInputBuilder {
    constructor(value, id) {
        super(value, id);
        if (this.isHeadlessMode)
            this.attr('type', 'datetime-local');
        else
            this.node.type = 'datetime-local';
    }
}
class MonthInputBuilder extends DateInputBuilder {
    constructor(value, id) {
        super(value, id);
        if (this.isHeadlessMode)
            this.attr('type', 'month');
        else
            this.node.type = 'month';
    }
}
class TimeInputBuilder extends DateInputBuilder {
    constructor(value, id) {
        super(value, id);
        if (this.isHeadlessMode)
            this.attr('type', 'time');
        else
            this.node.type = 'time';
    }
}
class WeekInputBuilder extends DateInputBuilder {
    constructor(value, id) {
        super(value, id);
        if (this.isHeadlessMode)
            this.attr('type', 'week');
        else
            this.node.type = 'week';
    }
}
class FileInputBuilder extends InputBuilder {
    constructor(accept, id) {
        super('file', id);
        if (this.isHeadlessMode) {
            this.attr('multiple', false);
            this.attr('accept', Objects.ofNullable(accept, ''));
        }
        else {
            this.node.multiple = false;
            if (Objects.isDefined(accept))
                this.node.accept = accept;
        }
    }
    capture(value) {
        this.attr('capture', value);
        return this;
    }
    multiple() {
        if (this.isHeadlessMode)
            this.attr('multiple', true);
        else
            this.node.multiple = true;
        return this;
    }
}
class ImageInputBuilder extends InputBuilder {
    constructor(src, alt, id) {
        super('image', id);
        src = Objects.requireNonNull(src, 'src');
        alt = Objects.requireNonNull(alt, 'alt');
        if (this.isHeadlessMode) {
            this.attr('src', src);
            this.attr('alt', alt);
        }
        else {
            this.node.src = src;
            this.node.alt = alt;
        }
    }
    formAction(url) {
        if (this.isHeadlessMode)
            this.attr('formaction', url);
        else
            this.node.formAction = url;
        return this;
    }
    formEnctype(enctype) {
        enctype = Objects.ofNullable(enctype, 'application/x-www-form-urlencoded');
        if (this.isHeadlessMode)
            this.attr('formenctype', enctype);
        else
            this.node.formEnctype = enctype;
        return this;
    }
    formMethod(method) {
        if (this.isHeadlessMode)
            this.attr('formmethod', method);
        else
            this.node.formMethod = method;
        return this;
    }
}
class TextInputBuilder extends InputBuilder {
    constructor(id) {
        super('text', id);
    }
    maxLength(value) {
        if (this.isHeadlessMode)
            this.attr('maxlength', value);
        else
            this.node.maxLength = value;
        return this;
    }
    minLength(value) {
        if (this.isHeadlessMode)
            this.attr('minlength', value);
        else
            this.node.minLength = value;
        return this;
    }
    pattern(value) {
        const pattern = value instanceof RegExp ? value.source : new RegExp(value).source;
        if (this.isHeadlessMode)
            this.attr('pattern', pattern);
        else
            this.node.pattern = pattern;
        return this;
    }
    size(value) {
        if (this.isHeadlessMode)
            this.attr('size', value);
        else
            this.node.size = value;
        return this;
    }
}
class EmailInputBuilder extends TextInputBuilder {
    constructor(id) {
        super(id);
        if (this.isHeadlessMode) {
            this.attr('type', 'email');
            this.attr('multiple', false);
        }
        else {
            this.node.type = 'email';
            this.node.multiple = false;
        }
    }
    multiple() {
        if (this.isHeadlessMode)
            this.attr('multiple', true);
        else
            this.node.multiple = true;
        return this;
    }
}
class PasswordInputBuilder extends TextInputBuilder {
    constructor(id) {
        super(id);
        if (this.isHeadlessMode)
            this.attr('type', 'password');
        else
            this.node.type = 'password';
    }
}
class SearchInputBuilder extends TextInputBuilder {
    constructor(id) {
        super(id);
        if (this.isHeadlessMode)
            this.attr('type', 'search');
        else
            this.node.type = 'search';
    }
}
class TelInputBuilder extends TextInputBuilder {
    constructor(id) {
        super(id);
        if (this.isHeadlessMode)
            this.attr('type', 'tel');
        else
            this.node.type = 'tel';
    }
}
class UrlInputBuilder extends TextInputBuilder {
    constructor(id) {
        super(id);
        if (this.isHeadlessMode)
            this.attr('type', 'url');
        else
            this.node.type = 'url';
    }
}
class TextAreaBuilder extends TagBuilder {
    constructor(rows, cols, id) {
        super('textarea', id);
        if (this.isHeadlessMode) {
            this.attr('spellcheck', false);
            this.attr('required', false);
            if (Objects.isDefined(rows))
                this.attr('rows', rows);
            if (Objects.isDefined(cols))
                this.attr('cols', cols);
        }
        else {
            this.node.spellcheck = false;
            this.node.required = false;
            if (Objects.isDefined(rows))
                this.node.rows = rows;
            if (Objects.isDefined(cols))
                this.node.cols = cols;
        }
    }
    autocomplete(value) {
        if (this.isHeadlessMode)
            this.attr('autocomplete', value);
        else
            this.node.autocomplete = value;
        return this;
    }
    autofocus() {
        if (this.isHeadlessMode)
            this.attr('autofocus', true);
        else
            this.node.autofocus = true;
        return this;
    }
    disabled() {
        if (this.isHeadlessMode)
            this.attr('disabled', true);
        else
            this.node.disabled = true;
        return this;
    }
    maxLength(value) {
        if (this.isHeadlessMode)
            this.attr('maxlength', value);
        else
            this.node.maxLength = value;
        return this;
    }
    minLength(value) {
        if (this.isHeadlessMode)
            this.attr('minlength', value);
        else
            this.node.minLength = value;
        return this;
    }
    name(value) {
        if (this.isHeadlessMode)
            this.attr('name', value);
        else
            this.node.name = value;
        return this;
    }
    onInvalid(value) {
        if (this.isHeadlessMode)
            this.attr('oninvalid', `this.setCustomValidity('${value}');`);
        else
            this.node.setCustomValidity(value);
        return this;
    }
    placeholder(value) {
        if (this.isHeadlessMode)
            this.attr('placeholder', value);
        else
            this.node.placeholder = value;
        return this;
    }
    readOnly() {
        if (this.isHeadlessMode)
            this.attr('readonly', true);
        else
            this.node.readOnly = true;
        return this;
    }
    required() {
        if (this.isHeadlessMode)
            this.attr('required', true);
        else
            this.node.required = true;
        return this;
    }
    value(value) {
        if (this.isHeadlessMode)
            this.attr('value', value);
        else
            this.node.value = value;
        return this;
    }
    wrap(value) {
        if (this.isHeadlessMode)
            this.attr('wrap', value);
        else
            this.node.wrap = value;
        return this;
    }
}
class DataListBuilder extends TagBuilder {
    constructor(id) {
        super('datalist', id);
        Objects.requireNonNull(id, 'id in DatalistBuilder');
    }
    addOption(content, value, classes = []) {
        Objects.requireNonNull(content, 'content in DatalistBuilder');
        this.addOptions(new OptionBuilder(content, value).classes(...classes));
        return this;
    }
    addOptions(...option) {
        option.forEach(e => {
            if (e instanceof OptionBuilder)
                this.append(e);
            else
                this.append(new OptionBuilder(e));
        });
        return this;
    }
}
class DLBuilder extends TagBuilder {
    constructor(wrapDtDdGroupsInDiv = false, groupsDivClasses = [], id) {
        super('dl', id);
        this.div = null;
        if (wrapDtDdGroupsInDiv === true)
            this.div = new TagBuilder('div').classes(...groupsDivClasses);
    }
    addTerm(term, ...dd) {
        Objects.requireNonNull(term, 'term in DLBuilder');
        const dt = new TagBuilder('dt').innerHTML(term);
        const dds = dd.map(e => {
            if (e instanceof TagBuilder) {
                if (e.tagName === 'DD')
                    return e;
                else
                    return new TagBuilder('dd').append(e);
            }
            else
                return new TagBuilder('dd').innerHTML(e);
        });
        if (this.div !== null)
            this.append(this.div.clone().append(dt, ...dds));
        else
            this.append(dt, ...dds);
        return this;
    }
    clone() {
        const builder = new DLBuilder(false);
        builder.div = this.div;
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
}
class DetailsBuilder extends TagBuilder {
    constructor(summary, open = false, id) {
        super('details', id);
        if (this.isHeadlessMode)
            this.attr('open', open);
        else
            this.node.open = open;
        if (Objects.isDefined(summary))
            this.prepend(new TagBuilder('summary').innerHTML(summary));
    }
}
class OptionBuilder extends TagBuilder {
    constructor(content, value, id) {
        super('option', id);
        this.innerHTML(content);
        if (!Objects.isDefined(value) && TagBuilderOptions.useOptionContentForEmptyOptionValue)
            this.attr('value', content.trim().toLowerCase().replace(/\s+/g, '-'));
        else
            this.attr('value', Objects.ofNullable(value, ''));
    }
}
class SelectBuilder extends TagBuilder {
    constructor(instructionMessage, id) {
        super('select', id);
        if (this.isHeadlessMode) {
            this.attr('spellcheck', false);
            this.attr('required', false);
        }
        else {
            this.node.spellcheck = false;
            this.node.required = false;
        }
        if (Objects.isDefined(instructionMessage))
            this.append(new OptionBuilder(instructionMessage, "").attr('disabled', ''));
    }
    addOptionGroup(label, ...option) {
        Objects.requireNonNull(label, 'label in SelectBuilder');
        this.append(new TagBuilder('optgroup').attr('label', label).append(...option));
        return this;
    }
    addOption(content, value, classes) {
        this.addOptions([new OptionBuilder(content, value).classes(...classes)]);
        return this;
    }
    addOptions(options) {
        options.forEach(e => {
            if (e instanceof OptionBuilder)
                this.append(e);
            else
                this.append(new OptionBuilder(e));
        });
        return this;
    }
    autocomplete(value) {
        if (this.isHeadlessMode)
            this.attr('autocomplete', value);
        else
            this.node.autocomplete = value;
        return this;
    }
    autofocus() {
        if (this.isHeadlessMode)
            this.attr('autofocus', true);
        else
            this.node.autofocus = true;
        return this;
    }
    disabled() {
        if (this.isHeadlessMode)
            this.attr('disabled', true);
        else
            this.node.disabled = true;
        return this;
    }
    multiple() {
        if (this.isHeadlessMode)
            this.attr('multiple', true);
        else
            this.node.multiple = true;
        return this;
    }
    name(value) {
        if (this.isHeadlessMode)
            this.attr('name', value);
        else
            this.node.name = value;
        return this;
    }
    onInvalid(value) {
        if (this.isHeadlessMode)
            this.attr('oninvalid', `this.setCustomValidity('${value}');`);
        else
            this.node.setCustomValidity(value);
        return this;
    }
    required() {
        if (this.isHeadlessMode)
            this.attr('required', true);
        else
            this.node.required = true;
        return this;
    }
    size(value) {
        if (this.isHeadlessMode)
            this.attr('size', value);
        else
            this.node.size = value;
        return this;
    }
}
class ListItemBuilder extends TagBuilder {
    constructor(html, id) {
        super('li', id);
        this.innerHTML(Objects.ofNullable(html, ''));
    }
}
class ListBuilder extends TagBuilder {
    constructor(isOrdered = false, style = 'none', id) {
        super(isOrdered ? 'ol' : 'ul', id);
        if (Objects.isDefined(style) && style.toLowerCase() !== 'none')
            this.style({ 'list-style': style });
    }
    addItem(item) {
        if (item instanceof ListItemBuilder)
            this.append(item);
        else
            this.append(new ListItemBuilder(item));
        return this;
    }
    addItems(items) {
        items.forEach(e => this.addItem(e));
        return this;
    }
    addSublist(listBuilder) {
        this.append(new TagBuilder('li').append(listBuilder));
        return this;
    }
}
class AudioBuilder extends TagBuilder {
    constructor(src, id) {
        super('audio', id);
        src = Objects.requireNonNull(src, 'src');
        if (this.isHeadlessMode) {
            this.attr('src', src);
            this.attr('controls', true);
        }
        else {
            this.node.src = src;
            this.node.controls = true;
        }
    }
    addFallbackSrc(src, type) {
        this.append(new SourceBuilder(src, type));
        return this;
    }
    loop() {
        if (this.isHeadlessMode)
            this.attr('loop', true);
        else
            this.node.loop = true;
        return this;
    }
    muted() {
        if (this.isHeadlessMode)
            this.attr('muted', true);
        else
            this.node.muted = true;
        return this;
    }
    noControls() {
        if (this.isHeadlessMode)
            this.attr('controls', false);
        else
            this.node.controls = false;
        return this;
    }
    onNotSupported(html) {
        this.fallbackHTML = html;
        return this;
    }
    preload(value) {
        if (this.isHeadlessMode)
            this.attr('preload', value);
        else
            this.node.preload = value;
        return this;
    }
    track(src, kind, isDefault = false, srclang = 'en', label) {
        this.append(new TagBuilder('track').attr("kind", kind).attr('srclang', srclang).attr('src', src).attr('label', label).attr('default', isDefault));
        return this;
    }
    clone() {
        var _a, _b;
        const builder = new AudioBuilder((_b = (_a = this.node) === null || _a === void 0 ? void 0 : _a.src, (_b !== null && _b !== void 0 ? _b : '')), this.tagId);
        builder.fallbackHTML = this.fallbackHTML;
        builder.isCached = this.isCached;
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
    build() {
        if (this.isCached)
            return this.node;
        this.isCached = true;
        if (Objects.isDefined(this.fallbackHTML))
            this.append(this.fallbackHTML);
        return this.node;
    }
    buildHTML() {
        if (this.isCached)
            return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
        this.isCached = true;
        if (Objects.isDefined(this.fallbackHTML))
            this.append(this.fallbackHTML);
        return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
    }
}
class EmbedBuilder extends TagBuilder {
    constructor(src, type, id) {
        super('embed', id);
        src = Objects.requireNonNull(src, 'src in EmbedBuilder');
        type = Objects.requireNonNull(type, 'type in EmbedBuilder');
        if (this.isHeadlessMode) {
            this.attr('src', src);
            this.attr('type', type);
        }
        else {
            this.node.src = src;
            this.node.type = type;
        }
    }
}
class IframeBuilder extends TagBuilder {
    constructor(src, id) {
        super('iframe', id);
        src = Objects.requireNonNull(src, 'src');
        if (this.isHeadlessMode)
            this.attr('src', src);
        else
            this.node.src = src;
    }
    allow(value) {
        if (this.isHeadlessMode)
            this.attr('allow', value);
        else
            this.node.allow = value;
        return this;
    }
    referrerPolicy(value = 'no-referrer-when-downgrade') {
        value = Objects.ofNullable(value, 'no-referrer-when-downgrade');
        if (this.isHeadlessMode)
            this.attr('referrerpolicy', value);
        else
            this.node.referrerPolicy = value;
        return this;
    }
    sandbox(value = '') {
        this.attr('sandbox', value);
        return this;
    }
    srcdoc(value) {
        if (this.isHeadlessMode)
            this.attr('srcdoc', value);
        else
            this.node.srcdoc = value;
        return this;
    }
}
class ImageBuilder extends TagBuilder {
    constructor(src, alt, id) {
        super('img', id);
        src = Objects.requireNonNull(src, 'src');
        alt = Objects.requireNonNull(alt, 'alt');
        if (this.isHeadlessMode) {
            this.attr('src', src);
            this.attr('alt', alt);
            this.attr('title', alt);
        }
        else {
            this.node.src = src;
            this.node.alt = alt;
            this.node.title = alt;
        }
    }
    decoding(value) {
        if (this.isHeadlessMode)
            this.attr('decoding', value);
        else
            this.node.decoding = value;
        return this;
    }
    sizes(value) {
        if (this.isHeadlessMode)
            this.attr('sizes', value);
        else
            this.node.sizes = value;
        return this;
    }
    srcset(value) {
        if (this.isHeadlessMode)
            this.attr('srcset', value);
        else
            this.node.srcset = value;
        return this;
    }
}
class PictureBuilder extends TagBuilder {
    constructor(imgBuilder, id) {
        super('picture', id);
        this.img = imgBuilder;
    }
    source(...source) {
        this.append(...source);
        return this;
    }
    clone() {
        const builder = new PictureBuilder(this.img);
        builder.isCached = this.isCached;
        builder.img = this.img.clone();
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
    build() {
        if (this.isCached)
            return this.node;
        this.isCached = true;
        this.append(this.img);
        return this.node;
    }
    buildHTML() {
        if (this.isCached)
            return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
        this.isCached = true;
        this.append(this.img);
        return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
    }
}
class SourceBuilder extends TagBuilder {
    constructor(src, type, id) {
        super('source', id);
        src = Objects.requireNonNull(src, 'src');
        type = Objects.requireNonNull(type, 'type');
        if (this.isHeadlessMode) {
            this.attr('src', src);
            this.attr('type', type);
        }
        else {
            this.node.src = src;
            this.node.type = type;
        }
    }
    media(value) {
        if (this.isHeadlessMode)
            this.attr('media', value);
        else
            this.node.media = value;
        return this;
    }
    sizes(value) {
        if (this.isHeadlessMode)
            this.attr('sizes', value);
        else
            this.node.sizes = value;
        return this;
    }
    srcset(value) {
        if (this.isHeadlessMode)
            this.attr('srcset', value);
        else
            this.node.srcset = value;
        return this;
    }
}
class VideoBuilder extends TagBuilder {
    constructor(src, type, id) {
        super('video', id);
        src = Objects.requireNonNull(src, 'src');
        this.attr('type', Objects.requireNonNull(type, 'type'));
        if (this.isHeadlessMode) {
            this.attr('src', src);
            this.attr('controls', true);
        }
        else {
            this.node.src = src;
            this.node.controls = true;
        }
    }
    addFallbackSrc(src, type) {
        this.append(new SourceBuilder(src, type));
        return this;
    }
    loop() {
        if (this.isHeadlessMode)
            this.attr('loop', true);
        else
            this.node.loop = true;
        return this;
    }
    muted() {
        if (this.isHeadlessMode)
            this.attr('muted', true);
        else
            this.node.muted = true;
        return this;
    }
    noControls() {
        if (this.isHeadlessMode)
            this.attr('controls', false);
        else
            this.node.controls = false;
        return this;
    }
    onNotSupported(html) {
        this.fallbackHTML = html;
        return this;
    }
    poster(url) {
        url = Objects.requireNonNull(url, 'poster');
        if (this.isHeadlessMode)
            this.attr('poster', url);
        else
            this.node.poster = url;
        return this;
    }
    preload(value) {
        if (this.isHeadlessMode)
            this.attr('preload', value);
        else
            this.node.preload = value;
        return this;
    }
    track(src, kind, isDefault = false, srclang = 'en', label) {
        this.append(new TagBuilder('track').attr("kind", kind).attr('srclang', srclang).attr('src', src).attr('label', label).attr('default', isDefault));
        return this;
    }
    clone() {
        var _a, _b, _c, _d;
        const builder = new VideoBuilder((_b = (_a = this.node) === null || _a === void 0 ? void 0 : _a.src, (_b !== null && _b !== void 0 ? _b : '')), (_d = (_c = this.node) === null || _c === void 0 ? void 0 : _c.getAttribute('type'), (_d !== null && _d !== void 0 ? _d : '')));
        builder.fallbackHTML = this.fallbackHTML;
        builder.isCached = this.isCached;
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
    build() {
        if (this.isCached)
            return this.node;
        this.isCached = true;
        if (Objects.isDefined(this.fallbackHTML))
            this.append(this.fallbackHTML);
        return this.node;
    }
    buildHTML() {
        if (this.isCached)
            return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
        this.isCached = true;
        this.append(this.fallbackHTML);
        return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
    }
}
class MeterBuilder extends TagBuilder {
    constructor(id) {
        super('meter', id);
    }
    min(value) {
        if (this.isHeadlessMode)
            this.attr('min', value);
        else
            this.node.min = value;
        return this;
    }
    max(value) {
        if (this.isHeadlessMode)
            this.attr('max', value);
        else
            this.node.max = value;
        return this;
    }
    minmax(min, max) {
        return this.min(min).max(max);
    }
    low(value) {
        if (this.isHeadlessMode)
            this.attr('low', value);
        else
            this.node.low = value;
        return this;
    }
    high(value) {
        if (this.isHeadlessMode)
            this.attr('high', value);
        else
            this.node.high = value;
        return this;
    }
    lowhigh(low, high) {
        return this.low(low).high(high);
    }
    optimum(value) {
        if (this.isHeadlessMode)
            this.attr('optimum', value);
        else
            this.node.optimum = value;
        return this;
    }
}
class ProgressBuilder extends TagBuilder {
    constructor(value, id) {
        super('progress', id);
        value = Objects.requireNonNull(value, 'value');
        if (this.isHeadlessMode)
            this.attr('value', value);
        else
            this.node.value = value;
    }
    max(value) {
        if (this.isHeadlessMode)
            this.attr('max', value);
        else
            this.node.max = value;
        return this;
    }
}
class FormBuilder extends TagBuilder {
    constructor(actionUrl, method = 'get', id) {
        super('form', id);
        method = Objects.ofNullable(method, 'get');
        actionUrl = Objects.requireNonNull(actionUrl, 'actionUrl of FormBuilder');
        if (this.isHeadlessMode) {
            this.attr('method', method);
            this.attr('action', actionUrl);
        }
        else {
            this.node.method = method;
            this.node.action = actionUrl;
        }
    }
    acceptCharset(...value) {
        if (this.isHeadlessMode)
            this.attr('acceptcharset', value.join(" "));
        else
            this.node.acceptCharset = value.join(" ");
        return this;
    }
    enctype(value) {
        value = Objects.ofNullable(value, 'application/x-www-form-urlencoded');
        if (this.isHeadlessMode)
            this.attr('enctype', value);
        else
            this.node.enctype = value;
        return this;
    }
    rel(value) {
        this.attr('rel', value);
        return this;
    }
    target(value) {
        if (this.isHeadlessMode)
            this.attr('target', value);
        else
            this.node.target = value;
        return this;
    }
    noValidate() {
        if (this.isHeadlessMode)
            this.attr('novalidate', true);
        else
            this.node.noValidate = true;
        return this;
    }
}
class ScriptBuilder extends TagBuilder {
    constructor(id) {
        super('script', id);
        if (this.isHeadlessMode)
            this.attr('async', TagBuilderOptions.scriptAsync);
        else
            this.node.async = TagBuilderOptions.scriptAsync;
    }
    async() {
        if (this.isHeadlessMode)
            this.attr('async', true);
        else
            this.node.async = true;
        return this;
    }
    crossOrigin(value) {
        value = Objects.ofNullable(value, '');
        if (this.isHeadlessMode)
            this.attr('crossorigin', value);
        else
            this.node.crossOrigin = value;
        return this;
    }
    defer() {
        if (this.isHeadlessMode)
            this.attr('defer', true);
        else
            this.node.defer = true;
        return this;
    }
    integrity(value) {
        if (this.isHeadlessMode)
            this.attr('integrity', value);
        else
            this.node.integrity = value;
        return this;
    }
    noModule() {
        if (this.isHeadlessMode)
            this.attr('nomodule', true);
        else
            this.node.noModule = true;
        return this;
    }
    nonce(value) {
        if (this.isHeadlessMode)
            this.attr('nonce', value);
        else
            this.node.nonce = value;
        return this;
    }
    referrerPolicy(value) {
        value = Objects.ofNullable(value, '');
        if (this.isHeadlessMode)
            this.attr('referrerpolicy', value);
        else
            this.node.referrerPolicy = value;
        return this;
    }
    src(url) {
        if (this.isHeadlessMode)
            this.attr('src', url);
        else
            this.node.src = url;
        return this;
    }
    type(value) {
        if (this.isHeadlessMode)
            this.attr('type', value);
        else
            this.node.type = value;
        return this;
    }
}
class ColGroupBuilder extends TagBuilder {
    constructor(id) {
        super('colgroup', id);
    }
    addCol(span, ...aClass) {
        const col = new TagBuilder('col').classes(...aClass);
        if (Objects.isDefined(span))
            col.attr('span', span);
        this.append(col);
        return this;
    }
}
class TableBuilder extends TagBuilder {
    constructor(caption, id) {
        super('table', id);
        this.header = null;
        this.body = null;
        this.caption = null;
        this.colGroupBuilder = null;
        if (this.isHeadlessMode) {
            this.header = new TagBuilder('tr');
            this.body = new TagBuilder('tbody');
        }
        else {
            this.header = this.node.createTHead();
            this.body = this.node.createTBody();
        }
        if (!Objects.isEmptyOrWhitespace(caption))
            if (this.isHeadlessMode)
                this.caption = new TagBuilder('caption').innerHTML(caption);
            else {
                this.caption = this.node.createCaption();
                this.caption.innerHTML = caption;
            }
    }
    addHeader(...html) {
        if (html.length === 0)
            return this;
        const headers = html.map(m => new TagBuilder("th").innerHTML(m));
        if (this.isHeadlessMode)
            this.header.append(...headers.map(m => m.buildHTML()));
        else {
            if (this.node.tHead.firstChild === null)
                this.node.tHead.append(new TagBuilder('tr').build());
            this.node.tHead.firstChild.append(...headers.map(m => m.build()));
        }
        return this;
    }
    addRow(...html) {
        if (html.length === 0)
            return this;
        const rows = html.map(m => new TagBuilder("td").innerHTML(m));
        if (this.isHeadlessMode)
            this.body.append(new TagBuilder("tr").append(...rows));
        else
            this.body.append(new TagBuilder("tr").append(...rows).build());
        return this;
    }
    colgroup(builder) {
        this.colGroupBuilder = builder;
        return this;
    }
    collapse() {
        this.style({ 'border-collapse': 'collapse' });
        return this;
    }
    setHeaders(...html) {
        if (this.isHeadlessMode)
            this.header = new TagBuilder('tr');
        else {
            this.node.deleteTHead();
            this.header = this.node.createTHead();
        }
        if (html.length > 0)
            this.addHeader(...html);
        return this;
    }
    setRows(...rows) {
        if (this.isHeadlessMode)
            this.body = new TagBuilder('tbody');
        else
            this.body.innerHTML = '';
        if (rows.length > 0)
            rows.forEach(row => this.addRow(...row));
        return this;
    }
    clone() {
        var _a;
        const builder = new TableBuilder((_a = this.node) === null || _a === void 0 ? void 0 : _a.caption.innerHTML);
        builder.isCached = this.isCached;
        builder.body = this.body;
        builder.header = this.header;
        builder.colGroupBuilder = this.colGroupBuilder;
        if (this.isHeadlessMode) {
            builder.caption = this.caption.clone();
            builder.hNode = this.hNode.clone();
            return builder;
        }
        builder.caption = builder.node.createCaption();
        builder.caption.innerHTML = this.caption.innerHTML;
        builder.node = this.node.cloneNode(true);
        return builder;
    }
    build() {
        if (this.isCached)
            return this.node;
        this.isCached = true;
        this.buildSections();
        return this.node;
    }
    buildHTML() {
        if (this.isCached)
            return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
        this.isCached = true;
        this.buildSections();
        return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
    }
    buildSections() {
        if (this.isHeadlessMode) {
            this.append(new TagBuilder('thead').append(this.header));
            this.append(this.body);
        }
        if (this.isHeadlessMode && this.caption !== null) {
            if (this.colGroupBuilder !== null)
                this.prepend(this.colGroupBuilder);
            this.prepend(this.caption);
        }
        if (this.colGroupBuilder !== null) {
            if (!this.isHeadlessMode && this.caption !== null) {
                this.caption.insertAdjacentElement('afterend', this.colGroupBuilder.build());
            }
            else if (this.isHeadlessMode)
                this.prepend(this.colGroupBuilder);
            else
                this.node.prepend(this.colGroupBuilder.build());
        }
    }
}
class SlotBuilder extends TagBuilder {
    constructor(name, content, id) {
        super('slot', id);
        Objects.requireNonNull(content, 'content in SlotBuilder');
        name = Objects.requireNonNull(name, 'name in SlotBuilder');
        if (this.isHeadlessMode)
            this.hNode.attr('name', name);
        else
            this.node.name = name;
        this.append(content);
    }
}
class TemplateBuilder extends TagBuilder {
    constructor(id) {
        super('template', id);
        this.styleBuilder = null;
        Objects.requireNonNull(id, 'id in Template Builder');
    }
    addStylesToRoot(cssText) {
        if (!Objects.isDefined(cssText))
            return this;
        if (this.styleBuilder !== null)
            this.styleBuilder.append(cssText);
        else
            this.styleBuilder = new TagBuilder('style').innerText(cssText);
        return this;
    }
    addSlots(...slot) {
        if (!Objects.isDefined(slot) || slot.length === 0)
            return this;
        this.append(...slot);
        return this;
    }
    clone() {
        const builder = new TemplateBuilder(this.tagId);
        builder.isCached = this.isCached;
        if (this.styleBuilder !== null)
            builder.styleBuilder = this.styleBuilder.clone();
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
    buildHTML() {
        if (this.isCached)
            return this.hNode.build();
        this.isCached = true;
        this.prepend(this.styleBuilder);
        return this.isHeadlessMode ? this.hNode.build() : this.build().outerHTML;
    }
    build() {
        if (this.isCached)
            return this.node;
        this.isCached = true;
        this.prepend(this.styleBuilder);
        return this.node;
    }
}
class SVGBuilder extends AbstractTagBuilder {
    constructor(viewBox, id, xmlns = 'http://www.w3.org/2000/svg') {
        super('svg', id, xmlns);
        if (Objects.isEmptyOrWhitespace(xmlns))
            Objects.requireNonNull(null, 'xmlns');
        if (!Objects.isEmptyOrWhitespace(viewBox))
            this.attr('viewBox', viewBox);
    }
    bounds(width, height) {
        this.width(width);
        this.height(height);
        return this;
    }
    height(height) {
        this.attr('height', height);
        return this;
    }
    width(width) {
        this.attr('width', width);
        return this;
    }
    clone() {
        const builder = new SVGBuilder();
        builder.isCached = this.isCached;
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
}
class SVGElementBuilder extends AbstractTagBuilder {
    constructor(element, xmlns = 'http://www.w3.org/2000/svg', id) {
        super(element, id, xmlns);
        if (Objects.isEmptyOrWhitespace(xmlns))
            Objects.requireNonNull(null, 'xmlns');
    }
    fill(value) {
        this.attr('fill', value);
        return this;
    }
    stroke(stroke, width) {
        this.attr('stroke', stroke);
        this.attr('stroke-width', width);
        return this;
    }
    width(width) {
        this.attr('width', width);
        return this;
    }
    height(height) {
        this.attr('height', height);
        return this;
    }
    bounds(width, height) {
        this.width(width);
        this.height(height);
        return this;
    }
    preserveAspectRatio(value) {
        this.attr('preserveAspectRatio', value);
        return this;
    }
    x(value) {
        this.attr('x', value);
        return this;
    }
    y(value) {
        this.attr('y', value);
        return this;
    }
    viewBox(viewBox) {
        this.attr('viewBox', viewBox);
        return this;
    }
    clone() {
        const builder = new SVGElementBuilder(this.tagName);
        builder.isCached = this.isCached;
        if (this.isHeadlessMode)
            builder.hNode = this.hNode.clone();
        else
            builder.node = this.node.cloneNode(true);
        return builder;
    }
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        TagBuilder,
        TagBuilderOptions,
        Objects,
        BlockquoteBuilder,
        FieldsetBuilder,
        FigureBuilder,
        AnchorBuilder,
        DownloadLinkBuilder,
        AreaBuilder,
        DownloadAreaBuilder,
        DataBuilder,
        SpanBuilder,
        InputBuilder,
        NumberInputBuilder,
        CheckboxInputBuilder,
        RadioInputBuilder,
        RangeInputBuilder,
        DateInputBuilder,
        DateTimeLocalInputBuilder,
        MonthInputBuilder,
        TimeInputBuilder,
        WeekInputBuilder,
        FileInputBuilder,
        ImageInputBuilder,
        TextInputBuilder,
        EmailInputBuilder,
        PasswordInputBuilder,
        SearchInputBuilder,
        TelInputBuilder,
        UrlInputBuilder,
        TextAreaBuilder,
        DataListBuilder,
        DLBuilder,
        DetailsBuilder,
        OptionBuilder,
        SelectBuilder,
        ListItemBuilder,
        ListBuilder,
        SourceBuilder,
        AudioBuilder,
        EmbedBuilder,
        IframeBuilder,
        ImageBuilder,
        PictureBuilder,
        VideoBuilder,
        MeterBuilder,
        ProgressBuilder,
        FormBuilder,
        ScriptBuilder,
        ColGroupBuilder,
        TableBuilder,
        SlotBuilder,
        TemplateBuilder,
        SVGBuilder,
        SVGElementBuilder
    };
}
