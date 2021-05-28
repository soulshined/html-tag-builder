describe('List Builder', function () {

    it('should build ul', function () {
        const ul = createDocElement('ul');
        ul.appendChild(createDocElement('li'));
        ul.appendChild(createDocElement('li'));
        ul.appendChild(createDocElement('li'));
        new BuilderTest(new ListBuilder().addItems(['', '', null])).toEqualNode(ul);
    })

    it('should build ol', function () {
        const ol = createDocElement('ol');
        ol.appendChild(createDocElement('li'));
        ol.appendChild(createDocElement('li'));
        ol.appendChild(createDocElement('li'));
        new BuilderTest(new ListBuilder(true)
            .addItem(new ListItemBuilder())
            .addItem(new ListItemBuilder(null))
            .addItem('')).toEqualNode(ol);
    })

    it('should build using all methods', function () {
        const ul = createDocElement('ul');
        ul.style.listStyle = 'square';
        const li = createDocElement('li');
        li.innerHTML = 'foobar';
        const li2 = createDocElement('li');
        li2.innerHTML = 'foobar 2';
        li2.classList.add('bone');
        const li3 = createDocElement('li');
        li3.innerHTML = 'foobar 3 ';
        const li4 = createDocElement('li');
        li4.innerHTML = 'foobar4';

        ul.append(li, li2, li3, li4);

        const sublist = createDocElement('li');
        sublist.appendChild(ul.cloneNode(true));
        ul.appendChild(sublist);

        new BuilderTest(
            new ListBuilder(false, 'square')
                .addItem('foobar')
                .addItem(new ListItemBuilder('foobar 2').classes('bone'))
                .addItems(['foobar 3 ', new ListItemBuilder('foobar4')])
                .addSublist(new ListBuilder(false, 'square')
                    .addItem('foobar')
                    .addItem(new ListItemBuilder('foobar 2').classes('bone'))
                    .addItems(['foobar 3 ', new ListItemBuilder('foobar4')]))
        ).toEqualNode(ul);
    })

})