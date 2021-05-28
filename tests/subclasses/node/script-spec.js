describe('Script Builder', function () {

    it('should build', function () {
        const script = createDocElement('script');
        script.async = true;
        new BuilderTest(new ScriptBuilder()).toEqualNode(script);
    })

    it('should build using all methods', function () {
        const script = createDocElement('script');
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.defer = true;
        script.integrity = 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC';
        script.nonce = '1234567890123456789012450987612345';
        script.noModule = true;
        script.referrerPolicy = 'no-referrer';

        new BuilderTest(
            new ScriptBuilder()
                .async()
                .crossOrigin('anonymous')
                .defer()
                .integrity('sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC')
                .noModule()
                .nonce('1234567890123456789012450987612345')
                .referrerPolicy('no-referrer')
        ).toEqualNode(script);
    })

})