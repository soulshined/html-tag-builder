describe('Headless Iframe Builder', function () {

    it('should build', function () {
        const iframe = createHDocElement('iframe', {
            attrs: new Map([
                ['src', '#example']
            ])
        });
        new HeadlessTest(new IframeBuilder("#example")).toBe(iframe);
    })

    it('should build using all methods', function () {
        const iframe = createHDocElement('iframe', {
            attrs: new Map([
                ['src', '#example'],
                ['allow', 'autoplay camera magnetometer'],
                ['referrerpolicy', 'no-referrer'],
                ['sandbox', 'allow-downloads allow-modals allow-popups']
            ])
        });

        new HeadlessTest(
            new IframeBuilder("#example")
                .allow('autoplay camera magnetometer')
                .referrerPolicy('no-referrer')
                .sandbox('allow-downloads allow-modals allow-popups')
        ).toBe(iframe);
    })

})