describe('Span Builder', function () {
    it('should build', function () {
        const input = createDocElement('span');
        new BuilderTest(new SpanBuilder()).toEqualNode(input);
    })

    it('should build with constructor styles', function () {
        const input = createDocElement('span');
        input.style.fontWeight = 'lighter';
        input.style.fontStyle = 'italic';
        input.style.textDecoration = 'underline';

        //include style not possible (boldest)
        new BuilderTest(
            new SpanBuilder(['bolder', 'boldest', 'bold', 'strikethrough', 'underline', 'lighter', 'italic'])
        ).toEqualNode(input);
    })

    it('should build using all methods', function () {
        const input = createDocElement('span');
        input.style.fontWeight = 'lighter';
        input.style.fontStyle = 'italic';
        input.style.textDecoration = 'underline';
        input.style.color = 'red';

        new BuilderTest(
            new SpanBuilder()
                .bold()
                .bolder()
                .italic()
                .lighter()
                .underline()
                .strikethrough()
                .color('red')
        ).toEqualNode(input);
    })
})