class ColGroupBuilder extends TagBuilder<HTMLElement> {

    constructor(id?: string) {
        super('colgroup', id);
    }

    addCol(span?: number, ...aClass: classes) {
        const col = new TagBuilder('col').classes(...aClass);
        if (Objects.isDefined(span))
            col.attr('span', span);
        this.append(col);
        return this;
    }

}

class TableBuilder extends TagBuilder<HTMLTableElement> {
    private header: TagBuilder<HTMLTableRowElement> | HTMLTableSectionElement = null;
    private body: TagBuilder<HTMLTableSectionElement> | HTMLTableSectionElement = null;
    private caption: TagBuilder<HTMLTableCaptionElement> | HTMLTableCaptionElement = null;
    private colGroupBuilder: ColGroupBuilder = null;

    constructor(caption?: html, id?: string) {
        super('table', id);
        if (this.isHeadlessMode) {
            this.header = new TagBuilder<HTMLTableRowElement>('tr');
            this.body = new TagBuilder<HTMLTableSectionElement>('tbody');
        }
        else {
            this.header = this.node.createTHead();
            this.body = this.node.createTBody();
        }
        if (!Objects.isEmptyOrWhitespace(caption))
            if (this.isHeadlessMode)
                this.caption = new TagBuilder<HTMLTableCaptionElement>('caption').innerHTML(caption);
            else {
                this.caption = this.node.createCaption();
                this.caption.innerHTML = caption;
            }
    }

    addHeader(...html: html[]) {
        if (html.length === 0) return this;

        const headers = html.map(m => new TagBuilder("th").innerHTML(m));
        if (this.isHeadlessMode) this.header.append(...headers.map(m => m.buildHTML()));
        else {
            if (this.node.tHead.firstChild === null)
                this.node.tHead.append(new TagBuilder('tr').build());
            (this.node.tHead.firstChild as HTMLElement).append(...headers.map(m => m.build()));
        }
        return this;
    }

    addRow(...html: html[]) {
        if (html.length === 0) return this;

        const rows = html.map(m => new TagBuilder("td").innerHTML(m));
        if (this.isHeadlessMode)
            (this.body as TagBuilder<HTMLTableSectionElement>).append(new TagBuilder("tr").append(...rows));
        else
            (this.body as HTMLTableSectionElement).append(new TagBuilder("tr").append(...rows).build());
        return this;
    }

    colgroup(builder: ColGroupBuilder) {
        this.colGroupBuilder = builder;
        return this;
    }

    collapse() {
        this.style({ 'border-collapse': 'collapse' });
        return this;
    }

    setHeaders(...html: html[]) {
        if (this.isHeadlessMode) this.header = new TagBuilder<HTMLTableRowElement>('tr');
        else {
            this.node.deleteTHead();
            this.header = this.node.createTHead();
        }
        if (html.length > 0) this.addHeader(...html);
        return this;
    }

    setRows(...rows: html[][]) {
        if (this.isHeadlessMode) this.body = new TagBuilder<HTMLTableSectionElement>('tbody');
        else this.body.innerHTML = '';
        if (rows.length > 0) rows.forEach(row => this.addRow(...row));
        return this;
    }

    clone() {
        const builder = new TableBuilder(this.node?.caption.innerHTML);
        builder.isCached = this.isCached;
        builder.body = this.body;
        builder.header = this.header;
        builder.colGroupBuilder = this.colGroupBuilder;

        if (this.isHeadlessMode) {
            builder.caption = (this.caption as TagBuilder<HTMLTableCaptionElement>).clone();
            builder.hNode = this.hNode.clone();
            return builder;
        }

        builder.caption = builder.node.createCaption();
        builder.caption.innerHTML = this.caption.innerHTML as string;
        builder.node = this.node.cloneNode(true) as HTMLTableElement;
        return builder;
    }

    build() {
        if (this.isCached) return this.node;

        this.isCached = true;
        this.buildSections();
        return this.node;
    }

    buildHTML() {
        if (this.isCached) return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;

        this.isCached = true;
        this.buildSections();
        return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
    }

    private buildSections() {
        if (this.isHeadlessMode) {
            this.append(new TagBuilder('thead').append((this.header as TagBuilder<HTMLTableRowElement>)));
            this.append((this.body as TagBuilder<HTMLTableSectionElement>));
        }

        if (this.isHeadlessMode && this.caption !== null) {
            if (this.colGroupBuilder !== null)
                this.prepend(this.colGroupBuilder);
            this.prepend(this.caption as TagBuilder<HTMLTableCaptionElement>);
        }
        if (this.colGroupBuilder !== null) {
            if (!this.isHeadlessMode && this.caption !== null) {
                (this.caption as HTMLTableCaptionElement).insertAdjacentElement('afterend', this.colGroupBuilder.build() as HTMLElement);
            }
            else if (this.isHeadlessMode) this.prepend(this.colGroupBuilder)
            else this.node.prepend(this.colGroupBuilder.build());
        }
    }

}