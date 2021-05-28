class TextInputBuilder extends InputBuilder {

    constructor(id?: string) {
        super('text', id);
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

    pattern(value: RegExp | string) {
        const pattern = value instanceof RegExp ? value.source : new RegExp(value).source;
        if (this.isHeadlessMode) this.attr('pattern', pattern);
        else this.node.pattern = pattern;

        return this;
    }

    size(value: number) {
        if (this.isHeadlessMode) this.attr('size', value);
        else this.node.size = value;
        return this;
    }

}

class EmailInputBuilder extends TextInputBuilder {
    constructor(id?: string) {
        super(id);
        if (this.isHeadlessMode) {
            this.attr('type', 'email');
            this.attr('multiple', false);
        }
        else {
            this.node.type = 'email';
            this.node.multiple = false;
        }
    }

    multiple() {
        if (this.isHeadlessMode) this.attr('multiple', true);
        else this.node.multiple = true;
        return this;
    }
}

class PasswordInputBuilder extends TextInputBuilder {
    constructor(id?: string) {
        super(id);
        if (this.isHeadlessMode) this.attr('type', 'password');
        else this.node.type = 'password';
    }
}

class SearchInputBuilder extends TextInputBuilder {
    constructor(id?: string) {
        super(id);
        if (this.isHeadlessMode) this.attr('type', 'search');
        else this.node.type = 'search';
    }
}

class TelInputBuilder extends TextInputBuilder {
    constructor(id?: string) {
        super(id);
        if (this.isHeadlessMode) this.attr('type', 'tel');
        else this.node.type = 'tel';
    }
}

class UrlInputBuilder extends TextInputBuilder {
    constructor(id?: string) {
        super(id);
        if (this.isHeadlessMode) this.attr('type', 'url');
        else this.node.type = 'url';
    }
}