class Objects {

    static requireNonNull(obj: any, prop: string) {
        if (!this.isDefined(obj))
            throw new Error(`Null or undefined value not allowed for ${prop}`);

        return obj;
    }

    static ofNullable(obj, defaultValue: any) {
        if (!this.isDefined(obj))
            obj = Objects.requireNonNull(defaultValue, 'defaultValue');

        return obj;
    }

    static isDefined(obj) {
        return obj !== undefined && obj !== null;
    }

    static isEmptyOrWhitespace(obj) {
        if (!this.isDefined(obj)) return true;

        if (typeof obj == 'string' && obj.constructor === String)
            return obj.toString().trim().length === 0;

        return false;
    }

}