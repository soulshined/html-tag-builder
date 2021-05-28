/// <reference path="input.ts" />

class CheckboxInputBuilder extends InputBuilder {

    constructor(isIndeterminate: boolean = false, id?: string) {
        super("checkbox", id)
        if (!this.isHeadlessMode)
            this.node.indeterminate = isIndeterminate;
    }

    checked() {
        if (this.isHeadlessMode) this.attr('checked', true);
        else this.node.checked = true;
        return this;
    }

}


class RadioInputBuilder extends InputBuilder {

    constructor(checked?: boolean, id?: string) {
        super('radio', id);
        checked = Objects.ofNullable(checked, false);
        if (this.isHeadlessMode) this.attr('checked', checked);
        else this.node.checked = checked;
    }

}