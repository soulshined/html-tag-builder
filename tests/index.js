class HeadlessTest {
    constructor(builder) {
        this.builder = builder;
    }

    toBe(expecting) {
        console.log('Expected Node', expecting);
        console.log('Builder Node ', this.builder.buildHTML());
        expect(this.builder.buildHTML()).toBe(expecting);
    }
}

class BuilderTest {
    constructor(builder) {
        this.builder = builder;
    }

    toBe(expecting) {
        if (expecting instanceof HTMLElement)
            expecting = expecting.outerHTML;

        const node = this.builder.build();
        this.builder.build(); //intentionally called twice for testing
        console.log('Expected Node', expecting);
        console.log('Builder Node ', node.outerHTML);
        expect(node.outerHTML).toBe(expecting);
    }

    toEqualNode(expecting) {
        console.log('Expected Node', expecting);
        console.log('Builder Node ', this.builder.build());
        expect(this.builder.build()).toEqual(expecting);
    }

}

const createHDocElement = (tagName, opts = { contentEditable: false, draggable: false, innerHTML: null, id: null, classes: [], attrs: new Map }) => {

    const SELF_CLOSING = [
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
    ];
    let tag = `<${tagName}`;
    if (opts.id !== null && opts.id !== undefined)
        tag += ` id="${opts.id}"`;

    tag += ` draggable="${opts.draggable || false}"`;

    if (opts.classes && opts.classes.length > 0)
        tag += ` class="${opts.classes.join(" ")}"`;

    if (opts.attrs && opts.attrs.size > 0) {
        for (const [k, v] of opts.attrs.entries()) {
            tag += ` ${k}="${v}"`;
        }
    }

    if (opts.contentEditable && opts.contentEditable !== 'inherit')
        tag += ` contenteditable="${opts.contentEditable}"`;
    if (opts.value && opts.innerHTML !== null)
        tag += ` value="${opts.value || ''}"`;

    tag = tag.replace(/\s+/g, ' ');
    if (SELF_CLOSING.includes(tagName)) return tag += '>';

    tag = tag.trimEnd() + '>';
    if (opts.innerHTML !== undefined && opts.innerHTML !== null)
        tag += opts.innerHTML;

    return tag += `</${tagName}>`;

}
const createDocElement = (tagName, opts = { contentEditable: false, draggable: false, innerHTML: null }) => {
    const tag = document.createElement(tagName);
    tag.contentEditable = opts.contentEditable || 'inherit';
    tag.draggable = opts.draggable || false;
    if (opts.innerHTML !== undefined && opts.innerHTML !== null)
        tag.innerHTML = opts.innerHTML || '';
    if (opts.value !== undefined && opts.innerHTML !== null)
        tag.value = opts.value || '';
    return tag;
}