describe('Form Builder', function () {

    it('should build', function () {
        const form = createDocElement('form');
        form.method = 'get';
        form.action = "#";
        new BuilderTest(new FormBuilder("#")).toEqualNode(form);
    })

    it('should build using all methods', function () {
        const form = createDocElement('form');
        form.method = 'post';
        form.action = "#";
        form.acceptCharset = "utf-8";
        form.enctype = 'application/x-www-form-urlencoded';
        form.setAttribute('rel', 'noopener');
        form.target = '_self';
        form.noValidate = true;

        new BuilderTest(
            new FormBuilder('#', 'post')
                .acceptCharset("utf-8")
                .enctype('application/x-www-form-urlencoded')
                .rel('noopener')
                .target('_self')
                .noValidate()
        ).toEqualNode(form);
    })

})