describe('Figure Builder', function () {

    it('should clone', function () {
        const aBuilder = new FigureBuilder();
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.hidden();
        console.log('A Node', aBuilder.build().outerHTML);
        console.log('B Node', bBuilder.build().outerHTML);
        console.log('C Node', cBuilder.build().outerHTML);
        expect(aBuilder.build()).toEqual(bBuilder.build());
        expect(cBuilder.build()).not.toEqual(bBuilder.build());
    })

    it('should build with caption on bottom', function () {
        const figure = createDocElement('figure');
        const capt = createDocElement('figcaption');
        capt.innerHTML = 'Chuck Norris would be impressed';

        const img = createDocElement('img');
        img.src = "example.png";
        img.alt = "my picture";
        img.title = "my picture";

        figure.append(img, capt);
        new BuilderTest(new FigureBuilder('Chuck Norris would be impressed').append(new ImageBuilder('example.png', 'my picture').title("my picture"))).toEqualNode(figure);
    })

    it('should build with caption on top', function () {
        const figure = createDocElement('figure');
        const capt = createDocElement('figcaption');
        capt.innerHTML = 'Chuck Norris would be impressed';
        const img = createDocElement('img');
        img.src = "example.png";
        img.alt = "my picture";
        img.title = "my picture";

        figure.append(capt, img);

        new BuilderTest(new FigureBuilder('Chuck Norris would be impressed', 'top')
        .append(new ImageBuilder('example.png', 'my picture').title('my picture'))).toEqualNode(figure);
    })
})