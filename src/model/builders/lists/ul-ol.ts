class ListItemBuilder extends TagBuilder<HTMLLIElement> {
    constructor(html: html, id?: string) {
        super('li', id);
        this.innerHTML(Objects.ofNullable(html, ''));
    }
}

class ListBuilder extends TagBuilder<HTMLUListElement> {

    constructor(isOrdered: boolean = false, style: string = 'none', id?: string) {
        super(isOrdered ? 'ol' : 'ul', id);
        if (Objects.isDefined(style) && style.toLowerCase() !== 'none')
            this.style({ 'list-style': style });
    }

    addItem(item: html | ListItemBuilder) {
        if (item instanceof ListItemBuilder)
            this.append(item);
        else this.append(new ListItemBuilder(item))
        return this;
    }

    addItems(items: (html | ListItemBuilder)[]) {
        items.forEach(e => this.addItem(e));
        return this;
    }

    addSublist(listBuilder: ListBuilder) {
        this.append(new TagBuilder('li').append(listBuilder));
        return this;
    }

}