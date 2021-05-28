class TagBuilderOptions {

    private static _defaultInputType: string = 'text';
    private static _useOptionContentForEmptyOptionValue : boolean = true;
    private static _defaultScriptAsync: boolean = true;
    private static _mode : 'headless' | 'document';

    public static get mode() : 'headless' | 'document' {
        return this._mode;
    }

    public static set mode(v : 'headless' | 'document') {
        this._mode = v;
    }

    public static get scriptAsync() : boolean {
        return this._defaultScriptAsync;
    }

    public static set scriptAsync(v: boolean) {
        this._defaultScriptAsync = v;
    }

    public static get useOptionContentForEmptyOptionValue() : boolean {
        return this._useOptionContentForEmptyOptionValue;
    }

    public static set useOptionContentForEmptyOptionValue(v : boolean) {
        this._useOptionContentForEmptyOptionValue = v;
    }

    public static get defaultInputType() : string {
        return this._defaultInputType;
    }

    public static set defaultInputType(v : string) {
        this._defaultInputType = v;
    }

    public static reset() {
        this._defaultInputType = 'text';
        this._useOptionContentForEmptyOptionValue = true;
        this._defaultScriptAsync = true;
    }
}