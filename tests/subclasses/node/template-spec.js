const cssText = `
    details {font-family: "Open Sans Light", Helvetica, Arial, sans-serif }
    .name {font-weight: bold; color: #217ac0; font-size: 120% }
    h4 {
      margin: 10px 0 -8px 0;
      background: #217ac0;
      color: white;
      padding: 2px 6px;
      border: 1px solid #cee9f9;
      border-radius: 4px;
    }
    .attributes { margin-left: 22px; font-size: 90% }
    .attributes p { margin-left: 16px; font-style: italic }
  `;

describe('Template Builder', function () {

    it('should clone', function () {
        const aBuilder = new TemplateBuilder('myTemplate')
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.hidden();
        console.log('A Node', aBuilder.build().outerHTML);
        console.log('B Node', bBuilder.build().outerHTML);
        console.log('C Node', cBuilder.build().outerHTML);
        expect(aBuilder.build()).toEqual(bBuilder.build());
        expect(cBuilder.build()).not.toEqual(bBuilder.build());
    })

    it('should build', function () {
        const template = createDocElement('template');
        template.id = 'element-details-template';
        new BuilderTest(new TemplateBuilder('element-details-template')).toEqualNode(template);
    })

    it('should build using all methods', function () {
        const template = createDocElement('template');
        template.id = 'element-details-template';
        const style = createDocElement('style');
        style.innerText = cssText;

        template.append(style, TagBuilder.parse(`<details>
    <summary>
      <code class="name">&lt;<slot name="element-name">NEED NAME</slot>&gt;</code>
      <i class="desc"><slot name="description">NEED DESCRIPTION</slot></i>
    </summary>
    <div class="attributes">
      <h4>Attributes</h4>
      <slot name="attributes"><p>None</p></slot>
    </div>
  </details>`), createDocElement('hr'));

        new BuilderTest(new TemplateBuilder('element-details-template')
            .addStylesToRoot(cssText)
            .append(new DetailsBuilder(`<code class="name">&lt;<slot name="element-name">NEED NAME</slot>&gt;</code>
      <i class="desc"><slot name="description">NEED DESCRIPTION</slot></i>`).append(`<div class="attributes">
      <h4>Attributes</h4>
      <slot name="attributes"><p>None</p></slot>
    </div>`))
        ).toBe(template);
    })

})