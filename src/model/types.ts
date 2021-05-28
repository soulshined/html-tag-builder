type html = string;
type classes = string[];

//HTML Helpers
type referrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
type crossOrigin = 'anonymous' | 'use-credentials' | '';
type formEnctype = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

interface HeadlessNodeBuilder {
    //region attributes
    attr: (key: string, value: any) => HeadlessNodeBuilder;
    //endregion attrs

    //region relationships
    append: (...child: html[]) => HeadlessNodeBuilder;
    prepend: (...child: html[]) => HeadlessNodeBuilder;
    insertAdjacent: (sibling: html, placement: 'before' | 'after') => HeadlessNodeBuilder;
    //endregion relationships

    innerHTML: (html: html) => HeadlessNodeBuilder;

    //styling
    classes: (classes: classes) => HeadlessNodeBuilder;
    style: (property: string, value: any) => HeadlessNodeBuilder;
    //styling

    //region model
    tagName: () => string;
    tagId: () => string;
    clone: () => HeadlessNodeBuilder;
    build: () => html;
}