import SafeAppsSDK, { SafeInfo } from "@gnosis.pm/safe-apps-sdk";
import Web3Modal, { ICoreOptions } from 'web3modal';
import { SafeAppProvider } from "./provider";
export declare class SafeAppWeb3Modal extends Web3Modal {
    private sdk;
    private cachedSafeInfo;
    private provider;
    constructor(options?: Partial<ICoreOptions>, sdk?: SafeAppsSDK);
    safeInfo(): Promise<SafeInfo | undefined>;
    getOrCreateProvider(): Promise<SafeAppProvider>;
    requestProvider: () => Promise<any>;
    canAutoConnect(): Promise<boolean>;
}
