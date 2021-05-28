describe('Select Builder', function () {

    it('should build', function () {
        const select = createDocElement('select');
        const instruction = createDocElement('option', { innerHTML: '----Please select an option----', value: '' });
        select.append(instruction);
        select.spellcheck = false;
        select.required = false;
        instruction.disabled = true;
        new BuilderTest(new SelectBuilder("----Please select an option----")).toBe(select);
    })

    it('should build using all methods', function () {
        const select = createDocElement('select');
        const optGroup = createDocElement('optgroup');
        optGroup.label = 'USA';
        const optGroup2 = optGroup.cloneNode(true);
        optGroup2.label = 'Canada';
        optGroup.append(createDocElement('option', { innerHTML: 'Montana', value: 'montana' }), createDocElement('option', { innerHTML: 'Arizona', value: 'arizona' }));
        optGroup2.append(createDocElement('option', { innerHTML: 'Toronto', value: 'toronto' }));
        select.spellcheck = false;
        select.autocomplete = 'country';
        select.autofocus = true;
        select.disabled = true;
        select.multiple = true;
        select.name = 'myselect';
        select.required = true;
        select.size = 10;

        const mexico = createDocElement('option', { innerHTML: 'Mexico', value: 'mexico' });
        mexico.classList.add('bolder');

        select.append(optGroup, optGroup2, mexico, createDocElement('option', { innerHTML: 'abc', value: 'abc' }), createDocElement('option', { innerHTML: '123', value: '123' }), createDocElement('option', { innerHTML: 'bubble     butt!', value: 'bubble-butt!' }));

        new BuilderTest(new SelectBuilder()
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
        ).toEqualNode(select);
    })

})