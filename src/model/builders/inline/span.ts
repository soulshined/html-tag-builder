class SpanBuilder extends TagBuilder<HTMLSpanElement> {

    constructor(style?: ('bold' | 'bolder' | 'lighter' |  'italic' | 'underline' | 'strikethrough')[],id?: string) {
        super('span', id);
        if (Objects.isDefined(style)) {
            style.sort();
            style.forEach(style => {
                if (style === 'bold') this.bold();
                else if (style === 'bolder') this.bolder();
                else if (style === 'lighter') this.lighter();
                else if (style === 'italic') this.italic();
                else if (style === 'underline') this.underline();
                else if (style === 'strikethrough') this.strikethrough();
            })
        }
    }

    bold() {
        this.style({ 'font-weight': 'bold' });
        return this;
    }

    bolder() {
        this.style({ 'font-weight': 'bolder' });
        return this;
    }

    italic() {
        this.style({ 'font-style': 'italic' });
        return this;
    }

    lighter() {
        this.style({ 'font-weight': 'lighter' });
        return this;
    }

    underline() {
        this.style({ 'text-decoration': 'underline' });
        return this;
    }

    strikethrough() {
        this.style({ 'text-decoration': 'strikethrough' });
        return this;
    }

    color(value: string) {
        this.style({ 'color': value });
        return this;
    }

}