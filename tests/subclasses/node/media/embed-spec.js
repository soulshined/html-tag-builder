describe('Embed Builder', function () {

    it('should build', function () {
        const embed = createDocElement('embed');
        embed.src = "#example";
        embed.type = 'image/png';
        new BuilderTest(new EmbedBuilder("#example", 'image/png')).toEqualNode(embed);
    })

})