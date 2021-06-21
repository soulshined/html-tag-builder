function getTableTemplate(caption = undefined) {
    const table = createDocElement('table');
    table.createTHead();
    table.createTBody();

    if (caption !== undefined && caption !== null) {
        const capt = table.createCaption();
        capt.innerHTML = caption;
        table.caption = capt;
    }

    return table;
}

describe('Table Builder', function () {

    describe('Col Group Builder', function () {
        it('should subclass', function () {
            const group = createDocElement('colgroup')
            const aCol = createDocElement('col');
            const bCol = createDocElement('col');
            bCol.setAttribute('span', 2);
            const cCol = createDocElement('col');
            cCol.setAttribute('span', 1);
            cCol.classList.add('bigger');
            cCol.classList.add('bolder');
            group.append(aCol, bCol, cCol);

            new BuilderTest(
                new ColGroupBuilder()
                    .addCol()
                    .addCol("2")
                    .addCol("1", 'bigger', 'bolder')
            ).toEqualNode(group);
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
            console.log('A Node', aBuilder.build().outerHTML);
            console.log('B Node', bBuilder.build().outerHTML);
            console.log('C Node', cBuilder.build().outerHTML);
            expect(aBuilder.build()).toEqual(bBuilder.build());
            expect(cBuilder.build()).not.toEqual(bBuilder.build());
        })

        it('should build', function() {
            const table = getTableTemplate();
            new BuilderTest(new TableBuilder()).toBe(table);
        })

        it('with caption', function () {
            const table = getTableTemplate('Foobar Foobaz');
            new BuilderTest(new TableBuilder('Foobar Foobaz'))
                .toEqualNode(table);
        })

        it('should add headers', function() {
            const table = getTableTemplate();
            const tr = createDocElement('tr');
            tr.appendChild(createDocElement('th', { innerHTML: 'Name' }));
            tr.appendChild(createDocElement('th', { innerHTML: 'Age' }));
            tr.appendChild(createDocElement('th', { innerHTML: 'Twist' }));
            tr.appendChild(createDocElement('th', { innerHTML: 'Total' }));
            table.tHead.append(tr);
            const bTR = tr.cloneNode();
            bTR.appendChild(createDocElement('td', { innerHTML: 'bbb' }));
            table.tBodies.item(0).append(bTR);

            new BuilderTest(new TableBuilder()
                .addHeader('Name', 'Age', 'Twist')
                .addRow('bbb')
                .addHeader('Total')
            ).toBe(table);
        })

        it('should set headers/rows to empty', function () {
            const table = getTableTemplate();
            table.hidden = true;

            new BuilderTest(new TableBuilder()
                .addHeader('Name', 'Age', 'Twist')
                .addRow('bbb')
                .setRows()
                .setHeaders()
                .hidden()
            ).toEqualNode(table);
        })

        it('should set headers/rows', function () {
            const table = getTableTemplate();
            const tr = createDocElement('tr');
            tr.appendChild(createDocElement('th', { innerHTML: 'Total' }));
            table.tHead.append(tr);
            const bTR = tr.cloneNode();
            bTR.appendChild(createDocElement('td', { innerHTML: 'aaa' }));
            table.tBodies.item(0).append(bTR);

            new BuilderTest(new TableBuilder()
                .addHeader('Name', 'Age', 'Twist')
                .addRow('bbb')
                .setHeaders()
                .addHeader('Total')
                .setRows(['aaa'])
            ).toBe(table);
        })

    })

})