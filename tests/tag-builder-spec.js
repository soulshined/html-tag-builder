describe('Tag Builder', function () {

    it('Initial Attributes', function () {
        const ul = createDocElement('ul');
        new BuilderTest(new TagBuilder("ul")).toEqualNode(ul);

        ul.id = 'myUL';
        new BuilderTest(new TagBuilder('ul', 'myUL')).toEqualNode(ul);
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

    describe('parse', function () {
        it('should parse single element', function () {
            const ul = createDocElement('ul');
            ul.classList.add('big');
            ul.classList.add('bold');
            ul.classList.add('bad');
            ul.setAttribute('data-tag', 'abc');
            ul.setAttribute('disabled', '');

            const li = document.createElement('li');
            li.innerHTML = 'foobar';
            ul.append(li, li.cloneNode(true), li.cloneNode(true), li.cloneNode(true));

            const parsed = TagBuilder.parse('<ul class="big bold bad" data-tag="abc" disabled><li>foobar</li><li>foobar</li><li>foobar</li><li>foobar</li></ul>');
            expect(parsed.length).toEqual(1);
            console.log('Expected Node: ', ul.outerHTML);
            console.log('Builder Node:  ', parsed[0].build().outerHTML);
            expect(parsed[0].build().outerHTML).toBe(ul.outerHTML);
        })
        it('should parse many elements', function () {
            const ul = createDocElement('ul');
            ul.classList.add('big');
            ul.classList.add('bold');
            ul.classList.add('bad');
            ul.setAttribute('data-tag', 'abc');
            ul.setAttribute('disabled', '');


            const li = document.createElement('li');
            li.innerHTML = 'foobar';
            ul.append(li, li.cloneNode(true), li.cloneNode(true), li.cloneNode(true));

            const parsed = TagBuilder.parse('<ul class="big bold bad" data-tag="abc" disabled><li>foobar</li><li>foobar</li><li>foobar</li><li>foobar</li></ul><div>foobar</div><div>foobar</div><div>foobar</div><div>foobar</div>'
            );
            expect(parsed.length).toEqual(5);
        })
        it('should not parse text node', function () {
            expect(TagBuilder.parse('Hello World')).toEqual(null);
        })
    })

    it('should register events', function () {
        const button = createDocElement('button');
        button.onclick = () => 'hello world';
        const builderButton = new TagBuilder('button').on('click', () => 'hello world');
        new BuilderTest(builderButton).toEqualNode(button);
        expect(button.click()).toBe(builderButton.build().click());
    })

    it('should ignore unknown events [native events]', function () {
        const button = createDocElement('button');
        button.addEventListener('foobar', () => 'hello world');
        new BuilderTest(new TagBuilder('button').on('foobar', () => 'hello world')).toEqualNode(button);
    })

    describe('All tags', function () {
        ALL_HTML_TAGS.forEach(tag => {
            it(`should create '${tag}'`, function() {
                new BuilderTest(new TagBuilder(tag)).toBe(createDocElement(tag));
            })
        })
    })

    describe("accessKey", function () {
        it("should add single access key", function () {
            const node = createDocElement('ul');
            node.setAttribute('accessKey', 's');
            new BuilderTest(new TagBuilder('ul').accessKey('s')).toEqualNode(node);
        })
    })

    describe("setAttribute alias", function () {
        it("should set native attribute", function () {
            const ul = createDocElement('ul');
            ul.setAttribute("style", "padding-left: 10px;");
            new BuilderTest(new TagBuilder('ul').attr("style", "padding-left: 10px;")).toEqualNode(ul);
            expect(new TagBuilder('ul').attr("style", "padding-left: 10px;").build().style.paddingLeft).toBe("10px");
        })
        it("should set data-* attribute", function () {
            const ul = createDocElement('ul');
            ul.setAttribute("data-my-attr", "12356780=1235");
            new BuilderTest(new TagBuilder('ul').attr("data-my-attr", "12356780=1235")).toEqualNode(ul);
        })
    })

    describe("append children", function () {
        it('should append child', function() {
            const ul = createDocElement('ul');
            const li = createDocElement('li');
            li.innerText = "foobar";
            ul.appendChild(li);
            new BuilderTest(new TagBuilder('ul').append(
                new TagBuilder('li').innerText("foobar")
            )).toEqualNode(ul);
        })
        it('should append many children', function() {
            const ul = createDocElement('ul');
            const li = createDocElement('li');
            const li2 = createDocElement('li');
            const li3 = createDocElement('li');
            const li4 = createDocElement('li');
            li.innerText = "foobar";
            li2.innerText = "foobar2";
            li3.innerText = "foobar3";
            li4.innerText = "foobar4";
            ul.append(li, li2, li3, li4);
            new BuilderTest(new TagBuilder('ul').append(
                new TagBuilder('li').innerText("foobar"),
                new TagBuilder("li").innerText("foobar2"),
                new TagBuilder("li").innerText("foobar3"),
                new TagBuilder("li").innerText("foobar4")
            )).toEqualNode(ul);
        })
    })

    describe("prepend children", function () {
        it('should prepend child', function() {
            const ul = createDocElement('ul');
            const li = createDocElement('li');
            li.innerText = "foobar";
            ul.prepend(li);
            new BuilderTest(new TagBuilder('ul').prepend(
                new TagBuilder('li').innerText("foobar")
            )).toEqualNode(ul);
        })
        it('should prepend many children', function() {
            const ul = createDocElement('ul');
            const li = createDocElement('li');
            const li2 = createDocElement('li');
            const li3 = createDocElement('li');
            const li4 = createDocElement('li');
            li.innerText = "foobar";
            li2.innerText = "foobar2";
            li3.innerText = "foobar3";
            li4.innerText = "foobar4";
            ul.prepend(li, li2, li3, li4);
            new BuilderTest(new TagBuilder('ul').prepend(
                new TagBuilder('li').innerText("foobar"),
                new TagBuilder("li").innerText("foobar2"),
                new TagBuilder("li").innerText("foobar3"),
                new TagBuilder("li").innerText("foobar4")
            )).toEqualNode(ul);
        })
    })

    describe('misc builder methods', function () {
        it('should set inputmode', function() {
            const ul = createDocElement('ul');
            ul.inputMode = 'email';
            new BuilderTest(new TagBuilder('ul').inputMode("email")).toEqualNode(ul);
        })

        it('should set contentEditable', function () {
            const ul = createDocElement('ul', { contentEditable : true });
            new BuilderTest(new TagBuilder('ul').contentEditable()).toEqualNode(ul, {
                contentEditable : true
            });
        })

        it('should set directionality', function () {
            const ul = createDocElement('ul');
            ul.dir = 'rtl';
            new BuilderTest(new TagBuilder('ul').dir("rtl")).toEqualNode(ul);
        })

        it('should set draggable', function () {
            const ul = createDocElement('ul', { draggable : true });
            new BuilderTest(new TagBuilder('ul').draggable()).toEqualNode(ul);
        })

        it('should set hidden', function () {
            const ul = createDocElement('ul');
            ul.hidden = true;
            new BuilderTest(new TagBuilder('ul').hidden()).toEqualNode(ul);
        })

        it('should set slot identifier', function () {
            const ul = createDocElement('ul');
            ul.slot = 'description';
            new BuilderTest(new TagBuilder('ul').slot("description")).toEqualNode(ul);
        })

        it('should set spellcheck', function () {
            const ul = createDocElement('ul');
            ul.spellcheck = true;
            new BuilderTest(new TagBuilder('ul').spellcheck()).toEqualNode(ul);
        })

        it('should set tabindex', function () {
            const ul = createDocElement('ul');
            ul.tabIndex = Number.MAX_SAFE_INTEGER
            new BuilderTest(new TagBuilder('ul').tabIndex(Number.MAX_SAFE_INTEGER)).toEqualNode(ul);
        })

        it('should set title', function () {
            const ul = createDocElement('ul');
            ul.title = 'foobar';
            new BuilderTest(new TagBuilder('ul').title("foobar")).toEqualNode(ul);
        })

        it('should set innerHTML', function () {
            const ul = createDocElement('ul');
            const li = createDocElement('li');
            const li2 = createDocElement('li');
            const li3 = createDocElement('li');
            const li4 = createDocElement('li');
            li.innerText = "foobar";
            li2.innerText = "foobar2";
            li3.innerText = "foobar3";
            li4.innerText = "foobar4";
            ul.append(...[li, li2, li3, li4]);
            new BuilderTest(new TagBuilder('ul').innerHTML('<li draggable="false">foobar</li><li draggable="false">foobar2</li><li draggable="false">foobar3</li><li draggable="false">foobar4</li>')).toEqualNode(ul);
        })

        it('should set innerText', function () {
            const ul = createDocElement('ul');
            ul.innerText = "<li>foobar</li>";
            new BuilderTest(new TagBuilder('ul').innerText("<li>foobar</li>")).toEqualNode(ul);
        })

        describe('autocapitalize', function () {
            const types = ['off', 'on', 'none', 'sentences', 'words', 'characters']
            types.forEach(type => {
                it(`should set '${type}'`, function() {
                    const ul = createDocElement('ul');
                    ul.autocapitalize = type;
                    new BuilderTest(new TagBuilder('ul').autocapitalize(type)).toEqualNode(ul);
                })
            })
        })

        it('should set bounds', function () {
            const ul = createDocElement('ul');
            ul.style.width = '100px';
            ul.style.height = '150px';
            new BuilderTest(new TagBuilder('ul').bounds('100px', '150px')).toEqualNode(ul);
        })

        it('should set caret-color', function () {
            const ul = createDocElement('ul');
            ul.style.caretColor = '#F00';
            new BuilderTest(new TagBuilder('ul').caret("#F00")).toEqualNode(ul);
        })

        it('should set classes', function () {
            const ul = createDocElement('ul');
            ul.classList.add('foo');
            ul.classList.add('btn');
            ul.classList.add('btn-lg');
            ul.classList.add('btn-primary');

            const builderUL = new TagBuilder('ul').classes('foo', 'btn', 'btn-lg', 'btn-primary').build();

            expect(builderUL.classList).toEqual(ul.classList);
        })

        it('should set height', function () {
            const ul = createDocElement('ul');
            ul.style.height = '100px';
            new BuilderTest(new TagBuilder('ul').height("100px")).toEqualNode(ul);
        })

        describe('margins', function () {
            it('should not set margin due to 0 values', function() {
                new BuilderTest(new TagBuilder('ul').margin()).toBe('<ul draggable="false"></ul>');
            })
            it('should not set margin due to too many values', function() {
                new BuilderTest(new TagBuilder('ul').margin('10px', '20px', '30px', '55px', '60px')).toBe('<ul draggable="false"></ul>');
            })
            it('should set margin using shorthand [all]', function() {
                const ul = createDocElement('ul');
                ul.style.marginLeft = '5px';
                ul.style.marginRight = '5px';
                ul.style.marginTop = '5px';
                ul.style.marginBottom = '5px';
                new BuilderTest(new TagBuilder('ul').margin('5px')).toEqualNode(ul);
            })
            it('should set margin using shorthand [horizontal | vertical]', function() {
                const ul = createDocElement('ul');
                ul.style.marginLeft = '10px';
                ul.style.marginRight = '10px';
                ul.style.marginTop = '5px';
                ul.style.marginBottom = '5px';
                new BuilderTest(new TagBuilder('ul').margin('5px', '10px')).toEqualNode(ul);
            })
            it('should set margin using shorthand [top | horizontal | bottom]', function() {
                const ul = createDocElement('ul');
                ul.style.marginLeft = '10px';
                ul.style.marginRight = '10px';
                ul.style.marginTop = '5px';
                ul.style.marginBottom = '8px';
                new BuilderTest(new TagBuilder('ul').margin('5px', '10px', '8px')).toEqualNode(ul);
            })
        })

        describe('origins', function () {
            it('should set origins [left]', function() {
                const ul = createDocElement('ul');
                ul.style.left = '-5px';
                new BuilderTest(new TagBuilder('ul').origin(null, null, null, '-5px')).toEqualNode(ul);
            })
            it('should set origins [right]', function() {
                const ul = createDocElement('ul');
                ul.style.right = '-5px';
                new BuilderTest(new TagBuilder('ul').origin(null, '-5px')).toEqualNode(ul);
            })
            it('should set origins [top]', function() {
                const ul = createDocElement('ul');
                ul.style.top = '-5px';
                new BuilderTest(new TagBuilder('ul').origin('-5px')).toEqualNode(ul);
            })
            it('should set origins [bottom]', function() {
                const ul = createDocElement('ul');
                ul.style.bottom = '-5px';
                new BuilderTest(new TagBuilder('ul').origin(null, null, '-5px')).toEqualNode(ul);
            })
            it('should set origins [all]', function() {
                const ul = createDocElement('ul');
                ul.style.left = '-5px';
                ul.style.right = '-5px';
                ul.style.bottom = '-5px';
                ul.style.top = '-5px';
                new BuilderTest(new TagBuilder('ul').origin('-5px', '-5px', '-5px', '-5px')).toEqualNode(ul);
            })
        })

        describe('padding', function () {
            it('should not set padding due to 0 values', function () {
                new BuilderTest(new TagBuilder('ul').padding()).toBe('<ul draggable="false"></ul>');
            })
            it('should not set padding due to too many values', function () {
                new BuilderTest(new TagBuilder('ul').padding('10px', '20px', '30px', '55px', '60px')).toBe('<ul draggable="false"></ul>');
            })
            it('should set padding using shorthand [all]', function () {
                const ul = createDocElement('ul');
                ul.style.paddingLeft = '5px';
                ul.style.paddingRight = '5px';
                ul.style.paddingTop = '5px';
                ul.style.paddingBottom = '5px';
                new BuilderTest(new TagBuilder('ul').padding('5px')).toEqualNode(ul);
            })
            it('should set padding using shorthand [horizontal | vertical]', function () {
                const ul = createDocElement('ul');
                ul.style.paddingLeft = '10px';
                ul.style.paddingRight = '10px';
                ul.style.paddingTop = '5px';
                ul.style.paddingBottom = '5px';
                new BuilderTest(new TagBuilder('ul').padding('5px', '10px')).toEqualNode(ul);
            })
            it('should set padding using shorthand [top | horizontal | bottom]', function () {
                const ul = createDocElement('ul');
                ul.style.paddingLeft = '10px';
                ul.style.paddingRight = '10px';
                ul.style.paddingTop = '5px';
                ul.style.paddingBottom = '8px';
                new BuilderTest(new TagBuilder('ul').padding('5px', '10px', '8px')).toEqualNode(ul);
            })
        })

        describe('positions', function () {
            const pos = ['relative', 'absolute', 'static', 'fixed', 'sticky'];
            pos.forEach(e => {
                it(`should set position '${e}'`, function () {
                    const ul = createDocElement('ul');
                    ul.style.position = e;
                    new BuilderTest(new TagBuilder('ul').position(e)).toEqualNode(ul);
                })
            })
        })

        describe('styles', function () {
            it('should ignore undefined/null property', function() {
                const ul = createDocElement('ul');
                const p = undefined;
                const style = {};
                style[p] = '20px';
                new BuilderTest(new TagBuilder('ul').style(style)).toEqualNode(ul);
            })
            it('should ignore unknown property', function() {
                const ul = createDocElement('ul');
                new BuilderTest(new TagBuilder('ul').style({ 'foobar' : '20px'})).toEqualNode(ul);
            })
            it('should ignore unknown value for valid property', function() {
                const ul = createDocElement('ul');
                new BuilderTest(new TagBuilder('ul').style({ 'padding-left' : 'sticky'})).toEqualNode(ul);
            })
            it('should ignore undefined/null property value', function () {
                const ul = createDocElement('ul');
                const p = 'padding';
                const style = {};
                style[p] = null;
                new BuilderTest(new TagBuilder('ul').style(style)).toEqualNode(ul);
            })
        })

        describe('textcase', function () {
            const cases = ['uppercase', 'lowercase', 'none', 'capitalize', 'inherit'];
            cases.forEach(tcase => {
                it(`should set to '${tcase}'`, function () {
                    const ul = createDocElement('ul');
                    ul.style.textTransform = tcase;
                    new BuilderTest(new TagBuilder('ul').textcase(tcase)).toEqualNode(ul);
                })
            })
        })

        describe('visibility', function () {
            const opts = ['visible', 'hidden', 'collapse'];
            opts.forEach(opt => {
                it(`should set '${opt}'`, function() {
                    const ul = createDocElement('ul');
                    ul.style.visibility = opt;
                    new BuilderTest(new TagBuilder('ul').visibility(opt)).toEqualNode(ul);
                })
            })
        })

        it('should set width', function () {
            const ul = createDocElement('ul');
            ul.style.width = '155px';
            new BuilderTest(new TagBuilder('ul').width("155px")).toEqualNode(ul);
        })
    })

    describe('accessibility', function () {
        it('should coerce element to be for screen readers only', function () {
            const ul = createDocElement('ul');
            ul.style.border = '0px none';
            ul.style.clip = 'rect(0px 0px 0px 0px)';
            ul.style.height = '1px';
            ul.style.margin = '-1px';
            ul.style.overflow = 'hidden';
            ul.style.padding = '0px';
            ul.style.position = 'absolute';
            ul.style.width = '1px';
            new BuilderTest(new TagBuilder('ul').screenReaderOnly()).toEqualNode(ul);
        })
    })

})