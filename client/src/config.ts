export const Config: ClientConfig = {
    address: "ws://zmorrserver.netlify.app:12563/floer/play"
};

export interface ClientConfig {
    readonly address: string
}
