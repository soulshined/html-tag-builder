class FigureBuilder extends TagBuilder<HTMLElement> {
    private caption: TagBuilder<HTMLElement> = new TagBuilder("figcaption");
    private captionPlacement: 'top' | 'bottom' = 'bottom';

    constructor(caption?: html, captionPlacement: 'top' | 'bottom' = 'bottom', id?: string) {
        super('figure', id);
        if (!Objects.isEmptyOrWhitespace(caption))
            this.caption.innerHTML(caption);
        this.captionPlacement = captionPlacement;
    }

    clone() {
        const builder = new FigureBuilder();
        builder.caption = this.caption;
        builder.captionPlacement = this.captionPlacement;
        builder.isCached = this.isCached;
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as HTMLElement;

        return builder;
    }

    build() {
        if (this.isCached) return this.node;

        this.isCached = true;
        if (this.captionPlacement === 'bottom')
            this.append(this.caption)
        else this.prepend(this.caption);

        return this.node;
    }

    buildHTML() {
        if (this.isCached) return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;

        this.isCached = true;
        if (this.captionPlacement === 'bottom')
            this.append(this.caption)
        else this.prepend(this.caption);

        return this.hNode.build();
    }
}