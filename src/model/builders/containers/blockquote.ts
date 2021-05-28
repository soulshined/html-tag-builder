class BlockquoteBuilder extends TagBuilder<HTMLQuoteElement> {
    constructor(cite?: string, id?: string) {
        super('blockquote', id);
        if (this.isHeadlessMode)
            this.attr('cite', cite);
        else this.node.cite = cite;
    }
}