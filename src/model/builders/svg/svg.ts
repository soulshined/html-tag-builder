/// <reference path="../abstract-builder.ts" />

class SVGBuilder extends AbstractTagBuilder<SVGElement> {
    constructor(viewBox?: string, id?: string, xmlns = 'http://www.w3.org/2000/svg') {
        super('svg', id, xmlns);
        if (Objects.isEmptyOrWhitespace(xmlns))
            Objects.requireNonNull(null, 'xmlns');

        if (!Objects.isEmptyOrWhitespace(viewBox))
            this.attr('viewBox', viewBox);
    }

    public bounds(width: string | number, height: string | number): SVGBuilder {
        this.width(width);
        this.height(height);
        return this;
    }

    public height(height: string | number): SVGBuilder {
        this.attr('height', height);
        return this;
    }

    public width(width: string | number): SVGBuilder {
        this.attr('width', width);
        return this;
    }

    public clone(): SVGBuilder {
        const builder = new SVGBuilder();
        builder.isCached = this.isCached;
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as SVGElement;
        return builder;
    }
}