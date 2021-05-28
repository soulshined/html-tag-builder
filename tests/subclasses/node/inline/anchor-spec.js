describe('Anchor Builder', function () {
    it('should build', function () {
        const a = createDocElement('a');
        a.href = "www.example.com";
        a.target = "_self";
        new BuilderTest(new AnchorBuilder('www.example.com')).toEqualNode(a);
    })

    it('should build using all methods', function () {
        const a = createDocElement('a');
        a.href = "www.example.com";
        a.target = "_self";
        a.rel = "noopener";
        a.ping = "www.google.com www.amazon.com";
        a.type = "plain/text";
        a.hreflang = 'en';
        new BuilderTest(new AnchorBuilder('www.example.com')
            .hreflang('en')
            .mimeType('plain/text')
            .ping(["www.google.com", "www.amazon.com"])
            .rel("noopener")
        ).toEqualNode(a);
    })
})