describe('Headless Date Builders', function () {

    describe('Date Input Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'date']
                ])
            });

            new HeadlessTest(new DateInputBuilder()).toBe(input);
        })
    })

    describe('DateTimeLocal Input Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'datetime-local']
                ])
            });

            new HeadlessTest(new DateTimeLocalInputBuilder()).toBe(input);
        })
    })

    describe('Month Input Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'month']
                ])
            });

            new HeadlessTest(new MonthInputBuilder()).toBe(input);
        })
    })

    describe('Time Input Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'time']
                ])
            });

            new HeadlessTest(new TimeInputBuilder()).toBe(input);
        })
    })

    describe('Week Input Builder', function () {
        it('should build', function () {
            const input = createHDocElement('input', {
                attrs: new Map([
                    ['spellcheck', false],
                    ['checked', false],
                    ['required', false],
                    ['type', 'week']
                ])
            });

            new HeadlessTest(new WeekInputBuilder()).toBe(input);
        })
    })

})