class VideoBuilder extends TagBuilder<HTMLVideoElement> {
    private fallbackHTML: string;

    constructor(src: string, type: string, id?: string) {
        super('video', id);
        src = Objects.requireNonNull(src, 'src');
        this.attr('type', Objects.requireNonNull(type, 'type'));
        if (this.isHeadlessMode) {
            this.attr('src', src);
            this.attr('controls', true);
        }
        else {
            this.node.src = src;
            this.node.controls = true;
        }
    }

    addFallbackSrc(src: string, type: string) {
        this.append(new SourceBuilder(src, type));
        return this;
    }

    loop() {
        if (this.isHeadlessMode) this.attr('loop', true);
        else this.node.loop = true;
        return this;
    }

    muted() {
        if (this.isHeadlessMode) this.attr('muted', true);
        else this.node.muted = true;
        return this;
    }

    noControls() {
        if (this.isHeadlessMode) this.attr('controls', false);
        else this.node.controls = false;
        return this;
    }

    onNotSupported(html: html) {
        this.fallbackHTML = html;
        return this;
    }

    poster(url: string) {
        url = Objects.requireNonNull(url, 'poster');
        if (this.isHeadlessMode) this.attr('poster', url);
        else this.node.poster = url;
        return this;
    }

    preload(value: 'none' | 'metadata' | 'auto') {
        if (this.isHeadlessMode) this.attr('preload', value);
        else this.node.preload = value;
        return this;
    }

    track(src: string, kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata', isDefault: boolean = false, srclang: string = 'en', label?: string) {
        this.append(new TagBuilder('track').attr("kind", kind).attr('srclang', srclang).attr('src', src).attr('label', label).attr('default', isDefault));
        return this;
    }

    clone() {
        const builder = new VideoBuilder(this.node?.src ?? '', this.node?.getAttribute('type') ?? '');
        builder.fallbackHTML = this.fallbackHTML;
        builder.isCached = this.isCached;
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as HTMLVideoElement;

        return builder as VideoBuilder;
    }

    build() {
        if (this.isCached) return this.node;

        this.isCached = true;
        if (Objects.isDefined(this.fallbackHTML))
            this.append(this.fallbackHTML);

        return this.node;
    }

    buildHTML() {
        if (this.isCached) return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;

        this.isCached = true;
        this.append(this.fallbackHTML);
        return this.isHeadlessMode ? this.hNode.build() : this.node.outerHTML;
    }
}