describe('Headless Audio Builder', function () {

    it('should clone', function () {
        const aBuilder = new AudioBuilder('#someaudio.mp3')
            .loop()
            .noControls()
            .preload('auto');
        const bBuilder = aBuilder.clone();
        const cBuilder = bBuilder.clone();
        cBuilder.hidden();
        console.log('A Node', aBuilder.buildHTML());
        console.log('B Node', bBuilder.buildHTML());
        console.log('C Node', cBuilder.buildHTML());
        expect(aBuilder.buildHTML()).toEqual(bBuilder.buildHTML());
        expect(cBuilder.buildHTML()).not.toEqual(bBuilder.buildHTML());
    })

    it('should build', function () {
        const audio = createHDocElement('audio', {
            attrs: new Map([
                ['src', '#someaudio.mp3'],
                ['controls', true]
            ])
        });
        new HeadlessTest(new AudioBuilder('#someaudio.mp3')).toBe(audio);
    })

    it('should build using all methods', function () {
        const audio = createHDocElement('audio', {
            attrs: new Map([
                ['src', '#someaudio.mp3'],
                ['controls', false],
                ['loop', true],
                ['muted', true],
                ['preload', 'auto']
            ]),
            innerHTML: 'Audio is not supported on your device'
        });

        new HeadlessTest(
            new AudioBuilder('#someaudio.mp3')
                .loop()
                .muted()
                .onNotSupported('Audio is not supported on your device')
                .noControls()
                .preload('auto')
        ).toBe(audio);
    })

})