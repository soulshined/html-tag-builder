describe('Headless Anchor Builder', function () {
    it('should build', function () {
        const a = createHDocElement('a', {
            attrs: new Map([
                ['href', 'www.example.com'],
                ['target', '_self']
            ])
        });
        new HeadlessTest(new AnchorBuilder('www.example.com')).toBe(a);
    })

    it('should build using all methods', function () {
        const a = createHDocElement('a', {
            attrs: new Map([
                ['href', 'www.example.com'],
                ['target', '_self'],
                ['hreflang', 'en'],
                ['type', 'plain/text'],
                ['ping', 'www.google.com www.amazon.com'],
                ['rel', 'noopener']
            ])
        });
        new HeadlessTest(new AnchorBuilder('www.example.com')
            .hreflang('en')
            .mimeType('plain/text')
            .ping(["www.google.com", "www.amazon.com"])
            .rel("noopener")
        ).toBe(a);
    })
})