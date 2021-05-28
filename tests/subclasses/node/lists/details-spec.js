describe('Details Builder', function () {

    it('should build', function () {
        const details = createDocElement('details');
        new BuilderTest(new DetailsBuilder()).toEqualNode(details);
    })

    it('should build with summary', function () {
        const details = createDocElement('details');
        details.open = true;
        const div = document.createElement('div');
        div.classList.add('attributes');
        const h4 = document.createElement(('h4'));
        h4.innerHTML = 'Attributes';
        const slot = document.createElement('slot');
        slot.name = 'attributes';
        slot.innerHTML = '<p>None</p>';
        div.append( h4, slot )
        const summary = createDocElement('summary');
        summary.append(div);
        details.append(summary);
        new BuilderTest(new DetailsBuilder(`<div class="attributes"><h4>Attributes</h4><slot name="attributes"><p>None</p></slot></div>`, true)).toBe(details);
    })

})