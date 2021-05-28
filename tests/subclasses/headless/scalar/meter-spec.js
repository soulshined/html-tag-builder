describe('Headless Meter Builder', function () {

    it('should build', function () {
        const meter = createHDocElement('meter', {
            attrs: new Map([
                ['min', 20],
                ['max', 25],
                ['low', 20],
                ['high', 25]
            ])
        });
        new HeadlessTest(new MeterBuilder().minmax(20, 25).lowhigh(20, 25)).toBe(meter);
    })

    it('should build using all methods', function () {
        const meter = createHDocElement('meter', {
            attrs: new Map([
                ['min', 20],
                ['max', 30],
                ['low', 5],
                ['high', 10],
                ['optimum', 2.52352525252525252525]
            ])
        });

        new HeadlessTest(
            new MeterBuilder()
                .min(20)
                .max(30)
                .low(5)
                .high(10)
                .optimum(2.52352525252525252525)
        ).toBe(meter);
    })

})