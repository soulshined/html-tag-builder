class SourceBuilder extends TagBuilder<HTMLSourceElement> {
    constructor(src: string, type: string, id?: string) {
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

    media(value: string) {
        if (this.isHeadlessMode) this.attr('media', value);
        else this.node.media = value;
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