describe('Headless Area Builder', function () {
    it('should build', function () {
        const area = createHDocElement('area', {
            attrs: new Map([
                ['coords', '130,136,60'],
                ['shape', 'circle']
            ])
        });
        new HeadlessTest(new AreaBuilder('130,136,60', 'circle')).toBe(area);
    })

    it('should build using all methods', function () {
        const area = createHDocElement('area', {
            attrs: new Map([
                ['coords', '130,136,60'],
                ['shape', 'circle'],
                ['href', 'myimage.png'],
                ['alt', 'my image'],
                ['hreflang', 'en'],
                ['ping', 'abc.123 abc.321'],
                ['rel', 'noopener'],
                ['target', '_self']
            ])
        });
        new HeadlessTest(new AreaBuilder('130,136,60', 'circle')
            .href('myimage.png', 'my image')
            .hreflang('en')
            .ping(['abc.123', 'abc.321'])
            .rel('noopener')
            .target('_self')
        ).toBe(area);
    })
})