describe('List Builder', function () {

    it('should build ul', function () {
        const ul = createHDocElement('ul', {
            innerHTML: createHDocElement('li') + createHDocElement('li') + createHDocElement('li')
        });
        new HeadlessTest(new ListBuilder().addItems(['', '', null])).toBe(ul);
    })

    it('should build ol', function () {
        const ol = createHDocElement('ol', {
            innerHTML: createHDocElement('li') + createHDocElement('li') + createHDocElement('li')
        });
        new HeadlessTest(new ListBuilder(true)
            .addItem(new ListItemBuilder())
            .addItem(new ListItemBuilder(null))
            .addItem('')).toBe(ol);
    })

    it('should build using all methods', function () {
        const ul = createHDocElement('ul', {
            attrs: new Map([
                ['style', "list-style: square;"]
            ]),
            innerHTML: createHDocElement('li', { innerHTML: 'foobar' }) +
                createHDocElement('li', { innerHTML: 'foobar 2', attrs : new Map([['class', 'bone']]) }) +
                createHDocElement('li', { innerHTML: 'foobar 3 ' }) +
                createHDocElement('li', { innerHTML: 'foobar4' }) +
                createHDocElement('li', {
                    innerHTML: createHDocElement('ul', {
                        attrs: new Map([
                            ['style', "list-style: square;"]
                        ]),
                        innerHTML: createHDocElement('li', { innerHTML: 'foobar' }) +
                            createHDocElement('li', { innerHTML: 'foobar 2', attrs: new Map([['class', 'bone']]) }) +
                            createHDocElement('li', { innerHTML: 'foobar 3 ' }) +
                            createHDocElement('li', { innerHTML: 'foobar4' })
                    })
                })
        });

        new HeadlessTest(
            new ListBuilder(false, 'square')
                .addItem('foobar')
                .addItem(new ListItemBuilder('foobar 2').classes('bone'))
                .addItems(['foobar 3 ', new ListItemBuilder('foobar4')])
                .addSublist(new ListBuilder(false, 'square')
                    .addItem('foobar')
                    .addItem(new ListItemBuilder('foobar 2').classes('bone'))
                    .addItems(['foobar 3 ', new ListItemBuilder('foobar4')]))
        ).toBe(ul);
    })

})