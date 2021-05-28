class DLBuilder extends TagBuilder<HTMLDListElement> {
    private div: TagBuilder<HTMLDivElement> = null;

    constructor(wrapDtDdGroupsInDiv: boolean = false, groupsDivClasses: classes = [], id?: string) {
        super('dl', id);
        if (wrapDtDdGroupsInDiv === true)
            this.div = new TagBuilder<HTMLDivElement>('div').classes(...groupsDivClasses);
    }

    addTerm(term: html, ...dd: (html | TagBuilder<HTMLElement>)[]) {
        Objects.requireNonNull(term, 'term in DLBuilder');

        const dt = new TagBuilder('dt').innerHTML(term);
        const dds = dd.map(e => {
            if (e instanceof TagBuilder) {
                if (e.tagName === 'DD') return e;
                else return new TagBuilder('dd').append(e);
            }
            else return new TagBuilder('dd').innerHTML(e);
        });

        if (this.div !== null) this.append(this.div.clone().append(dt, ...dds));
        else this.append(dt, ...dds);

        return this;
    }

    clone() {
        const builder = new DLBuilder(false);
        builder.div = this.div;
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as HTMLDListElement;

        return builder;
    }

}