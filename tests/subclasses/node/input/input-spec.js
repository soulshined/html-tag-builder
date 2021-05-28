describe('Input Builder', function () {

    it('should build', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'text';
        new BuilderTest(new InputBuilder()).toEqualNode(input);
    })

    it('should build using all methods', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'email';
        input.autocomplete = 'on';
        input.autofocus = true;
        input.disabled = true;
        input.name = 'email';
        input.validationMessage = 'Chuck Norris is not impressed';

        input.placeholder = 'enter email here';
        input.readOnly = true;
        input.required = true;
        new BuilderTest(new InputBuilder('email')
            .autocomplete('on')
            .autofocus()
            .disabled()
            .name('email')
            .onInvalid('Chuck Norris is not impressed')
            .placeholder('enter email here')
            .readOnly()
            .required()
        ).toEqualNode(input);
    })

})