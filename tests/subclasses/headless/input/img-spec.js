describe('Headless Image Input Builder', function () {
    it('should build', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'image'],
                ['src', 'myimage.png'],
                ['alt', 'my image picture']
            ])
        });

        new HeadlessTest(new ImageInputBuilder('myimage.png', 'my image picture')).toBe(input);
    })

    it('should build using all methods', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'image'],
                ['src', 'myimage.png'],
                ['alt', 'my image picture'],
                ['formaction', 'abc123'],
                ['formenctype', 'application/x-www-form-urlencoded'],
                ['formmethod', 'post']
            ])
        });

        new HeadlessTest(new ImageInputBuilder('myimage.png', 'my image picture')
            .formAction('abc123')
            .formEnctype('application/x-www-form-urlencoded')
            .formMethod('post')
        ).toBe(input);
    })
})