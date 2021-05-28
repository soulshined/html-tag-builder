class IframeBuilder extends TagBuilder<HTMLIFrameElement> {

    constructor(src: string, id?: string) {
        super('iframe', id);
        src = Objects.requireNonNull(src, 'src');
        if (this.isHeadlessMode) this.attr('src', src);
        else this.node.src = src;
    }

    allow(value: string) {
        if (this.isHeadlessMode) this.attr('allow', value);
        else this.node.allow = value;
        return this;
    }

    referrerPolicy(value: referrerPolicy = 'no-referrer-when-downgrade') {
        value = Objects.ofNullable(value, 'no-referrer-when-downgrade');
        if (this.isHeadlessMode) this.attr('referrerpolicy', value);
        else this.node.referrerPolicy = value;
        return this;
    }

    sandbox(value: 'allow-downloads' | 'allow-forms' | 'allow-modals' | 'allow-orientation-lock' | 'allow-pointer-lock' | 'allow-popups' | 'allow-popups-to-escape-sandbox' | 'allow-presentation' | 'allow-same-origin' | 'allow-scripts' | 'allow-top-navigation' | 'allow-top-navigation-by-user-activation' | string = '') {
        this.attr('sandbox', value);
        return this;
    }

    srcdoc(value: html) {
        if (this.isHeadlessMode) this.attr('srcdoc', value);
        else this.node.srcdoc = value;
        return this;
    }

}