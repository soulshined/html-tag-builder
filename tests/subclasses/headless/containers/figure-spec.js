describe('Headless Figure Builder', function () {

    it('should clone', function () {
        const aBuilder = new FigureBuilder();
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.hidden();
        console.log('A Node', aBuilder.buildHTML());
        console.log('B Node', bBuilder.buildHTML());
        console.log('C Node', cBuilder.buildHTML());
        expect(aBuilder.buildHTML()).toEqual(bBuilder.buildHTML());
        expect(cBuilder.buildHTML()).not.toEqual(bBuilder.buildHTML());
    })

    it('should build with caption on bottom', function () {
        const figure = createHDocElement('figure', {
            innerHTML: createHDocElement('img', {
                attrs: new Map([
                    ['src', 'example.png'],
                    ['alt', 'my picture'],
                    ['title', 'my picture']
                ])
            }) + createHDocElement('figcaption', { innerHTML: 'Chuck Norris would be impressed' })
        });

        new HeadlessTest(new FigureBuilder('Chuck Norris would be impressed').append(new ImageBuilder('example.png', 'my picture'))).toBe(figure);
    })

    it('should build with caption on top', function () {
        const figure = createHDocElement('figure', {
            innerHTML: createHDocElement('figcaption', { innerHTML: 'Chuck Norris would be impressed' }) +
                createHDocElement('img', {
                    attrs: new Map([
                        ['src', 'example.png'],
                        ['alt', 'my picture'],
                        ['title', 'my picture']
                    ])
                })
        });
        new HeadlessTest(new FigureBuilder('Chuck Norris would be impressed', 'top')
            .append(new ImageBuilder('example.png', 'my picture'))).toBe(figure);
    })
})