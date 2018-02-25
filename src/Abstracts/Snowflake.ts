export default class Snowflake {
    constructor(public value: string) {
    }

    static fromJSON(value: string) {
        return this.prototype.constructor.call(value);
    }
    toJSON() {
        return this.value;
    }

    toString(): string {
        return this.value;
    }
}
