describe('Image Input Builder', function () {
    it('should build', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'image';
        input.src = 'myimage.png';
        input.alt = 'my image picture';

        new BuilderTest(new ImageInputBuilder('myimage.png', 'my image picture')).toEqualNode(input);
    })

    it('should build using all methods', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'image';
        input.src = 'myimage.png';
        input.alt = 'my image picture';
        input.formAction = 'abc123';
        input.formEnctype = 'application/x-www-form-urlencoded';
        input.formMethod = 'post';

        new BuilderTest(new ImageInputBuilder('myimage.png', 'my image picture')
            .formAction('abc123')
            .formEnctype('application/x-www-form-urlencoded')
            .formMethod('post')
        ).toEqualNode(input);
    })
})