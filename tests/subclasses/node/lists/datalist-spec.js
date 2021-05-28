describe('Datalist Builder', function () {

    it('should build', function () {
        const datalist = createDocElement('datalist');
        datalist.id = 'myid';
        new BuilderTest(new DataListBuilder('myid')).toEqualNode(datalist);
    })

    it('should build using all methods', function () {
        const datalist = createDocElement('datalist');
        datalist.id = 'myid';
        datalist.autofocus = true;
        const opt = createDocElement('option', { innerHTML: 'abc', value: 'abc' });
        opt.classList.add('someclass');
        datalist.append(
            createDocElement('option', { innerHTML: 'abc', value: 'abc'}),
            createDocElement('option', { innerHTML: '123', value: '123'}),
            createDocElement('option', { innerHTML: 'foobar doobar toobar', value: 'foobar-doobar-toobar'}),
            opt,
        )

        new BuilderTest(new DataListBuilder('myid')
            .addOption('abc')
            .addOptions(
                new OptionBuilder('123'),
                'foobar doobar toobar',
                new OptionBuilder('abc').classes('someclass')
            )
        ).toEqualNode(datalist);
    })

})