describe('Tag Builder Options', function () {
    afterEach(function (done) {
        TagBuilderOptions.reset();
        done();
    })

    it('should build for default input type', function() {
        TagBuilderOptions.defaultInputType = 'image';

        const input = createDocElement('input');
        input.spellcheck = false;
        input.type = 'image';

        new BuilderTest(new InputBuilder()).toEqualNode(input);
    })

    it('should build for default script async', function() {
        TagBuilderOptions.scriptAsync = false;

        const script = createDocElement('script');
        script.async = false;

        new BuilderTest(new ScriptBuilder()).toEqualNode(script);
    })

    it('should not add value for options automatically', function() {
        TagBuilderOptions.useOptionContentForEmptyOptionValue = false;

        const opt = createDocElement('option', { value: '', innerHTML : 'Chuck Norris' });

        new BuilderTest(new OptionBuilder('Chuck Norris')).toEqualNode(opt);
    })

})
