import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
export declare function getLowerCase(value: string): string;
declare type AsyncSendable = {
    isMetaMask?: boolean;
    host?: string;
    path?: string;
    sendAsync?: (request: any, callback: (error: any, response: any) => void) => void;
    send?: (request: any, callback: (error: any, response: any) => void) => void;
};
export declare class SafeAppProvider implements AsyncSendable {
    private readonly safe;
    private readonly sdk;
    constructor(safe: SafeInfo, sdk: SafeAppsSDK);
    get chainId(): number;
    sendAsync(request: any, callback: (error: any, response: any) => void): void;
    send(request: any, callback: (error: any, response?: any) => void): void;
    request(request: {
        method: string;
        params: any[];
    }): Promise<any>;
}
export {};
