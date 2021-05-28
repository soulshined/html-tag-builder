class TagBuilder<T extends HTMLElement> {
    protected node: T = null;
    protected hNode: HeadlessNodeBuilder = null;
    protected isCached: boolean = false;

    constructor(tagName: string, id?: string) {
        Objects.requireNonNull(tagName, 'tagName in TagBuilder');
        tagName = tagName.trim().toLowerCase();

        if (TagBuilderOptions.mode === 'headless') {
            this.hNode = this.headlessBuilder(tagName, id);
            return;
        }

        const elem = document.createElement(tagName);
        elem.contentEditable = 'inherit';
        elem.draggable = false;

        if (!Objects.isEmptyOrWhitespace(id)) {
            if (document.querySelector(`#${id}`) !== null)
                throw new Error(`Tag with '${id}' id already exists in the document tree`);
            elem.id = id;
        }
        this.node = elem as T;
    }

    //region attributes
    accessKey(value: string) {
        if (this.isHeadlessMode) this.hNode.attr('accesskey', value);
        else this.node.accessKey = value.trim();
        return this;
    }

    attr(key: string, value: any) {
        if (this.isHeadlessMode) this.hNode.attr(key, value);
        else this.node.setAttribute(key, `${value}`);
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

    slot(value: string) {
        if (this.isHeadlessMode) this.hNode.attr('slot', value);
        else this.node.slot = value;
        return this;
    }

    spellcheck() {
        if (this.isHeadlessMode) this.hNode.attr('spellcheck', true);
        else this.node.spellcheck = true;
        return this;
    }

    tabIndex(index: number) {
        if (this.isHeadlessMode) this.hNode.attr('tabindex', index);
        else this.node.tabIndex = index;
        return this;
    }

    title(title: string) {
        if (this.isHeadlessMode) this.hNode.attr('title', title);
        else this.node.title = title;
        return this;
    }
    //endregion attrs

    //region relationships
    append(...child: (html | TagBuilder<HTMLElement>)[]) {
        child = child.filter(e => Objects.isDefined(e));

        if (child.length === 0) return this;

        if (this.isHeadlessMode) {
            this.hNode.append(...child.map(e => {
                if (e instanceof TagBuilder)
                    return e.buildHTML();
                else return e;
            }));
            return this;
        }

        this.node.append(...child.map(e => {
            if (e instanceof TagBuilder)
                return e.build();
            else return e;
        }))
        return this;
    }

    prepend(...child: (html | TagBuilder<HTMLElement>)[]) {
        child = child.filter(e => Objects.isDefined(e));

        if (child.length === 0) return this;

        if (this.isHeadlessMode) {
            this.hNode.prepend(...child.map(e => {
                if (e instanceof TagBuilder)
                    return e.buildHTML();
                else return e;
            }));
            return this;
        }

        this.node.prepend(...child.map(e => {
            if (e instanceof TagBuilder)
                return e.build();
            else return e;
        }))
        return this;
    }

    insertAdjacent(sibling: TagBuilder<HTMLElement>, placement: 'after' | 'before' = 'after') {
        if (this.isHeadlessMode)
            this.hNode.insertAdjacent(sibling.buildHTML(), placement === 'before' ? 'before' : 'after')

        else this.node.insertAdjacentElement(placement === 'before' ? 'beforebegin' : 'afterend', sibling.build() as HTMLElement);
        return this;
    }
    //endregion relationships

    //region content
    innerHTML(html: html) {
        if (this.isHeadlessMode) this.hNode.innerHTML(html)
        else this.node.innerHTML = html;
        return this;
    }

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

    bounds(width: string, height: string) {
        this.style({ width, height });
        return this;
    }

    caret(color: string) {
        this.style({ 'caret-color': color });
        return this;
    }

    classes(...aClass: classes) {
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
        })
        return this;
    }

    height(height: string) {
        this.style({ height });
        return this;
    }

    margin(...cssShorthand: string[]) {
        if (cssShorthand.length > 4 || cssShorthand.length === 0) return this;

        this.style({ 'margin': cssShorthand.join(" ") });
        return this;
    }

    origin(top?: string, right?: string, bottom?: string, left?: string) {
        if (!Objects.isEmptyOrWhitespace(top)) this.style({ top });
        if (!Objects.isEmptyOrWhitespace(right)) this.style({ right });
        if (!Objects.isEmptyOrWhitespace(bottom)) this.style({ bottom });
        if (!Objects.isEmptyOrWhitespace(left)) this.style({ left });
        return this;
    }

    padding(...cssShorthand: string[]) {
        if (cssShorthand.length > 4 || cssShorthand.length === 0) return this;

        this.style({ 'padding': cssShorthand.join(" ") });
        return this;
    }

    position(value: 'relative' | 'absolute' | 'static' | 'fixed' | 'sticky') {
        this.style({ 'position': value });
        return this;
    }

    style(obj: { [key: string]: string | number | boolean }) {
        for (const [key, value] of Object.entries(obj)) {
            if (key === 'undefined' || key === 'null' || !Objects.isDefined(value)) continue;
            if (this.isHeadlessMode) {
                this.hNode.style(key, value);
                continue;
            }
            if (window.CSS.supports(key, value.toString()))
                this.node.style[key] = value.toString();
            else console.debug(`Entry/value is not supported => ${key} : ${value}`);
        }
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

    width(width: string) {
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

    //region events
    on(event: keyof GlobalEventHandlersEventMap, listener: (this: HTMLElement, ev: Event) => any, options?: boolean | AddEventListenerOptions) {
        if (this.isHeadlessMode) this.hNode.attr(`on${event}`.toLowerCase(), listener);
        else this.node.addEventListener(event, listener, options);
        return this;
    }
    //endregion events

    //region model
    clone(): TagBuilder<T> {
        const builder = new TagBuilder(this.tagName, this.tagId);
        builder.isCached = this.isCached;
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as T;
        return builder as TagBuilder<T>;
    }

    build(): T {
        return this.node;
    }

    buildHTML(): html {
        return this.isHeadlessMode ? this.hNode.build() : this.build().outerHTML;
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

    public get tagName(): string {
        return this.isHeadlessMode ? this.hNode.tagName().toUpperCase() : this.node.tagName;
    }

    public get tagId(): string | null {
        return this.isHeadlessMode ? this.hNode.tagId() : this.node.id;
    }

    protected get isHeadlessMode(): boolean {
        return TagBuilderOptions.mode === 'headless' || Objects.isDefined(this.hNode);
    }

    private headlessBuilder(tagName: string, id?: string): HeadlessNodeBuilder {
        class HNode {
            private _tagName: string;
            private _attrs: Attributes = new Attributes();
            private _children: html[] = [];
            private _siblings = new Attributes([
                ['before', []],
                ['after', []]
            ]);
            private _styles: Attributes = new Attributes();

            constructor(tagName: string, id?: string) {
                this._tagName = tagName;
                if (!Objects.isEmptyOrWhitespace(id))
                    this.attrs.set('id', id);
                this.attrs.set('draggable', false);
                this.attrs.set('class', new Set<string>());
            }

            public get tagName() : string {
                return this._tagName;
            }

            public get attrs() : Attributes {
                return this._attrs;
            }

            public get children() : html[] {
                return this._children;
            }

            public get siblings() : Map<string, html[]> {
                return this._siblings;
            }

            public get styles() : Attributes {
                return this._styles;
            }

            public get classes() : Set<string> {
                return this.attrs.get('class');
            }

            public static from(node: HNode) {
                const newnode = new HNode(node._tagName, node.attrs.get('id'));
                newnode._attrs = node.attrs.clone();
                newnode._children = [...node._children];
                newnode._siblings = node._siblings.clone();
                newnode._styles = node._styles.clone();
                return newnode;
            }
        }

        const createNode = function (tagName, id, node?: HNode): HeadlessNodeBuilder {
            let hnode = new HNode(tagName, id);
            if (node !== undefined && node !== null)
                hnode = HNode.from(node);

            return {
                //region attributes
                attr: function (key: string, value: any): HeadlessNodeBuilder {
                    hnode.attrs.set(key, `${value}`);
                    return this;
                },
                //endregion attrs

                //region relationships
                append: function (...child: html[]) {
                    hnode.children.push(...child);
                    return this;
                },
                prepend: function (...child: html[]) {
                    hnode.children.unshift(...child);
                    return this;
                },
                insertAdjacent: function (sibling: html, placement: 'before' | 'after') {
                    hnode.siblings.get(placement).push(sibling);
                    return this;
                },
                //endregion relationships

                innerHTML: function (html: html) {
                    hnode.children.splice(0, hnode.children.length, html);
                    return this;
                },

                //region styling
                classes: function (classes: classes) {
                    classes.forEach(e => {
                        if (typeof e !== 'string' || e.constructor !== String)
                            throw new Error(`Invalid datatype for class name. Got '${typeof e}' expecting string for node: [tagName = '${tagName}']`);
                        hnode.classes.add(e.trim());
                    })
                    return this;
                },

                style: function (property: string, value: any) {
                    if (!Objects.isDefined(property) || !Objects.isDefined(value))
                        return this;

                    hnode.styles.set(property, `${value}`);
                    return this;
                },
                //endregion styling

                //region model
                tagName: () => {
                    return hnode.tagName;
                },

                tagId: () => {
                    return hnode.attrs.get('id') ?? null;
                },

                clone: function () {
                    return createNode(tagName, id, hnode);
                },

                build: () => {
                    let attributes = ``;

                    //attrs
                    hnode.attrs.forEach((v: any, k: string) => {
                        if (k.trim() === 'class') {
                            if (v.size > 0)
                                attributes += ` class="${[...v].join(" ")}"`;

                            return;
                        }
                        v = Objects.isEmptyOrWhitespace(v) ? '' : v;
                        attributes += ` ${k}="${v}"`;
                    });

                    //styles
                    if (hnode.styles.size > 0) {
                        attributes += ` style="`;
                        let style = '';
                        hnode.styles.forEach((v: any, k: string) => {
                            v = Objects.isEmptyOrWhitespace(v) ? '' : v;
                            style += ` ${k.trim()}: ${v.trim()};`;
                        })
                        attributes += `${style.trim()}"`;
                    }

                    if (SELF_CLOSING.includes(tagName))
                        return `<${tagName}${attributes}>`

                    return hnode.siblings.get('before').join() +
                        `<${tagName}${attributes}>` +
                        (hnode.children.length === 0 ? '' : hnode.children.join("")) +
                        `</${tagName}>` +
                        hnode.siblings.get('after').join();
                }
                //endregion model
            }
        }

        return createNode(tagName, id);
    }
}