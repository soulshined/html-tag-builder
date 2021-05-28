class EmbedBuilder extends TagBuilder<HTMLEmbedElement> {

    constructor(src: string, type: string, id?: string) {
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