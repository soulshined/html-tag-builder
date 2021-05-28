describe('Headless Video Builder', function () {

    it('should clone', function () {
        const aBuilder = new VideoBuilder('#somevideo.mp4', 'video/mp4')
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
        const video = createHDocElement('video', {
            attrs: new Map([
                ['type', 'video/mp4'],
                ['src', '#somevideo.mp4'],
                ['controls', true]
            ])
        });
        new HeadlessTest(new VideoBuilder('#somevideo.mp4', 'video/mp4')).toBe(video);
    })

    it('should build using all methods', function () {
        const video = createHDocElement('video', {
            attrs: new Map([
                ['type', 'video/mp4'],
                ['src', '#somevideo.mp4'],
                ['controls', false],
                ['loop', true],
                ['muted', true],
                ['poster', 'image.png'],
                ['preload', 'auto']
            ]),
            innerHTML: createHDocElement('track', {
                attrs: new Map([
                    ['kind', 'subtitles'],
                    ['srclang', 'en'],
                    ['src', 'captions.vtt'],
                    ['label', 'my label'],
                    ['default', true]
                ])
            })
            + "Video is not supported on your device"
        });

        new HeadlessTest(
            new VideoBuilder('#somevideo.mp4', 'video/mp4')
                .loop()
                .muted()
                .onNotSupported('Video is not supported on your device')
                .noControls()
                .poster('image.png')
                .preload('auto')
                .track('captions.vtt', 'subtitles', true, 'en', 'my label')
        ).toBe(video);
    })

})