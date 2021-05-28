class ImageInputBuilder extends InputBuilder {

    constructor(src: string, alt: string, id?: string) {
        super('image', id);
        src = Objects.requireNonNull(src, 'src');
        alt = Objects.requireNonNull(alt, 'alt');

        if (this.isHeadlessMode) {
            this.attr('src', src);
            this.attr('alt', alt);
        }
        else {
            this.node.src = src;
            this.node.alt = alt;
        }
    }

    formAction(url: string) {
        if (this.isHeadlessMode) this.attr('formaction', url);
        else this.node.formAction = url;
        return this;
    }

    formEnctype(enctype: formEnctype) {
        enctype = Objects.ofNullable(enctype, 'application/x-www-form-urlencoded');
        if (this.isHeadlessMode) this.attr('formenctype', enctype);
        else this.node.formEnctype = enctype;
        return this;
    }

    formMethod(method: 'get' | 'post' | 'dialog') {
        if (this.isHeadlessMode) this.attr('formmethod', method);
        else this.node.formMethod = method;
        return this;
    }

}