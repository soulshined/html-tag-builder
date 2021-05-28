class FieldsetBuilder extends TagBuilder<HTMLFieldSetElement> {
    constructor(legend?: string, id?: string) {
        super('fieldset', id);
        if (!Objects.isEmptyOrWhitespace(legend))
            this.append(new TagBuilder('legend').innerText(legend));
    }
}