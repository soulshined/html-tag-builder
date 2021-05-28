describe('Headless Details Builder', function () {

    it('should build', function () {
        const details = createHDocElement('details', { attrs: new Map([ ['open', false] ]) });
        new HeadlessTest(new DetailsBuilder()).toBe(details);
    })

    it('should build with summary', function () {
        const details = createHDocElement('details', {
            attrs: new Map([
                ['open', true]
            ]),
            innerHTML: createHDocElement('summary', {
                innerHTML: '<div class="attributes"><h4>Attributes</h4><slot name="attributes"><p>None</p></slot></div>'
            })
        });
        new HeadlessTest(new DetailsBuilder(`<div class="attributes"><h4>Attributes</h4><slot name="attributes"><p>None</p></slot></div>`, true)).toBe(details);
    })

})