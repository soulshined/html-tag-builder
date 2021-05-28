class ProgressBuilder extends TagBuilder<HTMLProgressElement> {

    constructor(value: number, id?: string) {
        super('progress', id);
        value = Objects.requireNonNull(value, 'value');
        if (this.isHeadlessMode) this.attr('value', value);
        else this.node.value = value;
    }

    max(value: number) {
        if (this.isHeadlessMode) this.attr('max', value);
        else this.node.max = value;
        return this;
    }
}