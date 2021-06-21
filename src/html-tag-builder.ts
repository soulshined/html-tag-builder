/// <reference path="./utils/elements.ts" />
/// <reference path="./utils/objects.ts" />
/// <reference path="./utils/maps.ts" />
/// <reference path="./model/builders/tag.ts" />
/// <reference path="./model/options.ts" />
/// <reference path="./model/builders/containers/blockquote.ts" />
/// <reference path="./model/builders/containers/fieldset.ts" />
/// <reference path="./model/builders/containers/figure.ts" />
/// <reference path="./model/builders/inline/anchor.ts" />
/// <reference path="./model/builders/inline/area.ts" />
/// <reference path="./model/builders/inline/data.ts" />
/// <reference path="./model/builders/inline/span.ts" />
/// <reference path="./model/builders/input/input.ts" />
/// <reference path="./model/builders/input/number.ts" />
/// <reference path="./model/builders/input/checkbox.ts" />
/// <reference path="./model/builders/input/date.ts" />
/// <reference path="./model/builders/input/file.ts" />
/// <reference path="./model/builders/input/img.ts" />
/// <reference path="./model/builders/input/text.ts" />
/// <reference path="./model/builders/input/textarea.ts" />
/// <reference path="./model/builders/lists/data.ts" />
/// <reference path="./model/builders/lists/description.ts" />
/// <reference path="./model/builders/lists/details.ts" />
/// <reference path="./model/builders/lists/select.ts" />
/// <reference path="./model/builders/lists/ul-ol.ts" />
/// <reference path="./model/builders/media/audio.ts" />
/// <reference path="./model/builders/media/embed.ts" />
/// <reference path="./model/builders/media/iframe.ts" />
/// <reference path="./model/builders/media/img.ts" />
/// <reference path="./model/builders/media/picture.ts" />
/// <reference path="./model/builders/media/source.ts" />
/// <reference path="./model/builders/media/video.ts" />
/// <reference path="./model/builders/scalar/meter.ts" />
/// <reference path="./model/builders/scalar/progress.ts" />
/// <reference path="./model/builders/form.ts" />
/// <reference path="./model/builders/script.ts" />
/// <reference path="./model/builders/table.ts" />
/// <reference path="./model/builders/template.ts" />
/// <reference path="./model/builders/svg/svg.ts" />
/// <reference path="./model/builders/svg/element.ts" />

// @ts-ignore
if (typeof module !== "undefined" && module.exports) {
    // @ts-ignore
    module.exports = {
        TagBuilder,
        TagBuilderOptions,
        Objects,

        BlockquoteBuilder,
        FieldsetBuilder,
        FigureBuilder,

        AnchorBuilder,
        DownloadLinkBuilder,
        AreaBuilder,
        DownloadAreaBuilder,
        DataBuilder,
        SpanBuilder,

        InputBuilder,
        NumberInputBuilder,
        CheckboxInputBuilder,
        RadioInputBuilder,
        RangeInputBuilder,
        DateInputBuilder,
        DateTimeLocalInputBuilder,
        MonthInputBuilder,
        TimeInputBuilder,
        WeekInputBuilder,

        FileInputBuilder,
        ImageInputBuilder,
        TextInputBuilder,
        EmailInputBuilder,
        PasswordInputBuilder,
        SearchInputBuilder,
        TelInputBuilder,
        UrlInputBuilder,
        TextAreaBuilder,

        DataListBuilder,
        DLBuilder,
        DetailsBuilder,
        OptionBuilder,
        SelectBuilder,
        ListItemBuilder,
        ListBuilder,

        SourceBuilder,
        AudioBuilder,
        EmbedBuilder,
        IframeBuilder,
        ImageBuilder,
        PictureBuilder,
        VideoBuilder,

        MeterBuilder,
        ProgressBuilder,

        FormBuilder,
        ScriptBuilder,
        ColGroupBuilder,
        TableBuilder,

        SlotBuilder,
        TemplateBuilder,

        SVGBuilder,
        SVGElementBuilder
    };
}