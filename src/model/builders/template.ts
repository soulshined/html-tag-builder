class SlotBuilder extends TagBuilder<HTMLSlotElement> {
    constructor(name: string, content: html | TagBuilder<HTMLElement>, id?: string) {
        super('slot', id);
        Objects.requireNonNull(content, 'content in SlotBuilder');
        name = Objects.requireNonNull(name, 'name in SlotBuilder');
        if (this.isHeadlessMode) this.hNode.attr('name', name);
        else this.node.name = name;
        this.append(content);
    }
}

class TemplateBuilder extends TagBuilder<HTMLTemplateElement> {
    private styleBuilder: TagBuilder<HTMLStyleElement> = null;

    constructor(id: string) {
        super('template', id);
        Objects.requireNonNull(id, 'id in Template Builder');
    }

    addStylesToRoot(cssText: string) {
        if (!Objects.isDefined(cssText)) return this;

        if (this.styleBuilder !== null) this.styleBuilder.append(cssText);
        else this.styleBuilder = new TagBuilder<HTMLStyleElement>('style').innerText(cssText);
        return this;
    }

    addSlots(...slot: SlotBuilder[]) {
        if (!Objects.isDefined(slot) || slot.length === 0) return this;

        this.append(...slot);
        return this;
    }

    clone() {
        const builder = new TemplateBuilder(this.tagId);
        builder.isCached = this.isCached;
        if (this.styleBuilder !== null)
            builder.styleBuilder = this.styleBuilder.clone();
        if (this.isHeadlessMode) builder.hNode = this.hNode.clone();
        else builder.node = this.node.cloneNode(true) as HTMLTemplateElement;
        return builder;
    }

    buildHTML() {
        if (this.isCached) return this.hNode.build();

        this.isCached = true;
        this.prepend(this.styleBuilder);
        return this.isHeadlessMode ? this.hNode.build() : this.build().outerHTML;
    }

    build() {
        if (this.isCached) return this.node;

        this.isCached = true;
        this.prepend(this.styleBuilder);
        return this.node;
    }
}