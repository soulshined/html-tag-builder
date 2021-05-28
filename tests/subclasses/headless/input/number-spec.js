describe('Headless Number Builder', function () {
    it('should build', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'number'],
                ['value', 2.2222222]
            ])
        });
        new HeadlessTest(new NumberInputBuilder(2.2222222)).toBe(input);
    })

    it('should build using all methods', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'number'],
                ['value', 2.2222222],
                ['min', 1],
                ['max', 23],
                ['step', 5]
            ])
        });
        new HeadlessTest(new NumberInputBuilder(2.2222222)
            .min('1')
            .max('23')
            .step('5')
        ).toBe(input);
    })
})

describe('Headless Range Builder', function () {
    it('should build', function () {
        const input = createHDocElement('input', {
            attrs: new Map([
                ['spellcheck', false],
                ['checked', false],
                ['required', false],
                ['type', 'range'],
                ['value', 2.2222222]
            ])
        });
        new HeadlessTest(new RangeInputBuilder(2.2222222)).toBe(input);
    })
})