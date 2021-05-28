describe('Headless DL Builder', function () {

    it('should clone', function () {
        const aBuilder = new DLBuilder(true)
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.addTerm('abc', '123');
        console.log('A Node', aBuilder.buildHTML());
        console.log('B Node', bBuilder.buildHTML());
        console.log('C Node', cBuilder.buildHTML());
        expect(aBuilder.buildHTML()).toEqual(bBuilder.buildHTML());
        expect(cBuilder.buildHTML()).not.toEqual(bBuilder.buildHTML());
        expect(cBuilder.buildHTML()).toContain('<div draggable="false">')
    })

    it('should build', function () {
        const dl = createHDocElement('dl');
        new HeadlessTest(new DLBuilder()).toBe(dl);
    })

    it('should build using all methods', function () {
        const dl = createHDocElement('dl', {
            innerHTML: createHDocElement('dt', { innerHTML: 'Firefox' }) +
                createHDocElement('dd', { innerHTML: 'A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.' }) +
                createHDocElement('dt', { innerHTML: 'ftHTML' }) +
                createHDocElement('dd', { innerHTML: 'HTML but better' }) +
                createHDocElement('dd', { innerHTML: 'HTML preprocessor with basic templating, variables, functions and more!' })
        });

        new HeadlessTest(new DLBuilder()
            .addTerm('Firefox', `A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.`)
            .addTerm('ftHTML', 'HTML but better', new TagBuilder('dd').innerHTML('HTML preprocessor with basic templating, variables, functions and more!'))).toBe(dl);
    })

    it('should build with dt/dd groups wrapped in divs', function () {
        const dl = createHDocElement('dl', {
            innerHTML: createHDocElement('div', {
                attrs: new Map([
                    ['class', 'programming bold']
                ]),
                innerHTML: createHDocElement('dt', { innerHTML: 'Firefox' }) +
                    createHDocElement('dd', { innerHTML: 'A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.' })
            }) +
                createHDocElement('div', {
                    attrs: new Map([
                        ['class', 'programming bold']
                    ]),
                    innerHTML: createHDocElement('dt', { innerHTML: 'ftHTML' }) +
                        createHDocElement('dd', { innerHTML: 'HTML but better' }) +
                        createHDocElement('dd', { innerHTML: '<def draggable="false">HTML preprocessor with basic templating, variables, functions and more!</def>' })
                })
        })

        new HeadlessTest(new DLBuilder(true, ['programming', 'bold'])
            .addTerm('Firefox', `A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.`)
            .addTerm('ftHTML', 'HTML but better', new TagBuilder('def').innerHTML('HTML preprocessor with basic templating, variables, functions and more!'))).toBe(dl);
    })
})