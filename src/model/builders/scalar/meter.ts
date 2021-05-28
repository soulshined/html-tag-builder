class MeterBuilder extends TagBuilder<HTMLMeterElement> {

    constructor(id?: string) {
        super('meter', id);
    }

    min(value: number) {
        if (this.isHeadlessMode) this.attr('min', value);
        else this.node.min = value;
        return this;
    }

    max(value: number) {
        if (this.isHeadlessMode) this.attr('max', value);
        else this.node.max = value;
        return this;
    }

    minmax(min: number, max: number) {
        return this.min(min).max(max);
    }

    low(value: number) {
        if (this.isHeadlessMode) this.attr('low', value);
        else this.node.low = value;
        return this;
    }

    high(value: number) {
        if (this.isHeadlessMode) this.attr('high', value);
        else this.node.high = value;
        return this;
    }

    lowhigh(low: number, high: number) {
        return this.low(low).high(high);
    }

    optimum(value: number) {
        if (this.isHeadlessMode) this.attr('optimum', value);
        else this.node.optimum = value;
        return this;
    }

}