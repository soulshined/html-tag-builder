describe('Progress Builder', function () {

    it('should build', function () {
        const progress = createDocElement('progress');
        progress.max = 25;
        progress.value = 10;
        new BuilderTest(new ProgressBuilder(10).max(25)).toEqualNode(progress);
    })

    it('should build using all methods', function () {
        const progress = createDocElement('progress');
        progress.max = 10000.25;
        progress.value = 10000.2;

        new BuilderTest(
            new ProgressBuilder(10000.2)
                .max(10000.25)
        ).toEqualNode(progress);
    })

})