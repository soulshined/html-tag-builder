declare module "html-tag-builder" {

    export type classes = string[];
    export type html = string;
    export type formEnctype = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
    export type referrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    export type crossOrigin = 'anonymous' | 'use-credentials' | '';

    export abstract class AbstractTagBuilder<T extends HTMLElement | SVGElement> {
        /**
         * @param tagName Name of element
         * @param id of element
         * @param xmlns namespace to use, if one is provided it will use document.createElementNS, otherwise it defaults to browser default
         */
        constructor(tagName: string, id?: string, xmlns?: string);
        //region attributes
        /**
         *
         * @param key the target attribute key
         * @param value the value of the attribute. This value will always be cast to a string
         */
        attr(key: string, value: any): AbstractTagBuilder<T>;
        /**
         * Assigns a slot in a shadow DOM shadow tree to an element: An element with a slot attribute is assigned to the slot created by the <slot> element whose name attribute's value matches that slot attribute's value.
         * @param value
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot)
         */
        slot(value: string): AbstractTagBuilder<T>;
        /**
         * An integer attribute indicating if the element can take input focus (is focusable), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:
         * - a negative value means that the element should be focusable, but should not be reachable via sequential keyboard navigation
         * - 0 means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention
         * - a positive value means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the tabindex. If several elements share the same tabindex, their relative order follows their relative positions in the document.
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
         */
        tabindex(index: number): AbstractTagBuilder<T>;
        //endregion attrs

        //region relationships
        /**
         * Inserts a set of Node objects or DOMString objects after the last child of the Element. DOMString objects are inserted as equivalent Text nodes.
         * @see [https://developer.mozilla.org/en-US/docs/Web/API/Element/append](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)
         */
        append(...child: (html | AbstractTagBuilder<HTMLElement | SVGElement>)[]): AbstractTagBuilder<T>;
        /**
         * Inserts a set of Node objects or DOMString objects before the first child of the Element. DOMString objects are inserted as equivalent Text nodes.
         * @see [https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend](https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend)
         */
        prepend(...child: (html | AbstractTagBuilder<HTMLElement | SVGElement>)[]): AbstractTagBuilder<T>;
        /**
         * This is only guaranteed to work in `headless` mode
         * @param sibling element to insert
         * @param [default = 'after'] placement place before preceding element begins or after it ends
         */
        insertAdjacent(sibling: AbstractTagBuilder<HTMLElement | SVGElement>, placement: 'after' | 'before'): AbstractTagBuilder<T>;
        //endregion relationships

        //region content
        /**
         * Sets the HTML or XML markup contained within the element
         * @param html A DOMString containing the HTML serialization of the element's descendants. Setting the value of innerHTML removes all of the element's descendants and replaces them with nodes constructed by parsing the HTML given in the string html.
         *
         * Note; this does not append HTML, it sets the HTMl, to append elements/html use `.append()`
         * @see [https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
         */
        innerHTML(html: html): AbstractTagBuilder<T>;
        //endregion content

        //styling

        public abstract bounds(width: string | number, height: string | number): AbstractTagBuilder<T>;
        /**
         * Add classes to the element
         * @param aClass one class name per index
         */
        classes(...aClass: classes): AbstractTagBuilder<T>;

        public abstract height(height: string | number): AbstractTagBuilder<T>;
        /**
         * @param cssShorthand css short-hand equivalent rest params
         * - 1 value  : apply to all sides
         * - 2 values : apply to vertical | horizontal
         * - 3 values : apply to top | horizontal | bottom
         * - 4 values : apply to top right bottom left
         * - greater than 4 or 0 values will be ignored
         * @see [https://developer.mozilla.org/en-US/docs/Web/CSS/margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
         */
        margin(...cssShorthand: string[]): AbstractTagBuilder<T>;
        /**
         * If the values are null or undefined they will be ignored
         * @param top value and unit (for example 100px or 1em or 100% etc)
         * @param right value and unit (for example 100px or 1em or 100% etc)
         * @param bottom value and unit (for example 100px or 1em or 100% etc)
         * @param left value and unit (for example 100px or 1em or 100% etc)
         */
        origin(top?: string, right?: string, bottom?: string, left?: string): AbstractTagBuilder<T>;
        /**
         * @param cssShorthand css short-hand equivalent rest param
         * - 1 value  : apply to all sides
         * - 2 values : apply to vertical | horizontal
         * - 3 values : apply to top | horizontal | bottom
         * - 4 values : apply to top right bottom left
         * - greater than 4 or 0 values will be ignored
         * @see [https://developer.mozilla.org/en-US/docs/Web/CSS/padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
         */
        padding(...cssShorthand: string[]): AbstractTagBuilder<T>;
        /**
         * @param value sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.
         * - relative : The element is positioned according to the normal flow of the document, and then offset relative to itself based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements; thus, the space given for the element in the page layout is the same as if position were static
         * - absolute : The element is removed from the normal document flow, and no space is created for the element in the page layout. It is positioned relative to its closest positioned ancestor, if any; otherwise, it is placed relative to the initial containing block. Its final position is determined by the values of top, right, bottom, and left
         * - static [default] : The element is positioned according to the normal flow of the document. The top, right, bottom, left, and z-index properties have no effect
         * - fixed : The element is removed from the normal document flow, and no space is created for the element in the page layout. It is positioned relative to the initial containing block established by the viewport, except when one of its ancestors has a transform, perspective, or filter property set to something other than none, in which case that ancestor behaves as the containing block. (Note that there are browser inconsistencies with perspective and filter contributing to containing block formation.) Its final position is determined by the values of top, right, bottom, and left.
         * - sticky : The element is positioned according to the normal flow of the document, and then offset relative to its nearest scrolling ancestor and containing block (nearest block-level ancestor), including table-related elements, based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements
         * @see [https://developer.mozilla.org/en-US/docs/Web/CSS/position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
         */
        position(value: 'relative' | 'absolute' | 'static' | 'fixed' | 'sticky'): AbstractTagBuilder<T>;
        /**
         * @param obj CSS property-value pairs. Each property/value pair you provide is validated against using the users agents native [window.CSS.supports()](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) method. Anything that is not supported will be ignored
         *
         * For example:
         * ```js
         * builder.style({
         *      'padding-left': '20px',
         *      'border-top-left-radius': '2.5em'
         * })
         * ```
         * Notice how the example demonstrates the names of the css properties are not the javascript camelcase variants, they are the css property names as-is
         */
        style(obj: { [key: string]: string | number | boolean }): AbstractTagBuilder<T>;

        public abstract width(width: string | number): AbstractTagBuilder<T>;
        //styling

        //region events

        /**
         * Sets up a function that will be called whenever the specified event is delivered to the target
         * @param event A case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events) to listen for
         * @param listener The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs [the event listener callback](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback)
         * @param options An options object specifies characteristics about the event listener
         * - capture : A Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree
         * - once : A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked
         * - passive : A Boolean that, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning
         * - signal : An AbortSignal. The listener will be removed when the given AbortSignal’s abort() method is called
         * @see [https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
         */
        on(event: keyof GlobalEventHandlersEventMap, listener: (this: T, ev: Event) => any, options?: boolean | AddEventListenerOptions): AbstractTagBuilder<T>;
        //endregion events

        //region model

        public abstract clone(): AbstractTagBuilder<T>;
        /**
         * @return The node the current builder manages as an HTMLElement
         */
        build(): T;
        /**
         * This is the required build method when in `headless` mode.
         * @return HTML string of element
         */
        buildHTML(): html;
        /**
         * Returns the HTML tag name of the element.
         * @returns uppercase tag name
         */
        public get tagName(): string;
        /**
         * @returns id of element, if exists
         */
        public get tagId(): string | null;

    }

    export class TagBuilderOptions {
        /**
         * This flag will automatically set the `aysnc` value of any `<script>` elements
         * when created via `ScriptBuilder`
         */
        public static set scriptAsync(v: boolean);
        /**
         * When creating options via the `OptionBuilder`, this flag will automatically
         * create values for the `value` attribute based on the content given.
         *
         * The value created will always be lowercase
         *
         * For example:
         *
         * ```js
         * new OptionBuilder('Monday').build();
         * ```
         *
         * will create:
         * ```html
         * <option value="monday">Monday</option>
         * ```
         */
        public static set useOptionContentForEmptyOptionValue(v: boolean);
        /**
         * Set the default `<input>` type with this configuration.
         */
        public static set defaultInputType(v: string);
        /**
         * @param v Sets the builder pattern mode type
         * - headless : This mode allows you to use `html-tag-builder` without any `document` or `window` based browser logic. This mode will only return strings and requires you to use the `buildHTML()` builder method.
         * - document : This mode uses `document` and `window` based logic to create document elements using `document.createElement()`. This mode returns HTMLElements which give you the ability to interact with the element's native properties, events and values and allows for accessing that element via the `build()` builder method.
         */
        public static set mode(v: 'headless' | 'document');
        /**
         * Reset all the `TagBuilderOptions` properties to their default
         */
        public static reset(): void;
    }

    /**
     * The canonical way to create any document element
     *
     * Example to create a div with an id and classes:
     * ```js
     * new TagBuilder('div', 'myDiv').classes('aClass', 'bClass', 'cClass').build()
     * ```
     */
    export class TagBuilder<T extends HTMLElement> extends AbstractTagBuilder<T> {
        /**
         * @param tagName name of html tag
         * @param id for tag
         * @throws if id of element already exists in the DOM
         */
        constructor(tagName: string, id?: string);
        /**
         * Provides a hint for generating a keyboard shortcut for the current element.
         * @param value character of key
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey)
         */
        accessKey(value: string): TagBuilder<T>;
        /**
         * Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on `<input>` elements, but is usable on any element while in contenteditable mode.
         * @param value [default 'text']
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)
         */
        inputmode(value: string): TagBuilder<T>;
        /**
         * Coerce an element into being editable by the user. The browser modifies this tag to allow editing.
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
         */
        contentEditable(): TagBuilder<T>;
        /**
         * @param value Directionality of the element's text
         * - ltr : left to right and is to be used for languages that are written from the left to the right (like English)
         * - rtl : right to left and is to be used for languages that are written from the right to the left (like Arabic)
         * - auto : user agent decides
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
         */
        dir(value: 'ltr' | 'rtl' | 'auto'): TagBuilder<T>;
        /**
         * Coerces an element into being draggable. Use the Drag and Drop API
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable)
         */
        draggable(): TagBuilder<T>;
        /**
         * Coerces an element to indicate that it is not yet, or is no longer, relevant. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown.
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
         */
        hidden(): TagBuilder<T>;
        /**
         * Coerce the element to be checked for spelling errors
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck)
         */
        spellcheck(): TagBuilder<T>;
        /**
         * Sets the text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip.
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title)
         */
        title(title: string): TagBuilder<T>;
        /**
         * Represents the "rendered" text content of a node and its descendants.
         * `innerText` is easily confused with Node.textContent, but there are important differences between the two. Basically, `innerText` is aware of the rendered appearance of text, while `textContent` is not.
         *
         * Note: this does not append HTML, it sets the HTML, to append elements/html use `.append()`
         * @see [https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)
         */
        innerText(text: string): TagBuilder<T>;
        /**
         * @param value Controls whether and how text input is automatically capitalized as it is entered/edited by the user.
         * - off or none, no autocapitalization is applied (all letters default to lowercase)
         * - on or sentences, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase
         * - words, the first letter of each word defaults to a capital letter; all other letters default to lowercase
         * - characters, all letters should default to uppercase
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize)
         */
        autocapitalize(value: 'off' | 'on' | 'none' | 'sentences' | 'words' | 'characters'): TagBuilder<T>;
        /**
         * Set the css caret-color property of the element
         * @param color color name or value
         * @see [https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color)
         */
        caret(color: string): TagBuilder<T>;
        /**
         *
         * @param transform text to a specfic case
         * - uppercase : Is a keyword that converts all characters to uppercase
         * - lowercase : Is a keyword that converts all characters to lowercase
         * - capitalize: Is a keyword that converts the first letter of each word to uppercase. Other characters remain unchanged (they retain their original case as written in the element's text). A letter is defined as a character that is part of Unicode's Letter or Number general categories ; thus, any punctuation marks or symbols at the beginning of a word are ignored.
         */
        textcase(transform: 'uppercase' | 'lowercase' | 'none' | 'capitalize' | 'inherit'): TagBuilder<T>;
        /**
         * The visibility CSS property shows or hides an element without changing the layout of a document. The property can also hide rows or columns in a `<table>`
         * @param value The visibility CSS property shows or hides an element without changing the layout of a document
         * - visible: The element box is visible
         * - hidden: The element box is invisible (not drawn), but still affects layout as normal. Descendants of the element will be visible if they have visibility set to visible. The element cannot receive focus (such as when navigating through tab indexes)
         * - collapse
         *      * For <table> rows, columns, column groups, and row groups, the row(s) or column(s) are hidden and the space they would have occupied is removed (as if display: none were applied to the column/row of the table). However, the size of other rows and columns is still calculated as though the cells in the collapsed row(s) or column(s) are present. This value allows for the fast removal of a row or column from a table without forcing the recalculation of widths and heights for the entire table.
         *      * Collapsed flex items and ruby annotations are hidden, and the space they would have occupied is removed.
         *      * For XUL elements, the computed size of the element is always zero, regardless of other styles that would normally affect the size, although margins still take effect.
         *      * For other elements, collapse is treated the same as hidden.
         * @see [https://developer.mozilla.org/en-US/docs/Web/CSS/visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
         */
        visibility(value: 'visible' | 'hidden' | 'collapse'): TagBuilder<T>;
        /**
         * Set the element to specifically be for screen readers only using the [WCAG Standards](https://www.w3.org/WAI/tutorials/forms/labels/#note-on-hiding-elements)
         *
         * This will automatically add the following styles inline to the element:
         * ```js
         * element {
            border: 0,
            clip: rect(0 0 0 0),
            height: 1px,
            margin: -1px,
            overflow: hidden,
            padding: 0,
            position: absolute,
            width: 1px
        }
         * ```
         */
        screenReaderOnly(): TagBuilder<T>;

        /**
         * Parse an html string of HTML elements and cast that element to a TagBuilder
         *
         * Please note, this only considers HTMLElement.nodeType of 1
         * Meaning this ignores comments, and document fragments and text nodes etc
         *
         * This method honors attributes in the string.
         *
         * @param html html string to parse
         * @return null if no HTMLElement.nodeType(1) found
         */
        static parse(html: html): TagBuilder<HTMLElement>[];

        //abstract
        /**
         * Set the width of the element
         * @param width value and unit (for example 100px or 1em or 25)
         */
        width(width: string): TagBuilder<T>;
        /**
         * Set the width and height of the element
         * @param width value and unit (for example 100px or 100% or 1em or 25)
         * @param height value and unit (for example 100px or 100% or 1em or 25)
         */
        public bounds(width: string, height: string): TagBuilder<T>;
        /**
         * Set the height of the element
         * @param height value and unit (for example 100px or 1em or 25)
         */
        public height(height: string): TagBuilder<T>;
        /**
         * Clone the current tag builder. This deep clones the node it respectively manages
         * Note: this uses the same HTMLElement.cloneNode() method native to browsers, therefor, things like id's and individual configurations for a given node will be duplicated as-is
         */
        public clone(): TagBuilder<T>;
    }

    /**
     * This element builder is used to create an element that indicates the enclosed text is an extended quotation. Usually, this is rendered visually by indentation. A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the `<cite>` element.
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote)
     */
    export class BlockquoteBuilder extends TagBuilder<HTMLQuoteElement> {
        /**
         * @param cite A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.
         */
        constructor(cite?: string, id?: string);
    }

    /**
     * This element builder is used to group several controls as well as labels (`<label>`) within a web form.
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)
     */
    export class FieldsetBuilder extends TagBuilder<HTMLFieldSetElement> {
        /**
         * @param legend represents a caption for the content
         */
        constructor(legend?: string, id?: string);
    }

    /**
     * This element builder is used to create an element that represents self-contained content, potentially with an optional caption
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
     */
    export class FigureBuilder extends TagBuilder<HTMLElement> {
        /**
         * @param caption innerHTML or text of `<figcaption>`
         * @param captionPlacement identify if the caption should be first or last element. Note, it is expected to be first or last per [specs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure#usage_notes)
         */
        constructor(caption?: html, captionPlacement?: 'top' | 'bottom', id?: string);
    }

    /**
     * This element builder is used to create a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
     */
    class AnchorBuilder extends TagBuilder<HTMLAnchorElement> {
        /**
         * @param href url
         * @param target [default = '_self']
         * @throws Error if the href or target are null or undefined
         */
        constructor(href: string, target?: '_self' | '_blank' | '_parent' | '_top', id?: string);
        /**
         * Hints at the human language of the linked URL. No built-in functionality
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-hreflang](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-hreflang)
         */
        hreflang(lang: string): AnchorBuilder;
        /**
         * Hints at the linked URL’s format with a MIME type
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-type)
         */
        mimeType(value: string): AnchorBuilder;
        /**
         * @param urls A list of URLs. When the link is followed, the browser will send POST requests with the body PING to the URLs. Typically for tracking.
         */
        ping(urls: string[]): AnchorBuilder;
        /**
         * @param value The relationship of the linked URL as space-separated link types
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)
         */
        rel(value: string): AnchorBuilder;
    }

    /**
     * An extended class of AnchorBuilder that creates an `<a>` tag specifically meant to act as a clickable download link
     */
    export class DownloadLinkBuilder extends AnchorBuilder {
        /**
         * @param href The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs
         * @param filename Name of the file to save to client [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download)
         */
        constructor(href: string, filename: string, id?: string);
    }

    /**
     * This element builder is used to create an area inside an image map that has predefined clickable areas. An image map allows geometric areas on an image to be associated with hypertext link
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area)
     */
    export class AreaBuilder extends TagBuilder<HTMLAreaElement> {
        /**
         *
         * @param coords The coords attribute details the coordinates of the shape attribute in size, shape, and placement of an `<area>`
         * @param shape [default = 'default'] The shape of the associated hot spot. The specifications for HTML defines the values rect, which defines a rectangular region; circle, which defines a circular region; poly, which defines a polygon; and default, which indicates the entire region beyond any defined shapes.
         *
         * Many browsers, notably Internet Explorer 4 and higher, support circ, polygon, and rectangle as valid values for shape, but these values are non-standard.
         * @throws Error if coords is null or undefined
         */
        constructor(coords: string, shape?: 'rect' | 'circle' | 'poly' | 'default', id?: string);
        /**
         * @throws Error if href value or alt are null or undefined
         */
        href(url: string, alt: string): AreaBuilder;
        /**
         * @param lang Indicates the language of the linked resource. Use this attribute only if the href attribute is present.
         */
        hreflang(lang: string): AreaBuilder;
        /**
         * @param urls A space-separated list of URLs. When the link is followed, the browser will send POST requests with the body PING to the URLs. Typically for tracking.
         */
        ping(urls: string[]): AreaBuilder;
        /**
         * @param value The relationship of the linked URL as space-separated link types
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)
         */
        rel(value: string): AreaBuilder;
        /**
         * @param value A keyword or author-defined name of the browsing context to display the linked resource
         */
        target(value: '_self' | '_blank' | '_parent' | '_top'): AreaBuilder;
    }

    /**
     * An extended class of AreaBuilder that creates an `<area>` tag specifically meant to act as a clickable download link
     */
    export class DownloadAreaBuilder extends AreaBuilder {
        /**
         * @param filename Name of the file to save to client [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download)
         * @param coords The coords attribute details the coordinates of the shape attribute in size, shape, and placement of an `<area>` [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area#attr-coords)
         * @param shape [default = 'default']
         * @throws Error if filename is not provided
         */
        constructor(filename: string, coords: string, shape?: 'rect' | 'circle' | 'poly' | 'default', id?: string);
    }

    /**
     * This element builder is used to create an element that links a given piece of content with a machine-readable translation. If the content is time- or date-related, the <time> element must be used
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data)
     */
    export class DataBuilder extends TagBuilder<HTMLDataElement> {
        /**
         * @param value the elements attribute `value` value
         */
        constructor(value: string, id?: string);
    }

    /**
     * This element builder is used to create a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. It should be used only when no other semantic element is appropriate. `<span>` is very much like a <div> element, but `<div>` is a block-level element whereas a `<span>` is an inline element
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)
     */
    export class SpanBuilder extends TagBuilder<HTMLSpanElement> {
        /**
         * @param style an array of frequently used styling elements. This are added to the elements CSS properties inline. Similar styles or different values for the same CSS property will override one another
         */
        constructor(style?: ('bold' | 'bolder' | 'lighter' | 'italic' | 'underline' | 'strikethrough')[], id?: string);
        /**
         * font-weight: bold
         */
        bold(): SpanBuilder;
        /**
         * font-weight: bolder
         */
        bolder(): SpanBuilder;
        /**
         * font-style: italic;
         */
        italic(): SpanBuilder;
        /**
         * font-weight: lighter
         */
        lighter(): SpanBuilder;
        /**
         * text-decoration: underline
         */
        underline(): SpanBuilder;
        /**
         * text-decoration: strikethrough
         */
        strikethrough(): SpanBuilder;
        /**
         * color: <value>
         * @param value any valid CSS color value
         */
        color(value: string): SpanBuilder;
    }

    /**
     * This element builder is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
     */
    export class InputBuilder extends TagBuilder<HTMLInputElement> {
        /**
         * @param type [default = 'text'] Type of form control
         */
        constructor(type?: string, id?: string);
        /**
         * @param value Hint for form autofill feature [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
         */
        autocomplete(value: string): InputBuilder;
        /**
         * Automatically focus the form control when the page is loaded
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus)
         */
        autofocus(): InputBuilder;
        /**
         * @param id The value given should be the id of a `<datalist>` element located in the same document which provides predefined values to suggest to the user for this input
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#htmlattrdeflist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#htmlattrdeflist)
         */
        datalist(id: string): InputBuilder;
        /**
         * Disables the control
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefdisabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefdisabled)
         */
        disabled(): InputBuilder;
        /**
         * @param value Name of the form control. Submitted with the form as part of a name/value pair [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname)
         */
        name(value: string): InputBuilder;
        /**
         * @param value set the custom validity message that populates when the control value resolves to an error
         * @see [https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity)
         */
        onInvalid(value: string): InputBuilder;
        /**
         * Text that appears in the form control when it has no value set
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefplaceholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefplaceholder)
         */
        placeholder(value: string): InputBuilder;
        /**
         * Specify that the control is readonly
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
         */
        readOnly(): InputBuilder;
        /**
         * A value is required or must be check for the form to be submittable
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
         */
        required(): InputBuilder;
        /**
         * @param value The initial value of the control
         */
        value(value: string): InputBuilder;
    }

    /**
     * This element builder is used to create a control for entering a number. Displays a spinner and adds default validation when supported. Displays a numeric keypad in some devices with dynamic keypads.
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)
     */
    export class NumberInputBuilder extends InputBuilder {
        /**
         * @param value Initial value of the control
         */
        constructor(value?: string, id?: string);
        /**
         * @param value The minimum value to accept for this input
         */
        min(value: string): NumberInputBuilder;
        /**
         * @param value The maximum value to accept for this input
         */
        max(value: string): NumberInputBuilder;
        /**
         * @param interval A stepping interval to use when using up and down arrows to adjust the value, as well as for validation [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#attr-step)
         */
        step(interval: string): NumberInputBuilder;
    }

    /**
     * This element builder is used to create a control for entering a number whose exact value is not important. Displays as a range widget defaulting to the middle value. Used in conjunction min and max to define the range of acceptable values
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)
     */
    export class RangeInputBuilder extends NumberInputBuilder {
        /**
         * @param value initial value of the control
         */
        constructor(value?: string, id?: string);
    }

    /**
     * This element builder is used to create a check box allowing single values to be selected/deselected
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)
     */
    export class CheckboxInputBuilder extends InputBuilder {
        /**
         * @param isIndeterminate [default = 'false'] the checkboxs value is neither true or false if this is enabled [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate)
         */
        constructor(isIndeterminate?: boolean, id?: string);
        /**
         * Sets the checkboxes value to checked
         */
        checked(): CheckboxInputBuilder;
    }

    /**
     * A radio button, allowing a single value to be selected out of multiple choices with the same name value
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
     */
    export class RadioInputBuilder extends InputBuilder {
        /**
         * @param checked indicate if the radio button is checked or not
         * @param id
         */
        constructor(checked?: boolean, id?: string);
    }

    /**
     * This element builder is used to create a control for entering a date (year, month, and day, with no time). Opens a date picker or numeric wheels for year, month, day when active in supporting browsers
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
     */
    export class DateInputBuilder extends NumberInputBuilder {
        /**
         * @param value initial value of the control
         */
        constructor(value?: string, id?: string);
    }

    /**
     * This element builder is used to create a control for entering a date and time, with no time zone. Opens a date picker or numeric wheels for date- and time-components when active in supporting browsers
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)
     */
    export class DateTimeLocalInputBuilder extends DateInputBuilder {
        /**
         * @param value initial value of the control
         */
        constructor(value?: string, id?: string);
    }

    /**
     * This element builder is used to create a control for entering a month and year, with no time zone
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month)
     */
    export class MonthInputBuilder extends DateInputBuilder {
        /**
         * @param value initial value of the control
         */
        constructor(value?: string, id?: string);
    }

    /**
     * This element builder is used to create a control for entering a time value with no time zone
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time)
     */
    export class TimeInputBuilder extends DateInputBuilder {
        /**
         * @param value initial value of the control
         */
        constructor(value?: string, id?: string);
    }

    /**
     * This element builder is used to create a control for entering a date consisting of a week-year number and a week number with no time zone
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week)
     */
    export class WeekInputBuilder extends DateInputBuilder {
        /**
         * @param value initial value of the control
         */
        constructor(value?: string, id?: string);
    }

    /**
     * This element builder is used to create a control that lets the user select a file. Use the accept attribute to define the types of files that the control can select
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)
     */
    export class FileInputBuilder extends InputBuilder {
        /**
         * @param accept One or more unique file type specifiers describing file types to allow [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
         */
        constructor(accept?: string, id?: string);
        /**
         * @param value specifies which camera to use for capture of image or video data [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-capture)
         */
        capture(value: 'user' | 'environment'): FileInputBuilder;
        /**
         * allows the user to select more than one file
         */
        multiple(): FileInputBuilder;
    }

    /**
     * This element builder is used to create a graphical submit button. Displays an image defined by the src attribute. The alt attribute displays if the image src is missing.
     */
    export class ImageInputBuilder extends InputBuilder {
        /**
         * @param src url of image
         * @param alt It is semantic HTML to always include text for images incase they are not displayed
         * @throws Error if src or alt are null or undefinde
         */
        constructor(src: string, alt: string, id?: string);
        /**
         * @param url The URL to which to submit the data
         */
        formAction(url: string): ImageInputBuilder;
        /**
         * @param enctype The encoding method to use when submitting the form data [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image#attr-formenctype)
         */
        formEnctype(enctype: formEnctype): ImageInputBuilder;
        /**
         * @param method HTTP method to use when submitting the form [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image#attr-formmethod)
         */
        formMethod(method: 'get' | 'post' | 'dialog'): ImageInputBuilder;
    }

    /**
     * This element builder is used to create a single-line text field. Line-breaks are automatically removed from the input value
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text)
     */
    export class TextInputBuilder extends InputBuilder {
        constructor(id?: string);
        /**
         * @param value The maximum number of characters the input should accept
         */
        maxLength(value: number): TextInputBuilder;
        /**
         * @param value The minimum number of characters the input should accept
         */
        minLength(value: number): TextInputBuilder;
        /**
         * @param value A regular expression the input's contents must match in order to be valid
         */
        pattern(value: RegExp | string): TextInputBuilder;
        /**
         * @param value A number indicating how many characters wide the input field should be
         */
        size(value: number): TextInputBuilder;

    }

    /**
     * This element builder is used to create a field for editing an email address. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email)
     */
    export class EmailInputBuilder extends TextInputBuilder {
        constructor(id?: string);
        /**
         * Indicates that the user can enter a list of multiple e-mail addresses, separated by commas and, optionally, whitespace characters
         */
        multiple(): EmailInputBuilder;
    }

    /**
     * This element builder is used to create a single-line text field whose value is obscured. Will alert user if site is not secure
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password)
     */
    export class PasswordInputBuilder extends TextInputBuilder {
        constructor(id?: string);
    }

    /**
     * This element builder is used to create a single-line text field for entering search strings. Line-breaks are automatically removed from the input value. May include a delete icon in supporting browsers that can be used to clear the field. Displays a search icon instead of enter key on some devices with dynamic keypads
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search)
     */
    export class SearchInputBuilder extends TextInputBuilder {
        constructor(id?: string);
    }

    /**
     * This element builder is used to create a control for entering a telephone number. Displays a telephone keypad in some devices with dynamic keypads
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel)
     */
    export class TelInputBuilder extends TextInputBuilder {
        constructor(id?: string);
    }

    /**
     * This element builder is used to create a field for entering a URL. Looks like a text input, but has validation parameters and relevant keyboard in supporting browsers and devices with dynamic keyboards
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url)
     */
    export class UrlInputBuilder extends TextInputBuilder {
        constructor(id?: string);
    }

    /**
     * This element builder is used to create an element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
     */
    export class TextAreaBuilder extends TagBuilder<HTMLTextAreaElement> {
        /**
         * @param rows specify an exact size of how tall the textarea is
         * @param cols specify an exact size of how wide the textarea is
         */
        constructor(rows?: number, cols?: number, id?: string);
        /**
         * @param value Hint for form autofill feature [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
         */
        autocomplete(value: string): TextAreaBuilder;
        /**
         * Automatically focus the form control when the page is loaded
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
         */
        autofocus(): TextAreaBuilder;
        /**
         * Disables the control
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefdisabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefdisabled)
         */
        disabled(): TextAreaBuilder;
        /**
         * @param value The maximum number of characters (UTF-16 code units) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters
         */
        maxLength(value: number): TextAreaBuilder;
        /**
         * @param value The minimum number of characters (UTF-16 code units) required that the user should enter
         */
        minLength(value: number): TextAreaBuilder;
        /**
         * @param value  	Name of the form control. Submitted with the form as part of a name/value pair [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname)
         */
        name(value: string): TextAreaBuilder;
        /**
         * @param value set the custom validity message that populates when the control value produces an error
         */
        onInvalid(value: string): TextAreaBuilder;
        /**
         * Text that appears in the form control when it has no value set
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefplaceholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefplaceholder)
         */
        placeholder(value: string): TextAreaBuilder;
        /**
         * Specify that the control is readonly
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
         */
        readOnly(): TextAreaBuilder;
        /**
         * A value is required or must be check for the form to be submittable
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
         */
        required(): TextAreaBuilder;
        /**
         * @param value The initial value of the control
         */
        value(value: string): TextAreaBuilder;
        /**
         * @param value [default = 'soft'] Indicates how the control wraps text. Possible values are:
         * - hard: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the cols attribute must also be specified for this to take effect.
         * - soft: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.
         */
        wrap(value: 'hard' | 'soft'): TextAreaBuilder;
    }

    /**
     * This element builder is used to create an element that contains a set of `<option>` elements that represent the permissible or recommended options available to choose from within other controls
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist)
     */
    export class DataListBuilder extends TagBuilder<HTMLDataListElement> {
        /**
         * @throws Error if id is null or undefined
         */
        constructor(id: string);
        /**
         * Add an `<option>` element to the datalist
         * @param content the HTML or text for the `<option>`
         * @param value the attribute `value` value
         * @param classes array of class names
         * @throws Error if content is null or undefined
         */
        addOption(content: html, value: string, classes?: classes): DataListBuilder;
        addOptions(...option: (html | OptionBuilder)[]): DataListBuilder;
    }

    /**
     * This element builder is used to create an element that represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)
     */
    export class DLBuilder extends TagBuilder<HTMLDListElement> {
        /**
         *
         * @param wrapDtDdGroupsInDiv [default = false] Semantic HTML allows for premitted content to be one or more `<div>` elements if you don't want the `<dt>` and `<dd>` elements to be direct descendants [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl#wrapping_name-value_groups_in_htmlelementdiv_elements)
         * @param groupsDivClasses classes to be added to each div wrapper
         */
        constructor(wrapDtDdGroupsInDiv?: boolean, groupsDivClasses?: classes, id?: string);
        /**
         * @param term HTML or text of the term (`<dt>`) to add
         * @param dd HTML or `<dd>` children for the given term. If a TagBuilder is provided and the tag is not an DDHTMLElement, it will automatically be added to one
         * @throws Error if term is null or undefined
         */
        addTerm(term: html, ...dd: (html | TagBuilder<HTMLElement>)[]): DLBuilder;
    }

    /**
     * This element builder is used to create a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label must be provided using the `<summary>` element
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
     */
    export class DetailsBuilder extends TagBuilder<HTMLDetailsElement> {
        /**
         * @param summary Specifies a summary, caption, or legend for a <details> element's disclosure box [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary)
         * @param open Indicates whether or not the details — that is, the contents of the <details> element — are currently visible. The details are shown when this attribute exists, or hidden when this attribute is absent. By default this attribute is absent which means the details are not visible
         */
        constructor(summary?: html, open?: boolean, id?: string);
    }

    /**
     * This element builder is used to create an item contained in a `<select>`, an `<optgroup>`, or a `<datalist>` element. As such, `<option>` can represent menu items in popups and other lists of items in an HTML document
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option)
     */
    export class OptionBuilder extends TagBuilder<HTMLOptionElement> {
        /**
         * @param content HTML or text of the option
         * @param value The attribute `value` value. If one is not provided, depending on the global configurations, one will be generated automatically based on the content.
         */
        constructor(content: html, value?: string, id?: string);
    }

    /**
     * This element builder is used to create an element that represents a control that provides a menu of options
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
     */
    export class SelectBuilder extends TagBuilder<HTMLSelectElement> {
        /**
         * @param instructionMessage If provided, this will be the first option in the element that is usually used as a placeholder. It is automatically given an attribute `value` of `""` and disabled for selection
         */
        constructor(instructionMessage?: string, id?: string);
        /**
         * Create an `<optgroup>` container with provided options
         * @param label The description of the groups
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup)
         * @throws Error if label is null or undefined
         */
        addOptionGroup(label: string, ...option: OptionBuilder[]): SelectBuilder;
        /**
         * @param content HTML or text for the `<option>`
         * @param value The options `value` attribute's value
         * @param classes
         */
        addOption(content: html, value: string, classes: classes): SelectBuilder;
        addOptions(options: (html | OptionBuilder)[]): SelectBuilder;
        /**
         * @param value Hint for form autofill feature [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
         */
        autocomplete(value: string): SelectBuilder;
        /**
         * Automatically focus the form control when the page is loaded
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
         */
        autofocus(): SelectBuilder;
        /**
         * Disables the control
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefdisabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefdisabled)
         */
        disabled(): SelectBuilder;
        /**
         * Indicates that multiple options can be selected in the list
         */
        multiple(): SelectBuilder;
        /**
         * @param value Name of the control
         */
        name(value: string): SelectBuilder;
        /**
         * @param value set the custom validity message that populates when the control value produces an error
         */
        onInvalid(value: string): SelectBuilder;
        /**
         * A value is required or must be check for the form to be submittable
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
         */
        required(): SelectBuilder;
        /**
         * @param value If the control is presented as a scrolling list box (multiple) this attribute indicates how many rows should be displayed at a time
         */
        size(value: number): SelectBuilder;
    }

    /**
     * This element builder is used to create an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li)
     */
    export class ListItemBuilder extends TagBuilder<HTMLLIElement> {
        constructor(html: html, id?: string);
    }

    /**
     * This element builder is used to create an element with a list of items rendered in list format
     */
    export class ListBuilder extends TagBuilder<HTMLUListElement> {
        /**
         *
         * @param isOrdered Identifies if the list should be an [ordered](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) with numeric style identifiers or [unordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) typeically identified with shapes or images
         * @param style The list-style of the given list [reference](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style)
         */
        constructor(isOrdered?: boolean, style?: string, id?: string);
        /**
         * @param item HTML, text or ListItemBuilder to add to the current element
         */
        addItem(item: html | ListItemBuilder): ListBuilder;
        addItems(items: (html | ListItemBuilder)[]): ListBuilder;
        /**
         * Add's a sublist list `<ul>` or `<ol>` with proper HTML markup by automatically adding it to a `<li>`. This is semantic HTML as well as proper HTML markup. [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul#nesting_a_list)
         */
        addSublist(listBuilder: ListBuilder): ListBuilder;
    }

    /**
     * This element builder is used to create embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
     */
    export class AudioBuilder extends TagBuilder<HTMLAudioElement> {
        /**
         * @param src url of audio source
         * @throws Error if src is undefined or null
         */
        constructor(src: string, id?: string);
        /**
         * Add a source for browsers that don't support main src.
         *
         * If this method is called you must provide arguments for all parameters
         * @param src url of audio
         * @param type mimetype of url content
         * @throws Error if source or type is null or undefined
         */
        addFallbackSrc(src: string, type: string): AudioBuilder;
        /**
         * The audio player will automatically seek back to the start upon reaching the end of the audio
         */
        loop(): AudioBuilder;
        /**
         * Mutes the element by default
         */
        muted(): AudioBuilder;
        /**
         * Indicates that the browser will not offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback
         */
        noControls(): AudioBuilder;
        /**
         * @param html HTML or text to be displayed for browsers that do not support this element
         */
        onNotSupported(html: html): AudioBuilder;
        /**
         * @param value [default = 'auto'] Provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:
         * - none : Indicates that the audio should not be preloaded
         * - metadata : Indicates that only the audio metadata (e.g. length) is fetched
         * - auto : Indicates that the whole audio file can be downloaded, even if the user is not expected to use it
         */
        preload(value: 'none' | 'metadata' | 'auto'): AudioBuilder;
        /**
         * Specify timed text tracks (or time-based data), for example to automatically handle subtitles. The tracks are formatted in WebVTT format (.vtt files) — Web Video Text Tracks
         * @param src Address of the track (.vtt file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the `<audio>` parent element of the track element has a crossorigin attribute
         * @param kind How the text track is meant to be used. If omitted the default kind is subtitles. If the attribute contains an invalid value, it will use metadata (Versions of Chrome earlier than 52 treated an invalid value as subtitles). The following keywords are allowed:
         * - subtitles
         *      - Subtitles provide translation of content that cannot be understood by the viewer. For example speech or text that is not English in an English language film.
         *      - Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.
         * - captions
         *      - Closed captions provide a transcription and possibly a translation of audio.
         *      - It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).
         *      - Suitable for users who are deaf or when the sound is muted.
         * - descriptions
         *      - Textual description of the audio content.
         *      - Suitable for users who are blind or where the audio cannot be seen.
         * - chapters
         *      - Chapter titles are intended to be used when the user is navigating the media resource.
         * - metadata: Tracks used by scripts. Not visible to the user.
         * @param isDefault This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one track element per media element
         * @param srclang Language of the track text data. It must be a valid BCP 47 language tag. If the kind attribute is set to subtitles, then srclang must be defined
         * @param label A user-readable title of the text track which is used by the browser when listing available text tracks
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track)
         */
        track(src: string, kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata', isDefault?: boolean, srclang?: string, label?: string): AudioBuilder;
    }

    /**
     * This element builder is used to create an element that embeds external content at the specified point in the document. This content is provided by an external application or other source of interactive content such as a browser plug-in
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed)
     */
    export class EmbedBuilder extends TagBuilder<HTMLEmbedElement> {
        /**
         * @param src The url of the resource being embedded
         * @param type The MIME type to use to select the plug-in instantiate
         * @throws Error if src or type is undefined or null
         */
        constructor(src: string, type: string, id?: string);
    }

    /**
     * This element builder is used to create a inline frame element (`<iframe>`) that represents a nested browsing context, embedding another HTML page into the current one
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
     */
    export class IframeBuilder extends TagBuilder<HTMLIFrameElement> {
        /**
         * @param src The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the same-origin policy. Also note that programmatically removing an `<iframe>`'s src attribute (e.g. via Element.removeAttribute()) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS
         * @throws Error if src is null or undefined
         */
        constructor(src: string, id?: string);
        /**
         * Specifies a feature policy for the `<iframe>`. The policy defines what features are available to the `<iframe>` based on the origin of the request (e.g. access to the microphone, camera, battery, web-share API, etc.)
         * @param value [reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy#directives)
         */
        allow(value: string): IframeBuilder;
        /**
         * @param value Indicates which referrer to send when fetching the frame's resource:
         * - no-referrer: The Referer header will not be sent.
         * - no-referrer-when-downgrade (default): The Referer header will not be sent to origins without TLS (HTTPS).
         * - origin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.
         * - origin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
         * - same-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.
         * - strict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).
         * - strict-origin-when-cross-origin: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
         * - unsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins
         */
        referrerPolicy(value: referrerPolicy): IframeBuilder;
        /**
         * @param value Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:
         * - allow-downloads: Allows for downloads to occur with a gesture from the user.
         * - allow-forms: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.
         * - allow-modals: Lets the resource open modal windows.
         * - allow-orientation-lock: Lets the resource lock the screen orientation.
         * - allow-pointer-lock: Lets the resource use the Pointer Lock API.
         * - allow-popups: Allows popups (such as window.open(), target="_blank", or showModalDialog()). If this keyword is not used, the popup will silently fail to open.
         * - allow-popups-to-escape-sandbox: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.
         * - allow-presentation: Lets the resource start a presentation session.
         * - allow-same-origin: If this token is not used, the resource is treated as being from a special origin that always fails the same-origin policy (potentially preventing access to data storage/cookies and some JavaScript APIs).
         * - allow-scripts: Lets the resource run scripts (but not create popup windows).
         * - allow-top-navigation: Lets the resource navigate the top-level browsing context (the one named _top).
         * - allow-top-navigation-by-user-activation: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture
         */
        sandbox(value: 'allow-downloads' | 'allow-forms' | 'allow-modals' | 'allow-orientation-lock' | 'allow-pointer-lock' | 'allow-popups' | 'allow-popups-to-escape-sandbox' | 'allow-presentation' | 'allow-same-origin' | 'allow-scripts' | 'allow-top-navigation' | 'allow-top-navigation-by-user-activation' | string): IframeBuilder;
        /**
         * @param value Inline HTML to embed, overriding the src attribute. If a browser does not support the srcdoc attribute, it will fall back to the URL in the src attribute
         */
        srcdoc(value: html): IframeBuilder;
    }

    /**
     * This element builder is used to create an element that embeds an image into the document
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
     */
    export class ImageBuilder extends TagBuilder<HTMLImageElement> {
        /**
         * @param src contains the path to the image you want to embed
         * @param alt holds a text description of the image. Alt text is also displayed on the page if the image can't be loaded for some reason: for example, network errors, content blocking, or linkrot. This attribute is semantically correct to use and is proper markup for accessibilty
         * @throws Error if src or alt is null or undefined
         */
        constructor(src: string, alt: string, id?: string);
        /**
         * @param value Provides an image decoding hint to the browser. Allowed values:
         * - sync: Decode the image synchronously, for atomic presentation with other content.
         * - async: Decode the image asynchronously, to reduce delay in presenting other content.
         * - auto: (Default) no preference for the decoding mode. The browser decides what is best for the user
         */
        decoding(value: 'sync' | 'async' | 'auto'): ImageBuilder;
        /**
         * @param value One or more strings separated by commas, indicating a set of source sizes. Each source size consists of:
         * - A media condition. This must be omitted for the last item in the list.
         * - A source size value.
         *  Media Conditions describe properties of the viewport, not of the image. For example, `(max-height: 500px) 1000px` proposes to use a source of `1000px` width, if the viewport is not higher than `500px`.
         *
         *  Source size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the srcset attribute, when those sources are described using width (w) descriptors. The selected source size affects the intrinsic size of the image (the image’s display size if no CSS styling is applied). If the srcset attribute is absent, or contains no values with a width descriptor, then the sizes attribute has no effect
         */
        sizes(value: string): ImageBuilder;
        /**
         * @param value One or more strings separated by commas, indicating possible image sources for the user agent to use. Each string is composed of:
         * - A URL to an image
         * - Optionally, whitespace followed by one of:
         *      - A width descriptor (a positive integer directly followed by w). The width descriptor is divided by the source size given in the sizes attribute to calculate the effective pixel density.
         *      - A pixel density descriptor (a positive floating point number directly followed by x).
         *
         *  If no descriptor is specified, the source is assigned the default descriptor of 1x.
         *
         *  It is incorrect to mix width descriptors and pixel density descriptors in the same srcset attribute. Duplicate descriptors (for instance, two sources in the same srcset which are both described with 2x) are also invalid.
         *
         *  The user agent selects any of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our Responsive images tutorial for an example
         */
        srcset(value: string): ImageBuilder;
    }

    /**
     * This element builder is used to create an element that specifies multiple media resources for the `<picture>`, the `<audio>` element, or the `<video>` element. It is an empty element, meaning that it has no content and does not have a closing tag. It is commonly used to offer the same media content in multiple file formats in order to provide compatibility with a broad range of browsers given their differing support for image file formats and media file formats
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source)
     */
    export class SourceBuilder extends TagBuilder<HTMLSourceElement> {
        /**
         * @throws Error if src or type is null or undefined
         */
        constructor(src: string, type: string, id?: string);
        /**
         * @param value Media query of the resource's intended media; this should be used only in a `<picture>` element
         */
        media(value: string): SourceBuilder;
        /**
         * * @param value Is a list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. This information is used by the browser to determine, before laying the page out, which image defined in srcset to use. Please note that sizes will have its effect only if width dimension descriptors are provided with srcset instead of pixel ratio values (200w instead of 2x for example).
         *
         *  The sizes attribute has an effect only when the `<source>` element is the direct child of a `<picture>` element
         */
        sizes(value: string): SourceBuilder;
        /**
         * * @param value A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:
         * - One URL specifying an image.
         * - A width descriptor, which consists of a string containing a positive integer directly followed by "w", such as 300w. The default value, if missing, is the infinity.
         * - A pixel density descriptor, that is a positive floating number directly followed by "x". The default value, if missing, is 1x.
         *
         *  Each string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor. The browser chooses the most adequate image to display at a given point of time.
         *
         *  The srcset attribute has an effect only when the `<source>` element is the direct child of a `<picture>` element
         */
        srcset(value: string): SourceBuilder;
    }

    /**
     * This element builder is used to create a `<picture>` element that contains zero or more `<source>` elements and one `<img>` element to offer alternative versions of an image for different display/device scenarios.
     *
     *  The browser will consider each child `<source>` element and choose the best match among them. If no matches are found—or the browser doesn't support the `<picture>` element—the URL of the `<img>` element's src attribute is selected. The selected image is then presented in the space occupied by the `<img>` element
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
     */
    export class PictureBuilder extends TagBuilder<HTMLPictureElement> {
        constructor(imgBuilder: ImageBuilder, id?: string);
        /**
         * @param source Add an alternate source (`<source>`) tag via SourceBuilders
         */
        source(...source: SourceBuilder[]): PictureBuilder;
    }

    /**
     * This element builder is used to create an element (`<video>`) that embeds a media player which supports video playback into the document
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
     */
    export class VideoBuilder extends TagBuilder<HTMLVideoElement> {
        /**
         * @param src The URL of the video to embed
         * @param type The MIME media type of the resource
         * @throws Error if src or type is null or undefined
         */
        constructor(src: string, type: string, id?: string);
        /**
         * Add a source for browsers that don't support main src.
         *
         * If this method is called you must provide arguments for all parameters
         * @param src url of video
         * @param type mimetype of url content
         * @throws Error if source or type is null or undefined
         */
        addFallbackSrc(src: string, type: string): VideoBuilder;
        /**
         * The video player will automatically seek back to the start upon reaching the end of the video
         */
        loop(): VideoBuilder;
        /**
         * For the element to be muted by default
         */
        muted(): VideoBuilder;
        /**
         * Indicates that the browser will not offer controls to allow the user to control video playback, including volume, seeking, and pause/resume playback
         */
        noControls(): VideoBuilder;
        /**
         * @param html HTML or text to be displayed for browsers that do not support this element
         */
        onNotSupported(html: html): VideoBuilder;
        /**
         * @param url A URL for an image to be shown while the video is downloading. If this attribute isn't specified, nothing is displayed until the first frame is available, then the first frame is shown as the poster frame
         * @throws Error if url is null or undefined
         */
        poster(url: string): VideoBuilder;
        /**
         * @param value [default = 'auto'] Provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:
         * - none : Indicates that the audio should not be preloaded
         * - metadata : Indicates that only the audio metadata (e.g. length) is fetched
         * - auto : Indicates that the whole audio file can be downloaded, even if the user is not expected to use it
         */
        preload(value: 'none' | 'metadata' | 'auto'): VideoBuilder;
        /**
         * Specify timed text tracks (or time-based data), for example to automatically handle subtitles. The tracks are formatted in WebVTT format (.vtt files) — Web Video Text Tracks
         * @param src Address of the track (.vtt file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the `<video>` parent element of the track element has a crossorigin attribute
         * @param kind How the text track is meant to be used. If omitted the default kind is subtitles. If the attribute contains an invalid value, it will use metadata (Versions of Chrome earlier than 52 treated an invalid value as subtitles). The following keywords are allowed:
         * - subtitles
         *      - Subtitles provide translation of content that cannot be understood by the viewer. For example speech or text that is not English in an English language film.
         *      - Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.
         * - captions
         *      - Closed captions provide a transcription and possibly a translation of audio.
         *      - It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).
         *      - Suitable for users who are deaf or when the sound is muted.
         * - descriptions
         *      - Textual description of the video content.
         *      - Suitable for users who are blind or where the video cannot be seen.
         * - chapters
         *      - Chapter titles are intended to be used when the user is navigating the media resource.
         * - metadata: Tracks used by scripts. Not visible to the user.
         * @param isDefault This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one track element per media element
         * @param srclang Language of the track text data. It must be a valid BCP 47 language tag. If the kind attribute is set to subtitles, then srclang must be defined
         * @param label A user-readable title of the text track which is used by the browser when listing available text tracks
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track)
         */
        track(src: string, kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata', isDefault?: boolean, srclang?: string, label?: string): VideoBuilder;
    }

    /**
     * This element builder is used to create an element that represents either a scalar value within a known range or a fractional value
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)
     */
    export class MeterBuilder extends TagBuilder<HTMLMeterElement> {
        constructor(id?: string);
        /**
         * @param value The lower numeric bound of the measured range. This must be less than the maximum value (max attribute), if specified. If unspecified, the minimum value is 0
         */
        min(value: number): MeterBuilder;
        /**
         * @param value The upper numeric bound of the measured range. This must be greater than the minimum value (min attribute), if specified. If unspecified, the maximum value is 1
         */
        max(value: number): MeterBuilder;
        /**
         *
         * @param min The lower numeric bound of the measured range. This must be less than the maximum value (max attribute), if specified. If unspecified, the minimum value is 0
         * @param max The upper numeric bound of the measured range. This must be greater than the minimum value (min attribute), if specified. If unspecified, the maximum value is 1
         */
        minmax(min: number, max: number): MeterBuilder;
        /**
         * @param value The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (min attribute), and it also must be less than the high value and maximum value (high attribute and max attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the low value is equal to the minimum value
         */
        low(value: number): MeterBuilder;
        /**
         * @param value The lower numeric bound of the high end of the measured range. This must be less than the maximum value (max attribute), and it also must be greater than the low value and minimum value (low attribute and min attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the high value is equal to the maximum value
         */
        high(value: number): MeterBuilder;
        /**
         *
         * @param low The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (min attribute), and it also must be less than the high value and maximum value (high attribute and max attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the low value is equal to the minimum value
         * @param high The lower numeric bound of the high end of the measured range. This must be less than the maximum value (max attribute), and it also must be greater than the low value and minimum value (low attribute and min attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the high value is equal to the maximum value
         */
        lowhigh(low: number, high: number): MeterBuilder;
        /**
         * @param value This attribute indicates the optimal numeric value. It must be within the range (as defined by the min attribute and max attribute). When used with the low attribute and high attribute, it gives an indication where along the range is considered preferable. For example, if it is between the min attribute and the low attribute, then the lower range is considered preferred. The browser may color the meter's bar differently depending on whether the value is less than or equal to the optimum value
         */
        optimum(value: number): MeterBuilder;
    }

    /**
     * This element builder is used to create an indicator showing the completion progress of a task, typically displayed as a progress bar
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)
     */
    export class ProgressBuilder extends TagBuilder<HTMLProgressElement> {
        /**
         * @param value This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and max, or between 0 and 1 if max is omitted.
         * @throws Error if value is null or undefined
         */
        constructor(value: number, id?: string);
        /**
         * @param value This attribute describes how much work the task indicated by the progress element requires. The max attribute, if present, must have a value greater than 0 and be a valid floating point number. The default value is 1
         */
        max(value: number): ProgressBuilder;
    }

    /**
     * This element builder is used to create a document section containing interactive controls for submitting information
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
     */
    export class FormBuilder extends TagBuilder<HTMLFormElement> {
        /**
         * @param actionUrl The URL that processes the form submission
         * @param method The HTTP method to submit the form with. Possible (case insensitive) values:
         * - post: The `POST` method; form data sent as the request body.
         * - get: The `GET` method; form data appended to the action URL with a ? separator. Use this method when the form has no side-effects.
         * - dialog: When the form is inside a `<dialog>`, closes the dialog on submission
         * @throws Error if actionUrl is null or defined
         */
        constructor(actionUrl: string, method?: string, id?: string);
        /**
         * @param value character encodings the server accepts. The browser uses them in the order which they are listed
         */
        acceptCharset(...value: string[]): FormBuilder;
        /**
         * @param value If the value of the method attribute is post, enctype is the MIME type of the form submission. Possible values:
         * - application/x-www-form-urlencoded: The default value.
         * - multipart/form-data: Use this if the form contains `<input>` elements with type=file.
         * - text/plain: Introduced by HTML5 for debugging purposes
         */
        enctype(value: formEnctype): FormBuilder;
        /**
         * @param value The relationship of the linked URL as space-separated link types
         * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)
         */
        rel(value: string): FormBuilder;
        /**
         * @param value Indicates where to display the response after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a browsing context (for example, tab, window, or iframe). The following keywords have special meanings:
         * - _self (default): Load into the same browsing context as the current one.
         * - _blank: Load into a new unnamed browsing context.
         * - _parent: Load into the parent browsing context of the current one. If no parent, behaves the same as _self.
         * - _top: Load into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one and has no parent). If no parent, behaves the same as _self
         */
        target(value: '_self' | '_blank' | '_parent' | '_top'): FormBuilder;
        /**
         * Indicates that the form shouldn't be validated when submitted
         */
        noValidate(): FormBuilder;
    }

    /**
     * This element builder is used to create an element that is used to embed executable code or data; this is typically used to embed or refer to JavaScript code
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
     */
    export class ScriptBuilder extends TagBuilder<HTMLScriptElement> {
        constructor(id?: string);
        /**
         * For classic scripts, if the async attribute is present, then the classic script will be fetched in parallel to parsing and evaluated as soon as it is available.
         *
         * For module scripts, if the async attribute is present then the scripts and all their dependencies will be executed in the defer queue, therefore they will get fetched in parallel to parsing and evaluated as soon as they are available.
         *
         * This attribute allows the elimination of parser-blocking JavaScript where the browser would have to load and evaluate scripts before continuing to parse. defer has a similar effect in this case.
         */
        async(): ScriptBuilder;
        /**
         * @param value Normal script elements pass minimal information to the window.onerror for scripts which do not pass the standard CORS checks. To allow error logging for sites which use a separate domain for static media, use this attribute
         */
        crossOrigin(value: crossOrigin): ScriptBuilder;
        /**
         * Indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing DOMContentLoaded.
         * Scripts with the defer attribute will prevent the DOMContentLoaded event from firing until the script has loaded and finished evaluating
         *
         * Scripts with the defer attribute will execute in the order in which they appear in the document
         */
        defer(): ScriptBuilder;
        /**
         * @param value This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation
         */
        integrity(value: string): ScriptBuilder;
        /**
         * Indicate that the script should not be executed in browsers that support ES2015 modules — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code
         */
        noModule(): ScriptBuilder;
        /**
         * @param value A cryptographic nonce (number used once) to whitelist scripts in a script-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial
         */
        nonce(value: string): ScriptBuilder;
        /**
        * @param value Indicates which referrer to send when fetching the frame's resource:
        * - no-referrer: The Referer header will not be sent.
        * - no-referrer-when-downgrade (default): The Referer header will not be sent to origins without TLS (HTTPS).
        * - origin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.
        * - origin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
        * - same-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.
        * - strict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).
        * - strict-origin-when-cross-origin: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
        * - unsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins
        */
        referrerPolicy(value: referrerPolicy): ScriptBuilder;
        /**
         * @param url This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document
         */
        src(url: string): ScriptBuilder;
        /**
         * @param value This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:
         * - Omitted or a JavaScript MIME type: This indicates the script is JavaScript. The HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the src attribute) code. JavaScript MIME types are listed in the specification.
         * - module: Causes the code to be treated as a JavaScript module. The processing of the script contents is not affected by the charset and defer attributes. For information on using module, see our JavaScript modules guide. Unlike classic scripts, module scripts require the use of the CORS protocol for cross-origin fetching.
         * - Any other value: The embedded content is treated as a data block which won't be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The src attribute will be ignored
         */
        type(value: 'module' | string): ScriptBuilder;
    }

    /**
     * This element builder is used to create a group of columns within a table
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup)
     */
    export class ColGroupBuilder extends TagBuilder<HTMLElement> {
        constructor(id?: string);
        /**
         * @param span The number of columns this addition should span
         * @param aClass Classes of specific column
         */
        addCol(span?: number, ...aClass: classes): ColGroupBuilder;
    }

    /**
     * This element builder is used to create tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
     */
    export class TableBuilder extends TagBuilder<HTMLTableElement> {
        /**
         * @param caption By supplying a <caption> element whose value clearly and concisely describes the table's purpose, it helps the people decide if they need to read the rest of the table content or skip over it.
         *
         *  This helps people navigating with the aid of assistive technology such as a screen reader, people experiencing low vision conditions, and people with cognitive concerns
         */
        constructor(caption?: html, id?: string);
        /**
         * @param th HTML or text values that will be rendered as `<th>` content
         */
        addHeader(...th: html[]): TableBuilder;
        /**
         * @param td HTML or text values that will be rendered as `<td>` content, automatically added to a `<tr>`
         */
        addRow(...td: html[]): TableBuilder;
        colgroup(builder: ColGroupBuilder): TableBuilder;
        /**
         * Specify that the table should use `border-collapse: collapse`
         */
        collapse(): TableBuilder;
        /**
         * @param header Set headers of the element
         */
        setHeaders(...header: html[]): TableBuilder;
        /**
         *
         * @param row Set rows of the element
         */
        setRows(...row: html[][]): TableBuilder;
    }

    /**
     * This element builder is used to create an element - part of the Web Components technology suite - that is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)
     */
    export class SlotBuilder extends TagBuilder<HTMLSlotElement> {
        /**
         * @param name `name` attribute value
         * @param value body of the slot
         * @throws Error if name or value is null or undefined
         */
        constructor(name: string, content: html | TagBuilder<HTMLElement>, id?: string);
    }

    /**
     * This element builder is used to create a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.
     *
     *  Think of a template as a content fragment that is being stored for subsequent use in the document. While the parser does process the contents of the <template> element while loading the page, it does so only to ensure that those contents are valid; the element's contents are not rendered, however
     * @see [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
     */
    export class TemplateBuilder extends TagBuilder<HTMLTemplateElement> {
        /**
         * @param id required
         */
        constructor(id: string);
        /**
         * @param cssText Appends text to the templates `<style>` tag. If the tag doesn't exist it will be automatically prepended here, simply pass only the CSS markup
         */
        addStylesToRoot(cssText: string): TemplateBuilder;
        addSlots(...slot: SlotBuilder[]): TemplateBuilder;
    }

    /**
     * This element builder is used to create XML-based markup language for describing two-dimensional based vector graphics
     * @see [https://developer.mozilla.org/en-US/docs/Web/SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)
     */
    export class SVGBuilder extends AbstractTagBuilder<SVGElement> {
        /**
         *
         * @param viewBox The value of the viewBox attribute is a list of four numbers: min-x, min-y, width and height. The numbers separated by whitespace and/or a comma, which specify a rectangle in user space which is mapped to the bounds of the viewport established for the associated SVG element
         * @param id
         * @param xmlns [default = 'http://www.w3.org/2000/svg']
         * @throws Error if xmlns is empty or null
         */
        constructor(viewBox?: string, id?: string, xmlns?: string);

        //abstract
        /**
         * Set the width of the element
         * @param width value and unit (for example 100px or 1em or 25)
         */
        width(width: string | number): SVGBuilder;
        /**
         * Set the width and height of the element
         * @param width value and unit (for example 100px or 100% or 1em or 25)
         * @param height value and unit (for example 100px or 100% or 1em or 25)
         */
        public bounds(width: string | number, height: string | number): SVGBuilder;
        /**
         * Set the height of the element
         * @param height value and unit (for example 100px or 1em or 25)
         */
        public height(height: string | number): SVGBuilder;
        /**
         * Clone the current tag builder. This deep clones the node it respectively manages
         * Note: this uses the same HTMLElement.cloneNode() method native to browsers, therefor, things like id's and individual configurations for a given node will be duplicated as-is
         */
        public clone(): SVGBuilder;
    }

    /**
     * This element builder is used to create any kind of SVG element, or SVG animation.
     * See [https://developer.mozilla.org/en-US/docs/Web/SVG/Element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element) for a complete overview
     */
    export class SVGElementBuilder<T extends SVGElement> extends AbstractTagBuilder<T> {
        /**
         *
         * @param element Name of svg element (line, circle, rect, polygon, text, animate etc) see [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element) for a complete list of elements
         * @param xmlns [default = 'http://www.w3.org/2000/svg']
         * @throws Error if xmlns is empty or null
         */
        constructor(element: string, xmlns?: string, id?: string);
        /**
         * @param value For shapes and text it's a presentation attribute that defines the color (or any SVG paint servers like gradients or patterns) used to paint the element; for animation it defines the final state of the animation
         */
        fill(value: string): SVGElementBuilder<T>;
        /**
         * A presentation attribute defining the color (or any SVG paint servers like gradients or patterns) used to paint the outline of the shape
         * @param stroke
         * @param width
         */
        stroke(stroke: string, width: string | number): SVGElementBuilder<T>;
        /**
         * How the svg fragment must be deformed if it is displayed with a different aspect ratio
         * @param value "<align> [<meetOrSlice]"
         */
        preserveAspectRatio(value: string): SVGElementBuilder<T>;
        /**
         * @param value The displayed x coordinate of the svg container. No effect on outermost svg elements
         */
        x(value: string | number): SVGElementBuilder<T>;
        /**
         * @param value The displayed y coordinate of the svg container. No effect on outermost svg elements
         */
        y(value: string | number): SVGElementBuilder<T>;
        /**
         * The value of the viewBox attribute is a list of four numbers: min-x, min-y, width and height. The numbers separated by whitespace and/or a comma, which specify a rectangle in user space which is mapped to the bounds of the viewport established for the associated SVG element
         * @param viewBox The SVG viewport coordinates for the current SVG fragment
         */
        viewBox(viewBox: string): SVGElementBuilder<T>;

        //abstract
        /**
         * Set the width of the element
         * @param width value and unit (for example 100px or 1em or 25)
         */
        width(width: string | number): SVGElementBuilder<T>;
        /**
         * Set the width and height of the element
         * @param width value and unit (for example 100px or 100% or 1em or 25)
         * @param height value and unit (for example 100px or 100% or 1em or 25)
         */
        public bounds(width: string | number, height: string | number): SVGElementBuilder<T>;
        /**
         * Set the height of the element
         * @param height value and unit (for example 100px or 1em or 25)
         */
        public height(height: string | number): SVGElementBuilder<T>;
        /**
         * Clone the current tag builder. This deep clones the node it respectively manages
         * Note: this uses the same HTMLElement.cloneNode() method native to browsers, therefor, things like id's and individual configurations for a given node will be duplicated as-is
         */
        public clone(): SVGElementBuilder<T>;
    }
}