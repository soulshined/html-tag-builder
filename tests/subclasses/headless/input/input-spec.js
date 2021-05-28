describe('Headless Input Builder', function () {

    it('should build', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'text']
            ])
        });
        new HeadlessTest(new InputBuilder()).toBe(input);
    })

    it('should build using all methods', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'email'],
                ['autocomplete', 'on'],
                ['autofocus', true],
                ['disabled', true],
                ['name', 'email'],
                ['oninvalid', "this.setCustomValidity('Chuck Norris is not impressed');"],
                ['placeholder', 'enter email here'],
                ['readonly', true],
                ['required', true]
            ])
        });
        new HeadlessTest(new InputBuilder('email')
            .autocomplete('on')
            .autofocus()
            .disabled()
            .name('email')
            .onInvalid('Chuck Norris is not impressed')
            .placeholder('enter email here')
            .readOnly()
            .required()
        ).toBe(input);
    })

})