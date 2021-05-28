describe('Headless Checkbox Input Builder', function () {
    it('should build', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'checkbox']
            ])
        });

        new HeadlessTest(new CheckboxInputBuilder()).toBe(input);
    })

    it('should build using all methods', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', true],
                ['required', false],
                ['type', 'checkbox']
            ])
        });

        new HeadlessTest(new CheckboxInputBuilder()
            .checked()
        ).toBe(input);
    })
})