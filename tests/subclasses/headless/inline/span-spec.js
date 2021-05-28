describe('Headless Span Builder', function () {
    it('should build', function () {
        const input = createHDocElement('span');
        new HeadlessTest(new SpanBuilder()).toBe(input);
    })

    it('should build with constructor styles', function () {
        const input = createHDocElement('span', {
            attrs: new Map([
                ['style', 'font-weight: lighter; font-style: italic; text-decoration: underline;'],
            ])
        });

        //include style not possible (boldest)
        new HeadlessTest(
            new SpanBuilder(['bolder', 'boldest', 'bold', 'strikethrough', 'underline', 'lighter', 'italic'])
        ).toBe(input);
    })

    it('should build using all methods', function () {
        const input = createHDocElement('span', {
            attrs: new Map([
                ['style', 'font-weight: lighter; font-style: italic; text-decoration: strikethrough; color: red;']
            ])
        });

        new HeadlessTest(
            new SpanBuilder()
                .bold()
                .bolder()
                .italic()
                .lighter()
                .underline()
                .strikethrough()
                .color('red')
        ).toBe(input);
    })
})