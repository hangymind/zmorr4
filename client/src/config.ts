export const Config: ClientConfig = {
    address: "ws://zmorrserver.netlify.com:12563/floer/play"
};

export interface ClientConfig {
    readonly address: string
}
