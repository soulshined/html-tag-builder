describe('Area Builder', function () {
    it('should build', function () {
        const area = createDocElement('area');
        area.coords = '130,136,60';
        area.shape = 'circle';
        new BuilderTest(new AreaBuilder('130,136,60', 'circle')).toEqualNode(area);
    })

    it('should build using all methods', function () {
        const area = createDocElement('area');
        area.coords = '130,136,60';
        area.shape = 'circle';
        area.href = 'myimage.png';
        area.setAttribute('hreflang', 'en');
        area.alt = 'my image';
        area.ping = 'abc.123 abc.321';
        area.rel = 'noopener';
        area.target = '_self';
        new BuilderTest(new AreaBuilder('130,136,60', 'circle')
            .href('myimage.png', 'my image')
            .hreflang('en')
            .ping(['abc.123', 'abc.321'])
            .rel('noopener')
            .target('_self')
        ).toEqualNode(area);
    })
})