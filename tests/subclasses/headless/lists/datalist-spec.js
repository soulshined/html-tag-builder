describe('Headless Datalist Builder', function () {

    it('should build', function () {
        const datalist = createHDocElement('datalist', { id: 'myid' });
        new HeadlessTest(new DataListBuilder('myid')).toBe(datalist);
    })

    it('should build using all methods', function () {
        const datalist = createHDocElement('datalist', {
            id: 'myid',
            innerHTML:
                createHDocElement('option', { innerHTML: 'abc', value: 'abc' }) +
                createHDocElement('option', { innerHTML: '123', value: '123' }) +
                createHDocElement('option', { innerHTML: 'foobar doobar toobar', value: 'foobar-doobar-toobar' }) +
                createHDocElement('option', {
                    innerHTML: 'abc', value: 'abc',
                    attrs: new Map([
                        ['class', 'someclass']
                    ])
                })
        });

        new HeadlessTest(new DataListBuilder('myid')
            .addOption('abc')
            .addOptions(
                new OptionBuilder('123'),
                'foobar doobar toobar',
                new OptionBuilder('abc').classes('someclass')
            )
        ).toBe(datalist);
    })

})