const svgUri = 'http://www.w3.org/2000/svg';

describe('SVG Builder', function () {

    it('should build', function () {
        const svg = document.createElementNS(svgUri, 'svg');
        svg.setAttribute('xmlns', svgUri);
        new HeadlessTest(new SVGBuilder()).toBe(svg.outerHTML);
    })

    it('should build using all methods', function () {
        const svg = document.createElementNS(svgUri, 'svg');
        svg.setAttribute('xmlns', svgUri);
        svg.setAttribute('viewBox', '0 0 500 500');
        svg.setAttribute('width', 50);
        svg.setAttribute('height', 50);

        new HeadlessTest(
            new SVGBuilder('0 0 500 500')
                .bounds(50, 50)
        ).toBe(svg.outerHTML);
    })

    it('should clone', function () {
        const aBuilder = new SVGBuilder('0 0 500 500')
            .width(50).height(50);
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.height(200);
        console.log('A Node', aBuilder.buildHTML());
        console.log('B Node', bBuilder.buildHTML());
        console.log('C Node', cBuilder.buildHTML());
        expect(aBuilder.buildHTML()).toEqual(bBuilder.buildHTML());
        expect(cBuilder.buildHTML()).not.toEqual(bBuilder.buildHTML());
    })

})

function getElementTemplate(shape) {
    const element = document.createElementNS(svgUri, shape);
    element.setAttribute('xmlns', svgUri);
    return element;
}


describe('SVG Element Builder', function () {

    it('should build', function () {
        const element = getElementTemplate('rect');
        new HeadlessTest(new SVGElementBuilder('rect')).toBe(element.outerHTML);
    })

    it('should build using all methods', function () {
        const element = getElementTemplate('rect');
        element.setAttribute('xmlns', svgUri);
        element.setAttribute('fill', 'black');
        element.setAttribute('stroke', 'black');
        element.setAttribute('stroke-width', '2');
        element.setAttribute('width', '50');
        element.setAttribute('height', '50');
        element.setAttribute('x', '500');
        element.setAttribute('y', '500');
        element.setAttribute('viewBox', '0 0 500 500');

        new HeadlessTest(
            new SVGElementBuilder('rect')
                .fill('black')
                .stroke('black', 2)
                .width(50)
                .height(50)
                .x(500)
                .y(500)
                .viewBox('0 0 500 500')
        ).toBe(element.outerHTML);
    })

    it('should clone', function () {
        const aBuilder = new SVGElementBuilder('rect')
            .width(50).height(50).x(25).y(25);
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.height(200);
        console.log('A Node', aBuilder.buildHTML());
        console.log('B Node', bBuilder.buildHTML());
        console.log('C Node', cBuilder.buildHTML());
        expect(aBuilder.buildHTML()).toEqual(bBuilder.buildHTML());
        expect(cBuilder.buildHTML()).not.toEqual(bBuilder.buildHTML());
    })
})