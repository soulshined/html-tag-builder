class DataBuilder extends TagBuilder<HTMLDataElement> {
    constructor(value: string, id?: string) {
        super('data', id);
        if (this.isHeadlessMode) this.attr('value', value);
        else this.node.value = value;
    }
}