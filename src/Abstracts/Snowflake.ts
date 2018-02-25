export default class Snowflake {
    public static fromJSON(value: string) {
        return this.prototype.constructor.call(value);
    }

    constructor(public value: string) {
    }

    public toJSON() {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}
