class FormBuilder extends TagBuilder<HTMLFormElement> {

    constructor(actionUrl: string, method: string = 'get', id?: string) {
        super('form', id);

        method = Objects.ofNullable(method, 'get');
        actionUrl = Objects.requireNonNull(actionUrl, 'actionUrl of FormBuilder');
        if (this.isHeadlessMode) {
            this.attr('method', method);
            this.attr('action', actionUrl);
        }
        else {
            this.node.method = method;
            this.node.action = actionUrl;
        }
    }

    acceptCharset(...value: string[]) {
        if (this.isHeadlessMode) this.attr('acceptcharset', value.join(" "));
        else this.node.acceptCharset = value.join(" ");
        return this;
    }

    enctype(value: formEnctype) {
        value = Objects.ofNullable(value, 'application/x-www-form-urlencoded');
        if (this.isHeadlessMode) this.attr('enctype', value);
        else this.node.enctype = value;
        return this;
    }

    rel(value: string) {
        this.attr('rel', value);
        return this;
    }

    target(value: '_self' | '_blank' | '_parent' | '_top') {
        if (this.isHeadlessMode) this.attr('target', value);
        else this.node.target = value;
        return this;
    }

    noValidate() {
        if (this.isHeadlessMode) this.attr('novalidate', true);
        else this.node.noValidate = true;
        return this;
    }

}