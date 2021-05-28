describe('Headless File Input Builder', function () {
    it('should build', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'file'],
                ['multiple', false],
                ['accept', '']
            ])
        });

        new HeadlessTest(new FileInputBuilder()).toBe(input);
    })

    it('should build using all methods', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'file'],
                ['multiple', true],
                ['accept', '*'],
                ['capture', 'user']
            ])
        });

        new HeadlessTest(new FileInputBuilder("*")
            .capture('user')
            .multiple()
        ).toBe(input);
    })
})