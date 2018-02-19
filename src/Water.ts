export default class Water {
    token: string
    options: object | undefined
    constructor(token: string, options?: object) {
        this.token = !token.startsWith('Bot') ? `Bot ${token}` : token;
        this.options = options;
    }
}