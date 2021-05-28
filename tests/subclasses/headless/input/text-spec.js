describe('Headless Text Input Builder', function () {

    describe('TextArea Builder', function () {
        it('should build', function () {
            const input = createHDocElement('textarea', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['required', false]
                ])
            });
            new HeadlessTest(new TextAreaBuilder()).toBe(input);
        })

        it('should build using all methods', function () {
            const input = createHDocElement('textarea', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['required', false],
                    ['rows', 20],
                    ['cols', 5],
                    ['maxlength', 75],
                    ['minlength', 50],
                    ['wrap', 'soft']
                ])
            });

            new HeadlessTest(new TextAreaBuilder(20, 5)
                .maxLength(75)
                .minLength(50)
                .wrap('soft')
            ).toBe(input);
        })
    })

    describe('Text Builder', function () {

        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'text']
                ])
            });
            new HeadlessTest(new TextInputBuilder()).toBe(input);
        })

        it('should build using all methods', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'text'],
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'text'],
                    ['maxlength', 75],
                    ['minlength', 50],
                    ['pattern', '[\\w-]+'],
                    ['size', 40]
                ])
            });

            new HeadlessTest(new TextInputBuilder()
                .maxLength(75)
                .minLength(50)
                .pattern("[\\w-]+")
                .size(40)
            ).toBe(input);
        })


    })

    describe('Email Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'email'],
                    ['multiple', false]
                ])
            });
            new HeadlessTest(new EmailInputBuilder()).toBe(input);
        })

        it('should build using all methods', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'email'],
                    ['multiple', true]
                ])
            });

            new HeadlessTest(new EmailInputBuilder().multiple()).toBe(input);
        })
    })

    describe('Password Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'password']
                ])
            });
            new HeadlessTest(new PasswordInputBuilder()).toBe(input);
        })

        it('should build using all methods', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'password']
                ])
            });
            new HeadlessTest(new PasswordInputBuilder()).toBe(input);
        })
    })

    describe('Search Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'search']
                ])
            });
            new HeadlessTest(new SearchInputBuilder()).toBe(input);
        })

        it('should build using all methods', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'search']
                ])
            });
            new HeadlessTest(new SearchInputBuilder()).toBe(input);
        })
    })

    describe('Tel Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'tel']
                ])
            });
            new HeadlessTest(new TelInputBuilder()).toBe(input);
        })

        it('should build using all methods', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'tel']
                ])
            });
            new HeadlessTest(new TelInputBuilder()).toBe(input);
        })
    })

    describe('Url Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'url']
                ])
            });
            new HeadlessTest(new UrlInputBuilder()).toBe(input);
        })

        it('should build using all methods', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'url']
                ])
            });
            new HeadlessTest(new UrlInputBuilder()).toBe(input);
        })
    })

})