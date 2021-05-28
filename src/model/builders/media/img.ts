class ImageBuilder extends TagBuilder<HTMLImageElement> {

    constructor(src: string, alt: string, id?: string) {
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

    decoding(value: 'sync' | 'async' | 'auto') {
        if (this.isHeadlessMode) this.attr('decoding', value);
        else this.node.decoding = value;
        return this;
    }

    sizes(value: string) {
        if (this.isHeadlessMode) this.attr('sizes', value);
        else this.node.sizes = value;
        return this;
    }

    srcset(value: string) {
        if (this.isHeadlessMode) this.attr('srcset', value);
        else this.node.srcset = value;
        return this;
    }

}