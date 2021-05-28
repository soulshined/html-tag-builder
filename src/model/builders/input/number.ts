/// <reference path="input.ts" />

class NumberInputBuilder extends InputBuilder {

    constructor(value?: string, id?: string) {
        super('number', id);
        if (Objects.isDefined(value))
            if (this.isHeadlessMode) this.attr('value', value);
            else this.node.value = value;
    }

    min(value: string) {
        if (this.isHeadlessMode) this.attr('min', value);
        else this.node.min = value;
        return this;
    }

    max(value: string) {
        if (this.isHeadlessMode) this.attr('max', value);
        else this.node.max = value;
        return this;
    }

    step(interval: string) {
        if (this.isHeadlessMode) this.attr('step', interval);
        else this.node.step = interval;
        return this;
    }

}

class RangeInputBuilder extends NumberInputBuilder {
    constructor(value?: string, id?: string) {
        super(value, id);
        if (this.isHeadlessMode) this.attr('type', 'range');
        else this.node.type = 'range';
    }
}