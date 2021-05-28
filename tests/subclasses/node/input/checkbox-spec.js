describe('Checkbox Input Builder', function () {
    it('should build', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'checkbox';

        new BuilderTest(new CheckboxInputBuilder()).toEqualNode(input);
    })

    it('should build using all methods', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = true;
        input.required = false;
        input.type = 'checkbox';

        new BuilderTest(new CheckboxInputBuilder()
            .checked()
        ).toEqualNode(input);
    })
})