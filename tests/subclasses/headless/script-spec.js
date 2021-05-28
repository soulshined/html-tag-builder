describe('Headless Script Builder', function () {

    it('should build', function () {
        const script = createHDocElement('script', {
            attrs: new Map([
                ['async', 'true']
            ])
        });
        new HeadlessTest(new ScriptBuilder()).toBe(script);
    })

    it('should build using all methods', function () {
        const script = createHDocElement('script', {
            attrs: new Map([
                ['async', 'true'],
                ['crossorigin', 'anonymous'],
                ['defer', 'true'],
                ['integrity', 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC'],
                ['nomodule', 'true'],
                ['nonce', '1234567890123456789012450987612345'],
                ['referrerpolicy', 'no-referrer']
            ])
        });

        new HeadlessTest(
            new ScriptBuilder()
                .async()
                .crossOrigin('anonymous')
                .defer()
                .integrity('sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC')
                .noModule()
                .nonce('1234567890123456789012450987612345')
                .referrerPolicy('no-referrer')
        ).toBe(script);
    })

})