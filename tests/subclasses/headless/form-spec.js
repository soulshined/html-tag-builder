describe('Headless Form Builder', function () {

    it('should build', function () {
        const form = createHDocElement('form', {
            attrs: new Map([
                ['method', 'get'],
                ['action', '#']
            ])
        });
        new HeadlessTest(new FormBuilder("#")).toBe(form);
    })

    it('should build using all methods', function () {
        const form = createHDocElement('form', {
            attrs: new Map([
                ['method', 'post'],
                ['action', '#'],
                ['acceptcharset', 'utf-8'],
                ['enctype', 'application/x-www-form-urlencoded'],
                ['rel', 'noopener'],
                ['target', '_self'],
                ['novalidate', 'true']
            ])
        });

        new HeadlessTest(
            new FormBuilder('#', 'post')
                .acceptCharset("utf-8")
                .enctype('application/x-www-form-urlencoded')
                .rel('noopener')
                .target('_self')
                .noValidate()
        ).toBe(form);
    })

})