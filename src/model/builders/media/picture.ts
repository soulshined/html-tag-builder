class PictureBuilder extends TagBuilder<HTMLPictureElement> {
    private img: ImageBuilder;

    constructor(imgBuilder: ImageBuilder, id?: string) {
        super('picture', id);
        this.img = imgBuilder;
    }

    source(...source: SourceBuilder[]) {
        this.append(...source);
        return this;
    }

    clone() {
        const builder = new PictureBuilder(this.img);
        builder.isCached = this.isCached;
        builder.img = this.img.clone() as ImageBuilder;
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as HTMLPictureElement;

        return builder as PictureBuilder;
    }

    build() {
        if (this.isCached) return this.node;

        this.isCached = true;
        this.append(this.img);
        return this.node;
    }

    buildHTML() {
        if (this.isCached) return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;

        this.isCached = true;
        this.append(this.img);
        return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
    }

}