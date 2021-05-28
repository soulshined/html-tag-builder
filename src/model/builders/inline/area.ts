class AreaBuilder extends TagBuilder<HTMLAreaElement> {

    constructor(coords: string, shape: 'rect' | 'circle' | 'poly' | 'default' = 'default', id?: string) {
        super('area', id);
        coords = Objects.requireNonNull(coords, 'coords');
        if (this.isHeadlessMode) {
            this.attr('coords', coords);
            if (Objects.isDefined(shape)) this.attr('shape', shape);
        }
        else {
            this.node.coords = coords;
            if (Objects.isDefined(shape)) this.node.shape = shape;
        }
    }

    href(url: string, alt: string) {
        url = Objects.requireNonNull(url, 'href');
        alt = Objects.requireNonNull(alt, 'alt');
        if (this.isHeadlessMode) {
            this.attr('href', url);
            this.attr('alt', alt);
        }
        else {
            this.node.href = url;
            this.node.alt = alt;
        }
        return this;
    }

    hreflang(lang: string) {
        this.attr('hreflang', lang);
        return this;
    }

    ping(urls: string[]) {
        if (this.isHeadlessMode) this.attr('ping', urls.join(" "));
        else this.node.ping = urls.join(" ");
        return this;
    }

    rel(value: string) {
        if (this.isHeadlessMode) this.attr('rel', value);
        else this.node.rel = value;
        return this;
    }

    target(value: '_self' | '_blank' | '_parent' | '_top') {
        if (this.isHeadlessMode) this.attr('target', value);
        else this.node.target = value;
        return this;
    }

}

class DownloadAreaBuilder extends AreaBuilder {
    constructor(filename: string, coords: string, shape: 'rect' | 'circle' | 'poly' | 'default' = 'default', id?: string) {
        super(coords, shape, id);
        filename = Objects.requireNonNull(filename, 'filename in DownloadAreaBuilder');
        if (this.isHeadlessMode) this.attr('download', filename);
        else this.node.download = filename;
    }
}