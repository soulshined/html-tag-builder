class SVGElementBuilder<T extends SVGElement> extends AbstractTagBuilder<T> {
    constructor(element: string, xmlns = 'http://www.w3.org/2000/svg', id?: string) {
        super(element, id, xmlns);

        if (Objects.isEmptyOrWhitespace(xmlns))
            Objects.requireNonNull(null, 'xmlns');
    }

    fill(value: string) {
        this.attr('fill', value);
        return this;
    }

    stroke(stroke: string, width: string | number) {
        this.attr('stroke', stroke);
        this.attr('stroke-width', width);
        return this;
    }

    width(width: string | number) {
        this.attr('width', width);
        return this;
    }

    height(height: string | number) {
        this.attr('height', height);
        return this;
    }

    bounds(width: string | number, height: string | number) {
        this.width(width);
        this.height(height);
        return this;
    }

    preserveAspectRatio(value: string) {
        this.attr('preserveAspectRatio', value);
        return this;
    }

    x(value: string | number) {
        this.attr('x', value);
        return this;
    }

    y(value: string | number) {
        this.attr('y', value);
        return this;
    }

    viewBox(viewBox: string) {
        this.attr('viewBox', viewBox);
        return this;
    }

    public clone(): SVGElementBuilder<T> {
        const builder = new SVGElementBuilder(this.tagName);
        builder.isCached = this.isCached;
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as T;
        return builder as SVGElementBuilder<T>;
    }
}