const svgUri = 'http://www.w3.org/2000/svg';

describe('SVG Builder', function () {

    it('should build', function () {
        const svg = document.createElementNS(svgUri, 'svg');
        new BuilderTest(new SVGBuilder()).toEqualNode(svg);
    })

    it('should build using all methods', function () {
        const svg = document.createElementNS(svgUri, 'svg');
        svg.setAttribute('viewBox', '0 0 500 500');
        svg.setAttribute('width', 50);
        svg.setAttribute('height', 50);

        new BuilderTest(
            new SVGBuilder('0 0 500 500')
                .bounds(50, 50)
        ).toEqualNode(svg);
    })

    it('should clone', function () {
        const aBuilder = new SVGBuilder('0 0 500 500')
            .width(50).height(50);
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.height(200);
        console.log('A Node', aBuilder.build().outerHTML);
        console.log('B Node', bBuilder.build().outerHTML);
        console.log('C Node', cBuilder.build().outerHTML);
        expect(aBuilder.build()).toEqual(bBuilder.build());
        expect(cBuilder.build()).not.toEqual(bBuilder.build());
    })

})

function getElementTemplate(shape) {
    const element = document.createElementNS(svgUri, shape);

    return element;
}


describe('SVG Element Builder', function () {

    it('should build', function () {
        const element = getElementTemplate('rect');
        new BuilderTest(new SVGElementBuilder('rect')).toEqualNode(element);
    })

    it('should build using all methods', function () {
        const element = getElementTemplate('rect');
        element.setAttribute('fill', 'black');
        element.setAttribute('stroke-width', '2');
        element.setAttribute('stroke', 'black');
        element.setAttribute('width', '50');
        element.setAttribute('height', '50');
        element.setAttribute('x', '500');
        element.setAttribute('y', '500');
        element.setAttribute('viewBox', '0 0 500 500');

        new BuilderTest(
            new SVGElementBuilder('rect')
                .fill('black')
                .stroke('black', 2)
                .width(50)
                .height(50)
                .x(500)
                .y(500)
                .viewBox('0 0 500 500')
        ).toEqualNode(element);
    })

    it('should clone', function () {
        const aBuilder = new SVGElementBuilder('rect')
            .width(50).height(50).x(25).y(25);
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.height(200);
        console.log('A Node', aBuilder.build().outerHTML);
        console.log('B Node', bBuilder.build().outerHTML);
        console.log('C Node', cBuilder.build().outerHTML);
        expect(aBuilder.build()).toEqual(bBuilder.build());
        expect(cBuilder.build()).not.toEqual(bBuilder.build());
    })
})