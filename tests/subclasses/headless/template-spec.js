const cssText = `details {font-family: "Open Sans Light", Helvetica, Arial, sans-serif } .name {font-weight: bold; color: #217ac0; font-size: 120% } h4 { margin: 10px 0 -8px 0; background: #217ac0; color: white; padding: 2px 6px; border: 1px solid #cee9f9; border-radius: 4px; } .attributes { margin-left: 22px; font-size: 90% } .attributes p { margin-left: 16px; font-style: italic }`;

describe('Headless Template Builder', function () {

  it('should clone', function () {
    const aBuilder = new TemplateBuilder('myTemplate')
    const bBuilder = aBuilder.clone();
    const cBuilder = bBuilder.clone();
    cBuilder.hidden();
    console.log('A Node', aBuilder.buildHTML());
    console.log('B Node', bBuilder.buildHTML());
    console.log('C Node', cBuilder.buildHTML());
    expect(aBuilder.buildHTML()).toEqual(bBuilder.buildHTML());
    expect(cBuilder.buildHTML()).not.toEqual(bBuilder.buildHTML());
  })

  it('should build', function () {
    const template = createHDocElement('template', {
      id: 'element-details-template'
    });
    new HeadlessTest(new TemplateBuilder('element-details-template')).toBe(template);
  })

  it('should build using all methods', function () {
    const template = createHDocElement('template', {
      id: 'element-details-template',
      innerHTML: createHDocElement('style', { innerHTML: cssText }) +
        createHDocElement('details', {
          attrs: new Map([
            ['open', 'false']
          ]),
          innerHTML: `<summary draggable="false"><code class="name">&lt;<slot name="element-name">NEED NAME</slot>&gt;</code><i class="desc"><slot name="description">NEED DESCRIPTION</slot></i></summary><div class="attributes"><h4>Attributes</h4><slot name="attributes"><p>None</p></slot></div>`
        })
    });

    new HeadlessTest(new TemplateBuilder('element-details-template')
      .addStylesToRoot(cssText)
      .append(new DetailsBuilder(`<code class="name">&lt;<slot name="element-name">NEED NAME</slot>&gt;</code><i class="desc"><slot name="description">NEED DESCRIPTION</slot></i>`).append(`<div class="attributes"><h4>Attributes</h4><slot name="attributes"><p>None</p></slot></div>`))
    ).toBe(template);
  })

})