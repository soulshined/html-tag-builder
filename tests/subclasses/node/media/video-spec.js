describe('Video Builder', function () {

    it('should clone', function () {
        const aBuilder = new VideoBuilder('#somevideo.mp4', 'video/mp4')
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
        const video = createDocElement('video');
        video.src = "#somevideo.mp4";
        video.setAttribute('type', 'video/mp4');
        video.controls = true;
        new BuilderTest(new VideoBuilder('#somevideo.mp4', 'video/mp4')).toEqualNode(video);
    })

    it('should build using all methods', function () {
        const video = createDocElement('video');
        video.src = "#somevideo.mp4";
        video.setAttribute('type', 'video/mp4');
        video.loop = true;
        video.muted = true;
        video.controls = false;
        video.poster = 'image.png';
        video.preload = 'auto';
        const subtitelsTrack = createDocElement('track');
        subtitelsTrack.setAttribute('kind', 'subtitles');
        subtitelsTrack.setAttribute('srclang', 'en');
        subtitelsTrack.setAttribute('src', 'captions.vtt');
        subtitelsTrack.setAttribute('label', 'my label');
        subtitelsTrack.setAttribute('default', true);
        video.appendChild(subtitelsTrack);
        video.innerHTML += 'Video is not supported on your device';

        new BuilderTest(
            new VideoBuilder('#somevideo.mp4', 'video/mp4')
                .loop()
                .muted()
                .onNotSupported('Video is not supported on your device')
                .noControls()
                .poster('image.png')
                .preload('auto')
                .track('captions.vtt', 'subtitles', true, 'en', 'my label')
        ).toEqualNode(video);
    })

})