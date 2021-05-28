class ScriptBuilder extends TagBuilder<HTMLScriptElement> {
    constructor(id?: string) {
        super('script', id);
        if (this.isHeadlessMode) this.attr('async', TagBuilderOptions.scriptAsync);
        else this.node.async = TagBuilderOptions.scriptAsync;
    }

    async() {
        if (this.isHeadlessMode) this.attr('async', true);
        else this.node.async = true;
        return this;
    }

    crossOrigin(value: crossOrigin) {
        value = Objects.ofNullable(value, '');
        if (this.isHeadlessMode) this.attr('crossorigin', value);
        else this.node.crossOrigin = value;
        return this;
    }

    defer() {
        if (this.isHeadlessMode) this.attr('defer', true);
        else this.node.defer = true;
        return this;
    }

    integrity(value: string) {
        if (this.isHeadlessMode) this.attr('integrity', value);
        else this.node.integrity = value;
        return this;
    }

    noModule() {
        if (this.isHeadlessMode) this.attr('nomodule', true);
        else this.node.noModule = true;
        return this;
    }

    nonce(value: string) {
        if (this.isHeadlessMode) this.attr('nonce', value);
        else this.node.nonce = value;
        return this;
    }

    referrerPolicy(value: referrerPolicy) {
        value = Objects.ofNullable(value, '');
        if (this.isHeadlessMode) this.attr('referrerpolicy', value);
        else this.node.referrerPolicy = value;
        return this;
    }

    src(url: string) {
        if (this.isHeadlessMode) this.attr('src', url);
        else this.node.src = url;
        return this;
    }

    type(value: 'module' | string) {
        if (this.isHeadlessMode) this.attr('type', value);
        else this.node.type = value;
        return this;
    }

}