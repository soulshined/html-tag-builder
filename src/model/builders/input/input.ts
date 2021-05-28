/// <reference path="../tag.ts" />

class InputBuilder extends TagBuilder<HTMLInputElement> {

    constructor(type?: string, id?: string) {
        super('input', id);
        if (this.isHeadlessMode) {
            this.attr('spellcheck', false);
            this.attr('checked', false);
            this.attr('required', false);
            this.attr('type', type ?? TagBuilderOptions.defaultInputType);
        }
        else {
            this.node.spellcheck = false;
            this.node.checked = false;
            this.node.required = false;
            this.node.type = type ?? TagBuilderOptions.defaultInputType;
        }
    }

    autocomplete(value: string) {
        if (this.isHeadlessMode) this.attr('autocomplete', value);
        else this.node.autocomplete = value;
        return this;
    }

    autofocus() {
        if (this.isHeadlessMode) this.attr('autofocus', true);
        else this.node.autofocus = true;
        return this;
    }

    datalist(id: string) {
        this.attr('list', Objects.requireNonNull(id, 'id'));
        return this;
    }

    disabled() {
        if (this.isHeadlessMode) this.attr('disabled', true);
        else this.node.disabled = true;
        return this;
    }

    name(value: string) {
        if (this.isHeadlessMode) this.attr('name', value);
        else this.node.name = value;
        return this;
    }

    onInvalid(value: string) {
        if (this.isHeadlessMode) this.attr('oninvalid', `this.setCustomValidity('${value}');`);
        else this.node.setCustomValidity(value);
        return this;
    }

    placeholder(value: string) {
        if (this.isHeadlessMode) this.attr('placeholder', value);
        else this.node.placeholder = value;
        return this;
    }

    readOnly() {
        if (this.isHeadlessMode) this.attr('readonly', true);
        else this.node.readOnly = true;
        return this;
    }

    required() {
        if (this.isHeadlessMode) this.attr('required', true);
        else this.node.required = true;
        return this;
    }

    value(value: string) {
        if (this.isHeadlessMode) this.attr('value', value);
        else this.node.value = value;
        return this;
    }

}
