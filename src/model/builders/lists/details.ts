class DetailsBuilder extends TagBuilder<HTMLDetailsElement> {

    constructor(summary?: html, open: boolean = false, id?: string) {
        super('details', id);
        if (this.isHeadlessMode) this.attr('open', open);
        else this.node.open = open;
        if (Objects.isDefined(summary))
            this.prepend(new TagBuilder('summary').innerHTML(summary));
    }

}