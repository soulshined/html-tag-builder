/// <reference path="number.ts" />

class DateInputBuilder extends NumberInputBuilder {

    constructor(value?: string, id?: string) {
        super(value, id);
        if (this.isHeadlessMode) this.attr('type', 'date');
        else this.node.type = 'date';
    }

}

class DateTimeLocalInputBuilder extends DateInputBuilder {

    constructor(value?: string, id?: string) {
        super(value, id);
        if (this.isHeadlessMode) this.attr('type', 'datetime-local');
        else this.node.type = 'datetime-local';
    }

}

class MonthInputBuilder extends DateInputBuilder {

    constructor(value?: string, id?: string) {
        super(value, id);
        if (this.isHeadlessMode) this.attr('type', 'month');
        else this.node.type = 'month';
    }

}

class TimeInputBuilder extends DateInputBuilder {

    constructor(value?: string, id?: string) {
        super(value, id);
        if (this.isHeadlessMode) this.attr('type', 'time');
        else this.node.type = 'time';
    }

}

class WeekInputBuilder extends DateInputBuilder {

    constructor(value?: string, id?: string) {
        super(value, id);
        if (this.isHeadlessMode) this.attr('type', 'week');
        else this.node.type = 'week';
    }

}