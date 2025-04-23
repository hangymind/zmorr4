export const Config: ServerConfig = {
    host: "zmorrserver.netlify.app",
    port: 12563,
    tps: 30,
    adminSecret: "z"
};

export interface ServerConfig {
    readonly host: string
    readonly port: number

    /**
     * The server tick rate
     * In ticks/second
     */
    readonly tps: number

    readonly adminSecret: string
}
