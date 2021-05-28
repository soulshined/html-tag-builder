const src = 'myimage.png';
const alt = 'my image picture';

describe('Picture Builder', function () {

    it('should clone', function () {
        const aBuilder =
            new PictureBuilder(new ImageBuilder(src, alt));
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.hidden();
        console.log('A Node', aBuilder.build().outerHTML);
        console.log('B Node', bBuilder.build().outerHTML);
        console.log('C Node', cBuilder.build().outerHTML);
        expect(aBuilder.build()).toEqual(bBuilder.build());
        expect(cBuilder.build()).not.toEqual(bBuilder.build());
    })

    it('should build', function () {
        const picture = createDocElement('picture');
        const img = createDocElement('img');
        img.src = 'myimage.png';
        img.alt = 'my image picture';
        img.title = img.alt;
        picture.appendChild(img);
        new BuilderTest(new PictureBuilder(new ImageBuilder('myimage.png', 'my image picture'))).toEqualNode(picture);
    })

    it('should build using all methods', function () {
        const picture = createDocElement('picture');
        const img = createDocElement('img');
        img.src = src;
        img.alt = alt;
        img.title = alt;

        const source = createDocElement('source');
        source.type = 'image/png';
        const source2 = source.cloneNode();
        source.src = 'mysource2.png';
        source2.src = 'mysource3.png';
        picture.append(source, source2, img);

        new BuilderTest(
            new PictureBuilder(new ImageBuilder(src, alt))
                .source(new SourceBuilder('mysource2.png', 'image/png'))
                .source(new SourceBuilder('mysource3.png', 'image/png'))
        ).toEqualNode(picture);
    })


})