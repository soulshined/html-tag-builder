describe('Details Builder', function () {

    it('should clone', function () {
        const aBuilder = new DLBuilder(true)
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.addTerm('abc', '123');
        console.log('A Node', aBuilder.build().outerHTML);
        console.log('B Node', bBuilder.build().outerHTML);
        console.log('C Node', cBuilder.build().outerHTML);
        expect(aBuilder.build()).toEqual(bBuilder.build());
        expect(cBuilder.build()).not.toEqual(bBuilder.build());
        expect(cBuilder.build().outerHTML).toContain('<div draggable="false">')
    })

    it('should build', function () {
        const dl = createDocElement('dl');
        new BuilderTest(new DLBuilder()).toEqualNode(dl);
    })

    it('should build using all methods', function () {
        const dl = createDocElement('dl');
        dl.append(
            createDocElement('dt', { innerHTML: 'Firefox' }),
            createDocElement('dd', { innerHTML: 'A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.' }),
            createDocElement('dt', { innerHTML: 'ftHTML' }),
            createDocElement('dd', { innerHTML: 'HTML but better' }),
            createDocElement('dd', { innerHTML: 'HTML preprocessor with basic templating, variables, functions and more!' })
        )

        new BuilderTest(new DLBuilder()
            .addTerm('Firefox', `A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.`)
            .addTerm('ftHTML', 'HTML but better', new TagBuilder('dd').innerHTML('HTML preprocessor with basic templating, variables, functions and more!'))).toEqualNode(dl);
    })

    it('should build with dt/dd groups wrapped in divs', function() {
        const dl = createDocElement('dl');
        const div = createDocElement('div');
        div.classList.add('programming');
        div.classList.add('bold');

        const aDiv = div.cloneNode(true);
        aDiv.append(
            createDocElement('dt', { innerHTML: 'Firefox' }),
            createDocElement('dd', { innerHTML: 'A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.' })
        )
        const bDiv = div.cloneNode(true);
        bDiv.append(createDocElement('dt', { innerHTML: 'ftHTML' }),
            createDocElement('dd', { innerHTML: 'HTML but better' }),
            createDocElement('dd', { innerHTML: '<def draggable="false">HTML preprocessor with basic templating, variables, functions and more!</def>' }));
        dl.append(aDiv, bDiv);

        new BuilderTest(new DLBuilder(true, ['programming', 'bold'])
            .addTerm('Firefox', `A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.`)
            .addTerm('ftHTML', 'HTML but better', new TagBuilder('def').innerHTML('HTML preprocessor with basic templating, variables, functions and more!'))).toEqualNode(dl);
    })
})