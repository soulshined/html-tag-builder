describe('Audio Builder', function () {

    it('should clone', function () {
        const aBuilder = new AudioBuilder('#someaudio.mp3')
            .loop()
            .noControls()
            .preload('auto');
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.hidden();
        console.log('A Node', aBuilder.build().outerHTML);
        console.log('B Node', bBuilder.build().outerHTML);
        console.log('C Node', cBuilder.build().outerHTML);
        expect(aBuilder.build()).toEqual(bBuilder.build());
        expect(cBuilder.build()).not.toEqual(bBuilder.build());
    })

    it('should build', function () {
        const audio = createDocElement('audio');
        audio.src = "#someaudio.mp3";
        audio.controls = true;
        new BuilderTest(new AudioBuilder('#someaudio.mp3')).toEqualNode(audio);
    })

    it('should build using all methods', function () {
        const audio = createDocElement('audio');
        audio.src = "#someaudio.mp3";
        audio.loop = true;
        audio.muted = true;
        audio.controls = false;
        audio.preload = 'auto';
        audio.innerHTML += 'Audio is not supported on your device';

        new BuilderTest(
            new AudioBuilder('#someaudio.mp3')
                .loop()
                .muted()
                .onNotSupported('Audio is not supported on your device')
                .noControls()
                .preload('auto')
        ).toEqualNode(audio);
    })

})