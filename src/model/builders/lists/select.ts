class OptionBuilder extends TagBuilder<HTMLOptionElement> {
    constructor(content: html, value?: string, id?: string) {
        super('option', id);
        this.innerHTML(content);
        if (!Objects.isDefined(value) && TagBuilderOptions.useOptionContentForEmptyOptionValue)
            this.attr('value', content.trim().toLowerCase().replace(/\s+/g, '-'));
        else
            this.attr('value', Objects.ofNullable(value, ''));
    }
}

class SelectBuilder extends TagBuilder<HTMLSelectElement> {

    constructor(instructionMessage?: string, id?: string) {
        super('select', id);
        if (this.isHeadlessMode) {
            this.attr('spellcheck', false);
            this.attr('required', false);
        }
        else {
            this.node.spellcheck = false;
            this.node.required = false;
        }
        if (Objects.isDefined(instructionMessage))
            this.append(new OptionBuilder(instructionMessage, "").attr('disabled', ''));
    }

    addOptionGroup(label: string, ...option: OptionBuilder[]) {
        Objects.requireNonNull(label, 'label in SelectBuilder');
        this.append(new TagBuilder('optgroup').attr('label', label).append(...option));
        return this;
    }

    addOption(content: html, value: string, classes: classes) {
        this.addOptions([new OptionBuilder(content, value).classes(...classes)]);
        return this;
    }

    addOptions(options: (html | OptionBuilder)[]) {
        options.forEach(e => {
            if (e instanceof OptionBuilder)
                this.append(e)
            else this.append(new OptionBuilder(e))
        });
        return this;
    }

    autocomplete(value: string) {
        if (this.isHeadlessMode) this.attr('autocomplete', value);
        else this.node.autocomplete = value;
        return this;
    }

    autofocus() {
        if (this.isHeadlessMode) this.attr('autofocus', true);
        else this.node.autofocus = true;
        return this;
    }

    disabled() {
        if (this.isHeadlessMode) this.attr('disabled', true);
        else this.node.disabled = true;
        return this;
    }

    multiple() {
        if (this.isHeadlessMode) this.attr('multiple', true);
        else this.node.multiple = true;
        return this;
    }

    name(value: string) {
        if (this.isHeadlessMode) this.attr('name', value);
        else this.node.name = value;
        return this;
    }

    onInvalid(value: string) {
        if (this.isHeadlessMode) this.attr('oninvalid', `this.setCustomValidity('${value}');`);
        else this.node.setCustomValidity(value);
        return this;
    }

    required() {
        if (this.isHeadlessMode) this.attr('required', true);
        else this.node.required = true;
        return this;
    }

    size(value: number) {
        if (this.isHeadlessMode) this.attr('size', value);
        else this.node.size = value;
        return this;
    }

}