/// <reference path="./abstract-builder.ts" />

class TagBuilder<T extends HTMLElement> extends AbstractTagBuilder<T> {
    constructor(tagName: string, id?: string) {
        super(tagName, id);
    }

    //region attributes
    accessKey(value: string) {
        if (this.isHeadlessMode) this.hNode.attr('accesskey', value);
        else this.node.accessKey = value.trim();
        return this;
    }

    inputMode(value: string = 'text') {
        value = Objects.ofNullable(value, 'text');
        if (this.isHeadlessMode) this.hNode.attr('inputmode', value);
        else this.node.inputMode = value;
        return this;
    }

    contentEditable() {
        if (this.isHeadlessMode) this.hNode.attr('contenteditable', true);
        else this.node.contentEditable = 'true';
        return this;
    }

    dir(value: 'ltr' | 'rtl' | 'auto') {
        if (this.isHeadlessMode) this.hNode.attr('dir', value);
        else this.node.dir = value;
        return this;
    }

    draggable() {
        if (this.isHeadlessMode) this.hNode.attr('draggable', true);
        else this.node.draggable = true;
        return this;
    }

    hidden() {
        if (this.isHeadlessMode) this.hNode.attr('hidden', true);
        else this.node.hidden = true;
        return this;
    }

    spellcheck() {
        if (this.isHeadlessMode) this.hNode.attr('spellcheck', true);
        else this.node.spellcheck = true;
        return this;
    }

    title(title: string) {
        if (this.isHeadlessMode) this.hNode.attr('title', title);
        else this.node.title = title;
        return this;
    }
    //endregion attrs

    //region content
    innerText(text: string) {
        if (this.isHeadlessMode) this.hNode.innerHTML(text);
        else this.node.innerText = text;
        return this;
    }
    //endregion content

    //styling
    autocapitalize(value: 'off' | 'on' | 'none' | 'sentences' | 'words' | 'characters') {
        if (this.isHeadlessMode) this.hNode.attr('autocapitalize', value);
        else this.node.autocapitalize = value;
        return this;
    }

    bounds(width: string, height: string): TagBuilder<T> {
        this.style({ width, height });
        return this;
    }

    caret(color: string) {
        this.style({ 'caret-color': color });
        return this;
    }

    height(height: string): TagBuilder<T> {
        this.style({ height });
        return this;
    }

    textcase(transform: 'uppercase' | 'lowercase' | 'none' | 'capitalize' | 'inherit') {
        if (['uppercase', 'lowercase', 'none', 'capitalize', 'inherit'].includes(transform)) {
            this.style({ 'text-transform': transform });
        }
        return this;
    }

    visibility(value: 'visible' | 'hidden' | 'collapse') {
        this.style({ 'visibility': value });
        return this;
    }

    width(width: string): TagBuilder<T> {
        this.style({ width });
        return this;
    }
    //styling

    //region custom
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
        })
        return this;
    }
    //endregion custom

    //region model
    clone(): TagBuilder<T> {
        const builder = new TagBuilder(this.tagName, this.tagId);
        builder.isCached = this.isCached;
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as T;
        return builder as TagBuilder<T>;
    }

    public static parse(html: html): TagBuilder<HTMLElement>[] {
        if (TagBuilderOptions.mode === 'headless')
            throw new Error('Parse is not supported in headless mode');

        const template = document.createElement('template');
        template.innerHTML = html;
        const nodes = template.content.childNodes;
        if (nodes.length === 0) return null;

        const result = [...nodes].filter(e => e.nodeType === 1).map((e: HTMLElement) => {
            const builder = new TagBuilder(e.tagName, e.id);

            Object.entries(e.attributes).forEach(entry => {
                builder.attr(entry[1].name, entry[1].value);
            })

            builder.node.append(...e.children);
            return builder;
        });

        return result.length === 0 ? null : result;
    }

}