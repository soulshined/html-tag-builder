describe('Text Input Builder', function () {

    describe('TextArea Builder', function () {
        it('should build', function () {
            const input = createDocElement('textarea');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            new BuilderTest(new TextAreaBuilder()).toEqualNode(input);
        })

        it('should build using all methods', function () {
            const input = createDocElement('textarea');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.maxLength = 75;
            input.minLength = 50
            input.wrap = 'soft';
            input.rows = 20;
            input.cols = 5;

            new BuilderTest(new TextAreaBuilder(20, 5)
                .maxLength(75)
                .minLength(50)
                .wrap('soft')
            ).toEqualNode(input);
        })
    })

    describe('Text Builder', function () {

        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'text';
            new BuilderTest(new TextInputBuilder()).toEqualNode(input);
        })

        it('should build using all methods', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'text';
            input.maxLength = 75;
            input.minLength = 50
            input.pattern = '[\\w-]+';
            input.size = 40;

            new BuilderTest(new TextInputBuilder()
                .maxLength(75)
                .minLength(50)
                .pattern("[\\w-]+")
                .size(40)
            ).toEqualNode(input);
        })


    })

    describe('Email Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'email';
            input.multiple = false;
            new BuilderTest(new EmailInputBuilder()).toEqualNode(input);
        })

        it('should build using all methods', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'email';
            input.multiple = true;

            new BuilderTest(new EmailInputBuilder()
                .multiple()
            ).toEqualNode(input);
        })
    })

    describe('Password Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'password';
            new BuilderTest(new PasswordInputBuilder()).toEqualNode(input);
        })

        it('should build using all methods', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'password';
            new BuilderTest(new PasswordInputBuilder()).toEqualNode(input);
        })
    })

    describe('Search Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'search';
            new BuilderTest(new SearchInputBuilder()).toEqualNode(input);
        })

        it('should build using all methods', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'search';
            new BuilderTest(new SearchInputBuilder()).toEqualNode(input);
        })
    })

    describe('Tel Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'tel';
            new BuilderTest(new TelInputBuilder()).toEqualNode(input);
        })

        it('should build using all methods', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'tel';
            new BuilderTest(new TelInputBuilder()).toEqualNode(input);
        })
    })

    describe('Url Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'url';
            new BuilderTest(new UrlInputBuilder()).toEqualNode(input);
        })

        it('should build using all methods', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'url';
            new BuilderTest(new UrlInputBuilder()).toEqualNode(input);
        })
    })

})