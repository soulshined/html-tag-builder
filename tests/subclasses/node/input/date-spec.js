describe('Date Builders', function () {

    describe('Date Input Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'date';

            new BuilderTest(new DateInputBuilder()).toEqualNode(input);
        })
    })

    describe('DateTimeLocal Input Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'datetime-local';

            new BuilderTest(new DateTimeLocalInputBuilder()).toEqualNode(input);
        })
    })

    describe('Month Input Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'month';

            new BuilderTest(new MonthInputBuilder()).toEqualNode(input);
        })
    })

    describe('Time Input Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'time';

            new BuilderTest(new TimeInputBuilder()).toEqualNode(input);
        })
    })

    describe('Week Input Builder', function () {
        it('should build', function () {
            const input = createDocElement('input');
            input.spellcheck = false;
            input.checked = false;
            input.required = false;
            input.type = 'week';

            new BuilderTest(new WeekInputBuilder()).toEqualNode(input);
        })
    })

})