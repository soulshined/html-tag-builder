describe('File Input Builder', function () {
    it('should build', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'file';

        new BuilderTest(new FileInputBuilder()).toEqualNode(input);
    })

    it('should build using all methods', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'file';
        input.setAttribute('capture', 'user');
        input.multiple = true;
        input.accept = '*';

        new BuilderTest(new FileInputBuilder("*")
            .capture('user')
            .multiple()
        ).toEqualNode(input);
    })
})