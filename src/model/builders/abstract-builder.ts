abstract class AbstractTagBuilder<T extends HTMLElement | SVGElement> {
    private _node: T = null;
    private _hNode: HeadlessNodeBuilder = null;
    private _isCached: boolean = false;

    constructor(tagName: string, id?: string, xmlns?: string) {
        Objects.requireNonNull(tagName, 'tagName in TagBuilder');
        tagName = tagName.trim().toLowerCase();

        if (TagBuilderOptions.mode === 'headless') {
            this.hNode = this.headlessBuilder(tagName, id, xmlns);
            return;
        }

        if (!Objects.isEmptyOrWhitespace(xmlns)) {
            const elem = document.createElementNS(xmlns, tagName);
            this.node = elem as T;
        }
        else {
            const elem = document.createElement(tagName);
            elem.contentEditable = 'inherit';
            elem.draggable = false;
            this.node = elem as T;
        }

        if (!Objects.isEmptyOrWhitespace(id)) {
            if (document.querySelector(`#${id}`) !== null)
                throw new Error(`Tag with '${id}' id already exists in the document tree`);
            this.node.id = id;
        }
    }

    //region attributes
    attr(key: string, value: any) {
        if (this.isHeadlessMode) this.hNode.attr(key, value);
        else this.node.setAttribute(key, `${value}`);
        return this;
    }

    slot(value: string) {
        if (this.isHeadlessMode) this.hNode.attr('slot', value);
        else this.node.slot = value;
        return this;
    }

    tabIndex(index: number) {
        if (this.isHeadlessMode) this.hNode.attr('tabindex', index);
        else this.node.tabIndex = index;
        return this;
    }
    //endregion attrs

    //region relationships
    append(...child: (html | AbstractTagBuilder<HTMLElement | SVGElement>)[]) {
        child = child.filter(e => Objects.isDefined(e));

        if (child.length === 0) return this;

        if (this.isHeadlessMode) {
            this.hNode.append(...child.map(e => {
                if (e instanceof AbstractTagBuilder)
                    return e.buildHTML();
                else return e;
            }));
            return this;
        }

        this.node.append(...child.map(e => {
            if (e instanceof AbstractTagBuilder)
                return e.build();
            else return e;
        }))
        return this;
    }

    prepend(...child: (html | AbstractTagBuilder<HTMLElement | SVGElement>)[]) {
        child = child.filter(e => Objects.isDefined(e));

        if (child.length === 0) return this;

        if (this.isHeadlessMode) {
            this.hNode.prepend(...child.map(e => {
                if (e instanceof AbstractTagBuilder)
                    return e.buildHTML();
                else return e;
            }));
            return this;
        }

        this.node.prepend(...child.map(e => {
            if (e instanceof AbstractTagBuilder)
                return e.build();
            else return e;
        }))
        return this;
    }

    insertAdjacent(sibling: AbstractTagBuilder<T>, placement: 'after' | 'before' = 'after') {
        if (this.isHeadlessMode)
            this.hNode.insertAdjacent(sibling.buildHTML(), placement === 'before' ? 'before' : 'after')

        else this.node.insertAdjacentElement(placement === 'before' ? 'beforebegin' : 'afterend', sibling.build() as T);
        return this;
    }
    //endregion relationships

    //region content
    innerHTML(html: html) {
        if (this.isHeadlessMode) this.hNode.innerHTML(html)
        else this.node.innerHTML = html;
        return this;
    }
    //endregion content

    //styling
    public abstract bounds(width: string | number, height: string | number): AbstractTagBuilder<T>;

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

    public abstract height(height: string): AbstractTagBuilder<T>;

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

    public abstract width(width: string): AbstractTagBuilder<T>;
    //styling

    //region events
    on(event: keyof GlobalEventHandlersEventMap, listener: (this: T, ev: Event) => any, options?: boolean | AddEventListenerOptions) {
        if (this.isHeadlessMode) this.hNode.attr(`on${event}`.toLowerCase(), listener);
        else this.node.addEventListener(event, listener, options);
        return this;
    }
    //endregion events

    //region model
    public abstract clone(): AbstractTagBuilder<T>;

    build(): T {
        return this.node;
    }

    buildHTML(): html {
        return this.isHeadlessMode ? this.hNode.build() : this.build().outerHTML;
    }

    protected get isSVGElement(): boolean {
        return this.node instanceof SVGElement;
    }

    protected get isCached(): boolean {
        return this._isCached;
    }

    protected set isCached(val: boolean) {
        this._isCached = val;
    }

    protected get node(): T {
        return this._node;
    }

    protected set node(node: T) {
        this._node = node;
    }

    protected get hNode(): HeadlessNodeBuilder {
        return this._hNode;
    }

    protected set hNode(hNode: HeadlessNodeBuilder) {
        this._hNode = hNode;
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

    private headlessBuilder(tagName: string, id?: string, xmlns?: string): HeadlessNodeBuilder {
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

                if (!Objects.isEmptyOrWhitespace(xmlns))
                    this.attrs.set('xmlns', xmlns);
                else
                    this.attrs.set('draggable', false);

                this.attrs.set('class', new Set<string>());
            }

            public get tagName(): string {
                return this._tagName;
            }

            public get attrs(): Attributes {
                return this._attrs;
            }

            public get children(): html[] {
                return this._children;
            }

            public get siblings(): Map<string, html[]> {
                return this._siblings;
            }

            public get styles(): Attributes {
                return this._styles;
            }

            public get classes(): Set<string> {
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