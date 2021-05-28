describe('Headless Embed Builder', function () {

    it('should build', function () {
        const embed = createHDocElement('embed', {
            attrs: new Map([
                ['src', '#example'],
                ['type', 'image/png']
            ])
        });
        new HeadlessTest(new EmbedBuilder("#example", 'image/png')).toBe(embed);
    })

})