describe('Headless Select Builder', function () {

    it('should build', function () {
        const select = createHDocElement('select', {
            attrs: new Map([
                ['spellcheck', false],
                ['required', false]
            ]),
            innerHTML: createHDocElement('option', { innerHTML: '----Please select an option----', value: '', attrs: new Map([['value', ''], ['disabled', '']]) })
        });
        new HeadlessTest(new SelectBuilder("----Please select an option----")).toBe(select);
    })

    it('should build using all methods', function () {
        const select = createHDocElement('select', {
            attrs: new Map([
                ['spellcheck', false],
                ['required', true],
                ['autocomplete', 'country'],
                ['autofocus', true],
                ['disabled', true],
                ['multiple', true],
                ['name', 'myselect'],
                ['oninvalid', "this.setCustomValidity('Selection must be a valid country');"],
                ['size', 10]
            ]),
            innerHTML: createHDocElement('optgroup', {
                attrs: new Map([
                    ['label', 'USA']
                ]),
                innerHTML: createHDocElement('option', { innerHTML: 'Montana', value: 'montana' }) +
                    createHDocElement('option', { innerHTML: 'Arizona', value: 'arizona' })
            }) +
                createHDocElement('optgroup', {
                    attrs: new Map([
                        ['label', 'Canada']
                    ]),
                    innerHTML: createHDocElement('option', { innerHTML: 'Toronto', value: 'toronto' })
                }) +
                createHDocElement('option', {
                    attrs: new Map([
                        ['class', 'bolder']
                    ]),
                    innerHTML: 'Mexico', value: 'mexico',
                }) +
                createHDocElement('option', { innerHTML: 'abc', value: 'abc' }) +
                createHDocElement('option', { innerHTML: '123', value: '123' }) +
                createHDocElement('option', { innerHTML: 'bubble     butt!', value: 'bubble-butt!' })
        });

        new HeadlessTest(new SelectBuilder()
            .addOptionGroup("USA",
                new OptionBuilder("Montana"),
                new OptionBuilder("Arizona")
            )
            .addOptionGroup("Canada",
                new OptionBuilder("Toronto")
            )
            .addOption("Mexico", "mexico", ['bolder'])
            .autocomplete('country')
            .autofocus()
            .disabled()
            .multiple()
            .name("myselect")
            .onInvalid("Selection must be a valid country")
            .required()
            .size(10)
            .addOptions(['abc', '123', new OptionBuilder('bubble     butt!', 'bubble-butt!')])
        ).toBe(select);
    })

})