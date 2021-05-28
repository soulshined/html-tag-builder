describe('Meter Builder', function () {

    it('should build', function () {
        const meter = createDocElement('meter');
        meter.min = 20;
        meter.max = 25;
        meter.low = 20;
        meter.high = 25;
        new BuilderTest(new MeterBuilder().minmax(20, 25).lowhigh(20, 25)).toEqualNode(meter);
    })

    it('should build using all methods', function () {
        const meter = createDocElement('meter');
        meter.min = 20;
        meter.max = 30;
        meter.low = 5;
        meter.high = 10;
        meter.optimum = 2.52352525252525252525;

        new BuilderTest(
            new MeterBuilder()
                .min(20)
                .max(30)
                .low(5)
                .high(10)
                .optimum(2.52352525252525252525)
        ).toEqualNode(meter);
    })

})