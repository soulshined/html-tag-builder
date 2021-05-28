class FileInputBuilder extends InputBuilder {

    constructor(accept?: string, id?: string) {
        super('file', id);
        if (this.isHeadlessMode) {
            this.attr('multiple', false);
            this.attr('accept', Objects.ofNullable(accept, ''));
        }
        else {
            this.node.multiple = false;
            if (Objects.isDefined(accept))
                this.node.accept = accept;
        }
    }

    capture(value: 'user' | 'environment') {
        this.attr('capture', value);
        return this;
    }

    multiple() {
        if (this.isHeadlessMode) this.attr('multiple', true);
        else this.node.multiple = true;
        return this;
    }

}