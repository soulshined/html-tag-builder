describe('Number Builder', function () {
    it('should build', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'number';
        input.value = 2.2222222;
        new BuilderTest(new NumberInputBuilder(2.2222222)).toEqualNode(input);
    })

    it('should build using all methods', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'number';
        input.min = '1';
        input.max = '23';
        input.step = '5';
        new BuilderTest(new NumberInputBuilder(2.2222222)
            .min('1')
            .max('23')
            .step('5')
        ).toEqualNode(input);
    })
})

describe('Range Builder', function () {
    it('should build', function () {
        const input = createDocElement('input');
        input.spellcheck = false;
        input.checked = false;
        input.required = false;
        input.type = 'range';
        input.value = 2.2222222;
        new BuilderTest(new RangeInputBuilder(2.2222222)).toEqualNode(input);
    })
})