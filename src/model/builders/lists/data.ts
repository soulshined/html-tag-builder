class DataListBuilder extends TagBuilder<HTMLDataListElement> {

    constructor(id: string) {
        super('datalist', id);
        Objects.requireNonNull(id, 'id in DatalistBuilder');
    }

    addOption(content: html, value: string, classes: classes = []) {
        Objects.requireNonNull(content, 'content in DatalistBuilder');
        this.addOptions(new OptionBuilder(content, value).classes(...classes));
        return this;
    }

    addOptions(...option: (html | OptionBuilder)[]) {
        option.forEach(e => {
            if (e instanceof OptionBuilder)
                this.append(e);
            else this.append(new OptionBuilder(e));
        });
        return this;
    }

}