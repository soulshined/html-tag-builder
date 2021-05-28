describe('Iframe Builder', function () {

    it('should build', function () {
        const iframe = createDocElement('iframe');
        iframe.src = "#example";
        new BuilderTest(new IframeBuilder("#example")).toEqualNode(iframe);
    })

    it('should build using all methods', function () {
        const iframe = createDocElement('iframe');
        iframe.src = "#example";
        iframe.allow = 'autoplay camera magnetometer';
        iframe.referrerPolicy = 'no-referrer';
        iframe.sandbox = 'allow-downloads allow-modals allow-popups';

        new BuilderTest(
            new IframeBuilder("#example")
                .allow('autoplay camera magnetometer')
                .referrerPolicy('no-referrer')
                .sandbox('allow-downloads allow-modals allow-popups')
        ).toEqualNode(iframe);
    })

})