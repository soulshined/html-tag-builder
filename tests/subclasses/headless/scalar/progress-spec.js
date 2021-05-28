describe('Headless Progress Builder', function () {

    it('should build', function () {
        const progress = createHDocElement('progress', {
            attrs: new Map([
                ['value', 10],
                ['max', 25]
            ])
        });
        new HeadlessTest(new ProgressBuilder(10).max(25)).toBe(progress);
    })

    it('should build using all methods', function () {
        const progress = createHDocElement('progress', {
            attrs: new Map([
                ['value', 10000.2],
                ['max', 10000.25]
            ])
        });

        new HeadlessTest(
            new ProgressBuilder(10000.2)
                .max(10000.25)
        ).toBe(progress);
    })

})