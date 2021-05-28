describe('Headless Tag Builder', function () {

    it('Initial Attributes', function () {
        let ul = createHDocElement('ul');
        new HeadlessTest(new TagBuilder("ul")).toBe(ul);

        ul = createHDocElement('ul', { id: 'myUL' });
        new HeadlessTest(new TagBuilder('ul', 'myUL')).toBe(ul);
    })

    it('should clone', function () {
        const aTagBuilder = new TagBuilder('ul', 'myList').append(
            new TagBuilder('li', 'myli').innerText('foobar'),
            new TagBuilder('li', 'myli-2').innerText('foobar2'),
            new TagBuilder('li', 'myli-3').innerText('foobar3'),
            new TagBuilder('li', 'myli-4').innerText('foobar4'),
            new TagBuilder('li', 'myli-5').innerText('foobar5')
        );
        const bTagBuilder = aTagBuilder.clone();
        expect(aTagBuilder.build()).toEqual(bTagBuilder.build());
    })

    it('should register events', function () {
        const button = createHDocElement('button', {
            attrs: new Map([
                ['onclick', `() => 'hello world'`]
            ])
        });
        const builderButton = new TagBuilder('button').on('click', () => 'hello world');
        new HeadlessTest(builderButton).toBe(button);
    })

    it('should add unknown events [native events]', function () {
        const button = createHDocElement('button', {
            attrs: new Map([
                ['onfoobar', `() => 'hello world'`]
            ])
        });
        new HeadlessTest(new TagBuilder('button').on('foobar', () => 'hello world')).toBe(button);
    })

    describe('All tags', function () {
        ALL_HTML_TAGS.forEach(tag => {
            it(`should create '${tag}'`, function () {
                new HeadlessTest(new TagBuilder(tag)).toBe(createHDocElement(tag));
            })
        })
    })

    describe("accessKey", function () {
        it("should add single access key", function () {
            const node = createHDocElement('ul', {
                attrs: new Map([
                    ['accesskey', 's']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').accessKey('s')).toBe(node);
        })
    })

    describe("setAttribute alias", function () {
        it("should set native attribute", function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['style', 'padding-left: 10px;']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').attr("style", "padding-left: 10px;")).toBe(ul);
            expect(new TagBuilder('ul').attr("style", "padding-left: 10px;").buildHTML())
                .toBe(`<ul draggable="false" style="padding-left: 10px;"></ul>`);
        })
        it("should set data-* attribute", function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['data-my-attr', '12356780=1235']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').attr("data-my-attr", "12356780=1235")).toBe(ul);
        })
    })

    describe("append children", function () {
        it('should append child', function () {
            const ul = createHDocElement('ul', {
                innerHTML: createHDocElement('li', { innerHTML: "foobar" })
            });
            new HeadlessTest(new TagBuilder('ul').append(
                new TagBuilder('li').innerText("foobar")
            )).toBe(ul);
        })
        it('should append many children', function () {
            const ul = createHDocElement('ul', {
                innerHTML: createHDocElement('li', { innerHTML: 'foobar' }) +
                    createHDocElement('li', { innerHTML: 'foobar2' }) +
                    createHDocElement('li', { innerHTML: 'foobar3' }) +
                    createHDocElement('li', { innerHTML: 'foobar4' })
            });
            new HeadlessTest(new TagBuilder('ul').append(
                new TagBuilder('li').innerText("foobar"),
                new TagBuilder("li").innerText("foobar2"),
                new TagBuilder("li").innerText("foobar3"),
                new TagBuilder("li").innerText("foobar4")
            )).toBe(ul);
        })
    })

    describe("prepend children", function () {
        it('should prepend child', function () {
            const ul = createHDocElement('ul', {
                innerHTML: createHDocElement('li', { innerHTML : 'foobar' })
            });
            new HeadlessTest(new TagBuilder('ul').prepend(
                new TagBuilder('li').innerText("foobar")
            )).toBe(ul);
        })
        it('should prepend many children', function () {
            const ul = createHDocElement('ul', {
                innerHTML: createHDocElement('li', { innerHTML: 'foobar' }) +
                    createHDocElement('li', { innerHTML: 'foobar2' }) +
                    createHDocElement('li', { innerHTML: 'foobar3' }) +
                    createHDocElement('li', { innerHTML: 'foobar4' })
            });
            new HeadlessTest(new TagBuilder('ul').prepend(
                new TagBuilder('li').innerText("foobar"),
                new TagBuilder("li").innerText("foobar2"),
                new TagBuilder("li").innerText("foobar3"),
                new TagBuilder("li").innerText("foobar4")
            )).toBe(ul);
        })
    })

    describe("Insert Adjacent", function () {
        it('should insert before', function () {
            const div = createHDocElement('div', { innerHTML: 'First div' });
            const div2 = createHDocElement('div', { id: 'div2', innerHTML: 'before' });

            new HeadlessTest(new TagBuilder('div').innerHTML('First div').insertAdjacent(new TagBuilder('div', 'div2').innerHTML('before'), 'before')).toBe(div2 + div);
        })

        it('should insert after', function () {
            const div = createHDocElement('div', { innerHTML: 'First div' });
            const div2 = createHDocElement('div', { id: 'div2', innerHTML: 'before' });

            new HeadlessTest(new TagBuilder('div').innerHTML('First div').insertAdjacent(new TagBuilder('div', 'div2').innerHTML('before'))).toBe(div + div2);
        })
    })

    describe('misc builder methods', function () {
        it('should set inputmode', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['inputmode', 'email']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').inputMode("email")).toBe(ul);
        })

        it('should set contentEditable', function () {
            const ul = createHDocElement('ul', { contentEditable: true });
            new HeadlessTest(new TagBuilder('ul').contentEditable()).toBe(ul, {
                contentEditable: true
            });
        })

        it('should set directionality', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['dir', 'rtl']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').dir("rtl")).toBe(ul);
        })

        it('should set draggable', function () {
            const ul = createHDocElement('ul', { draggable: true });
            new HeadlessTest(new TagBuilder('ul').draggable()).toBe(ul);
        })

        it('should set hidden', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['hidden', true]
                ])
            });
            new HeadlessTest(new TagBuilder('ul').hidden()).toBe(ul);
        })

        it('should set slot identifier', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['slot', 'description']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').slot("description")).toBe(ul);
        })

        it('should set spellcheck', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['spellcheck', true]
                ])
            });
            new HeadlessTest(new TagBuilder('ul').spellcheck()).toBe(ul);
        })

        it('should set tabindex', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['tabindex', Number.MAX_SAFE_INTEGER]
                ])
            });
            new HeadlessTest(new TagBuilder('ul').tabIndex(Number.MAX_SAFE_INTEGER)).toBe(ul);
        })

        it('should set title', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['title', 'foobar']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').title("foobar")).toBe(ul);
        })

        it('should set innerHTML', function () {
            const ul = createHDocElement('ul', {
                innerHTML: createHDocElement('li', { innerHTML: 'foobar' }) +
                    createHDocElement('li', { innerHTML: 'foobar2' }) +
                    createHDocElement('li', { innerHTML: 'foobar3' }) +
                    createHDocElement('li', { innerHTML: 'foobar4' })
            });
            new HeadlessTest(new TagBuilder('ul').innerHTML('<li draggable="false">foobar</li><li draggable="false">foobar2</li><li draggable="false">foobar3</li><li draggable="false">foobar4</li>')).toBe(ul);
        })

        it('should set innerText', function () {
            const ul = createHDocElement('ul', {
                innerHTML: "<li>foobar</li>"
            });
            new HeadlessTest(new TagBuilder('ul').innerText("<li>foobar</li>")).toBe(ul);
        })

        describe('autocapitalize', function () {
            const types = ['off', 'on', 'none', 'sentences', 'words', 'characters']
            types.forEach(type => {
                it(`should set '${type}'`, function () {
                    const ul = createHDocElement('ul', {
                        attrs: new Map([
                            ['autocapitalize', type]
                        ])
                    });
                    new HeadlessTest(new TagBuilder('ul').autocapitalize(type)).toBe(ul);
                })
            })
        })

        it('should set bounds', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['style', 'width: 100px; height: 150px;']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').bounds('100px', '150px')).toBe(ul);
        })

        it('should set caret-color', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['style', 'caret-color: #F00;']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').caret("#F00")).toBe(ul);
        })

        it('should set classes (and remove duplicates)', function () {
            const ul = createHDocElement('ul', {
                classes: ['foo', 'btn', 'btn-lg', 'btn-primary']
            });

            new HeadlessTest(new TagBuilder('ul').classes('foo', 'btn', 'btn-lg', 'btn-primary', 'btn', 'btn-lg', 'btn-primary')).toBe(ul);
        })

        it('should set height', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['style', 'height: 100px;']
                ])
            });
            new HeadlessTest(new TagBuilder('ul').height("100px")).toBe(ul);
        })

        describe('margins', function () {
            it('should not set margin due to 0 values', function () {
                new HeadlessTest(new TagBuilder('ul').margin()).toBe('<ul draggable="false"></ul>');
            })
            it('should not set margin due to too many values', function () {
                new HeadlessTest(new TagBuilder('ul').margin('10px', '20px', '30px', '55px', '60px')).toBe('<ul draggable="false"></ul>');
            })
            it('should set margin using shorthand [all]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'margin: 5px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').margin('5px')).toBe(ul);
            })
            it('should set margin using shorthand [horizontal | vertical]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'margin: 5px 10px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').margin('5px', '10px')).toBe(ul);
            })
            it('should set margin using shorthand [top | horizontal | bottom]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'margin: 5px 10px 8px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').margin('5px', '10px', '8px')).toBe(ul);
            })
        })

        describe('origins', function () {
            it('should set origins [left]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'left: -5px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').origin(null, null, null, '-5px')).toBe(ul);
            })
            it('should set origins [right]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'right: -5px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').origin(null, '-5px')).toBe(ul);
            })
            it('should set origins [top]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'top: -5px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').origin('-5px')).toBe(ul);
            })
            it('should set origins [bottom]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'bottom: -5px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').origin(null, null, '-5px')).toBe(ul);
            })
            it('should set origins [all]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'top: -5px; right: -5px; bottom: -5px; left: -5px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').origin('-5px', '-5px', '-5px', '-5px')).toBe(ul);
            })
        })

        describe('padding', function () {
            it('should not set padding due to 0 values', function () {
                new HeadlessTest(new TagBuilder('ul').padding()).toBe('<ul draggable="false"></ul>');
            })
            it('should not set padding due to too many values', function () {
                new HeadlessTest(new TagBuilder('ul').padding('10px', '20px', '30px', '55px', '60px')).toBe('<ul draggable="false"></ul>');
            })
            it('should set padding using shorthand [all]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'padding: 5px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').padding('5px')).toBe(ul);
            })
            it('should set padding using shorthand [horizontal | vertical]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'padding: 5px 10px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').padding('5px', '10px')).toBe(ul);
            })
            it('should set padding using shorthand [top | horizontal | bottom]', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', 'padding: 5px 10px 8px;']
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').padding('5px', '10px', '8px')).toBe(ul);
            })
        })

        describe('positions', function () {
            const pos = ['relative', 'absolute', 'static', 'fixed', 'sticky'];
            pos.forEach(e => {
                it(`should set position '${e}'`, function () {
                    const ul = createHDocElement('ul', {
                        attrs: new Map([
                            ['style', `position: ${e};`]
                        ])
                    });
                    new HeadlessTest(new TagBuilder('ul').position(e)).toBe(ul);
                })
            })
        })

        describe('styles', function () {
            it('should ignore undefined/null property', function () {
                const ul = createHDocElement('ul');
                const p = undefined;
                const style = {};
                style[p] = '20px';
                new HeadlessTest(new TagBuilder('ul').style(style)).toBe(ul);
            })
            it('should ignore unknown property', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', `foobar: 20px;`]
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').style({ 'foobar': '20px' })).toBe(ul);
            })
            it('should ignore unknown value for valid property', function () {
                const ul = createHDocElement('ul', {
                    attrs: new Map([
                        ['style', `padding-left: sticky;`]
                    ])
                });
                new HeadlessTest(new TagBuilder('ul').style({ 'padding-left': 'sticky' })).toBe(ul);
            })
            it('should ignore undefined/null property value', function () {
                const ul = createHDocElement('ul');
                const p = 'padding';
                const style = {};
                style[p] = null;
                new HeadlessTest(new TagBuilder('ul').style(style)).toBe(ul);
            })
        })

        describe('textcase', function () {
            const cases = ['uppercase', 'lowercase', 'none', 'capitalize', 'inherit'];
            cases.forEach(tcase => {
                it(`should set to '${tcase}'`, function () {
                    const ul = createHDocElement('ul', {
                        attrs: new Map([
                            ['style', `text-transform: ${tcase};`]
                        ])
                    });
                    new HeadlessTest(new TagBuilder('ul').textcase(tcase)).toBe(ul);
                })
            })
        })

        describe('visibility', function () {
            const opts = ['visible', 'hidden', 'collapse'];
            opts.forEach(opt => {
                it(`should set '${opt}'`, function () {
                    const ul = createHDocElement('ul', {
                        attrs: new Map([
                            ['style', `visibility: ${opt};`]
                        ])
                    });
                    new HeadlessTest(new TagBuilder('ul').visibility(opt)).toBe(ul);
                })
            })
        })

        it('should set width', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['style', `width: 155px;`]
                ])
            });
            new HeadlessTest(new TagBuilder('ul').width("155px")).toBe(ul);
        })
    })

    describe('accessibility', function () {
        it('should coerce element to be for screen readers only', function () {
            const ul = createHDocElement('ul', {
                attrs: new Map([
                    ['style', `border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px;`]
                ])
            });
            new HeadlessTest(new TagBuilder('ul').screenReaderOnly()).toBe(ul);
        })
    })


})

