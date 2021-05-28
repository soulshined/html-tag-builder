class TextAreaBuilder extends TagBuilder<HTMLTextAreaElement> {

    constructor(rows?: number, cols?: number, id?: string) {
        super('textarea', id);

        if (this.isHeadlessMode) {
            this.attr('spellcheck', false);
            this.attr('required', false);

            if (Objects.isDefined(rows)) this.attr('rows', rows);
            if (Objects.isDefined(cols)) this.attr('cols', cols);
        }
        else {
            this.node.spellcheck = false;
            this.node.required = false;

            if (Objects.isDefined(rows)) this.node.rows = rows;
            if (Objects.isDefined(cols)) this.node.cols = cols;
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

    disabled() {
        if (this.isHeadlessMode) this.attr('disabled', true);
        else this.node.disabled = true;
        return this;
    }

    maxLength(value: number) {
        if (this.isHeadlessMode) this.attr('maxlength', value);
        else this.node.maxLength = value;
        return this;
    }

    minLength(value: number) {
        if (this.isHeadlessMode) this.attr('minlength', value);
        else this.node.minLength = value;
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

    wrap(value: 'hard' | 'soft') {
        if (this.isHeadlessMode) this.attr('wrap', value);
        else this.node.wrap = value;
        return this;
    }

}