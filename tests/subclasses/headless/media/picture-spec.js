const src = 'myimage.png';
const alt = 'my image picture';

describe('Headless Picture Builder', function () {

    it('should clone', function () {
        const aBuilder =
            new PictureBuilder(new ImageBuilder(src, alt));
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.hidden();
        console.log('A Node', aBuilder.buildHTML());
        console.log('B Node', bBuilder.buildHTML());
        console.log('C Node', cBuilder.buildHTML());
        expect(aBuilder.buildHTML()).toEqual(bBuilder.buildHTML());
        expect(cBuilder.buildHTML()).not.toEqual(bBuilder.buildHTML());
    })

    it('should build', function () {
        const picture = createHDocElement('picture', {
            innerHTML: createHDocElement('img', {
                attrs: new Map([
                    ['src', src],
                    ['alt', alt],
                    ['title', alt]
                ])
            })
        });
        new HeadlessTest(new PictureBuilder(new ImageBuilder(src, alt))).toBe(picture);
    })

    it('should build using all methods', function () {
        const picture = createHDocElement('picture', {
            innerHTML: createHDocElement('source', {
                attrs: new Map([
                    ['src', 'mysource2.png'],
                    ['type', 'image/png']
                ])
            }) +
                createHDocElement('source', {
                    attrs: new Map([
                        ['src', 'mysource3.png'],
                        ['type', 'image/png']
                    ])
                }) +
                createHDocElement('img', {
                    attrs: new Map([
                        ['src', src],
                        ['alt', alt],
                        ['title', alt]
                    ])
                })
        });

        new HeadlessTest(
            new PictureBuilder(new ImageBuilder(src, alt))
                .source(new SourceBuilder('mysource2.png', 'image/png'))
                .source(new SourceBuilder('mysource3.png', 'image/png'))
        ).toBe(picture);
    })

})