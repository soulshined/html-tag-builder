function getTableTemplate(caption = undefined) {
    const capt = caption ? `<caption draggable="false">${caption}</caption>`: '';

    return {
        build: (thead = '', tbody = '') => {
            return `<table draggable="false">${capt}<thead draggable="false">${thead.length > 0 ? thead : '<tr draggable="false"></tr>'}</thead><tbody draggable="false">${tbody}</tbody></table>`;
        }
    };
}

describe('Headless Table Builder', function () {

    describe('Col Group Builder', function () {
        it('should subclass', function () {
            const group = createHDocElement('colgroup', {
                innerHTML: createHDocElement('col') +
                    createHDocElement('col', {
                        attrs: new Map([
                            ['span', 2]
                        ])
                    }) +
                    createHDocElement('col', {
                        attrs: new Map([
                            ['class', 'bigger bolder'],
                            ['span', 1]
                        ])
                    })
            })

            new HeadlessTest(
                new ColGroupBuilder()
                    .addCol()
                    .addCol("2")
                    .addCol("1", 'bigger', 'bolder')
            ).toBe(group);
        })
    })

    describe('Table', function () {

        it('should clone', function () {
            const aBuilder = new TableBuilder('foobar foobaz')
                .collapse()
                .colgroup(new ColGroupBuilder().addCol().addCol("2", 'bigger'));
            const bBuilder = aBuilder.clone();
            const cBuilder = bBuilder.clone();
            cBuilder.hidden();
            console.log('A Node', aBuilder.buildHTML());
            console.log('B Node', bBuilder.buildHTML());
            console.log('C Node', cBuilder.buildHTML());
            expect(aBuilder.buildHTML()).toEqual(bBuilder.buildHTML());
            expect(cBuilder.buildHTML()).not.toEqual(bBuilder.buildHTML());
        })

        it('should build', function() {
            new HeadlessTest(new TableBuilder()).toBe(getTableTemplate().build());
        })

        it('with caption', function () {
            new HeadlessTest(new TableBuilder('Foobar Foobaz'))
                .toBe(getTableTemplate('Foobar Foobaz').build());
        })

        it('should add headers', function() {
            const tr = createHDocElement('tr', {
                innerHTML: createHDocElement('th', { innerHTML: 'Name' }) +
                    createHDocElement('th', { innerHTML: 'Age' }) +
                    createHDocElement('th', { innerHTML: 'Twist' }) +
                    createHDocElement('th', { innerHTML: 'Total' })
            });
            const bTR = createHDocElement('tr', {
                innerHTML: createHDocElement('td', { innerHTML: 'bbb' })
            });;

            new HeadlessTest(new TableBuilder()
                .addHeader('Name', 'Age', 'Twist')
                .addRow('bbb')
                .addHeader('Total')
            ).toBe(getTableTemplate().build(tr, bTR));
        })

        it('should set headers/rows to empty', function () {
            const table = createHDocElement('table', {
                attrs: new Map([
                    ['hidden', 'true']
                ]),
                innerHTML: `<thead draggable="false"><tr draggable="false"></tr></thead><tbody draggable="false"></tbody>`
            });

            new HeadlessTest(new TableBuilder()
                .addHeader('Name', 'Age', 'Twist')
                .addRow('bbb')
                .setRows()
                .setHeaders()
                .hidden()
            ).toBe(table);
        })

        it('should set headers/rows', function () {
            const thead = createHDocElement('tr', {
                innerHTML: createHDocElement('th', { innerHTML: 'Total' })
            });
            const tbody = createHDocElement('tr', {
                innerHTML: createHDocElement('td', { innerHTML: 'aaa' })
            });

            new HeadlessTest(new TableBuilder()
                .addHeader('Name', 'Age', 'Twist')
                .addRow('bbb')
                .setRows()
                .setHeaders()
                .addHeader('Total')
                .setRows(['aaa'])
            ).toBe(getTableTemplate().build(thead, tbody));
        })

    })

})