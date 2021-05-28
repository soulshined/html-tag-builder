class AnchorBuilder extends TagBuilder<HTMLAnchorElement> {

    constructor(href: string, target: '_self' | '_blank' | '_parent' | '_top' = '_self', id?: string) {
        super('a', id);
        href = Objects.requireNonNull(href, 'href');
        target = Objects.requireNonNull(target, 'target')
        if (this.isHeadlessMode) {
            this.attr('href', href);
            this.attr('target', target);
        }
        else {
            this.node.href = href;
            this.node.target = target;
        }
    }

    hreflang(lang: string) {
        if (this.isHeadlessMode) this.attr('hreflang', lang);
        else this.node.hreflang = lang;
        return this;
    }

    mimeType(value: string) {
        if (this.isHeadlessMode) this.attr('type', value);
        else this.node.type = value;
        return this;
    }

    ping(urls: string[]) {
        if (this.isHeadlessMode) this.attr('ping', urls.join(" "))
        else this.node.ping = urls.join(" ");
        return this;
    }

    rel(value: string) {
        if (this.isHeadlessMode) this.attr('rel', value);
        else this.node.rel = value;
        return this;
    }

}

class DownloadLinkBuilder extends AnchorBuilder {

    constructor(href: string, filename: string, id?: string) {
        super(href, '_self', id);
        filename = Objects.requireNonNull(filename, 'filename in DownloadLinkBuilder');
        if (this.isHeadlessMode) this.attr('download', filename);
        else this.node.download = filename;
    }

}