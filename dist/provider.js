"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeAppProvider = exports.getLowerCase = void 0;
function getLowerCase(value) {
    if (value) {
        return value.toLowerCase();
    }
    return value;
}
exports.getLowerCase = getLowerCase;
const NETWORK_CHAIN_ID = {
    MAINNET: 1,
    RINKEBY: 4,
};
class SafeAppProvider {
    constructor(safe, sdk) {
        this.safe = safe;
        this.sdk = sdk;
    }
    get chainId() {
        return NETWORK_CHAIN_ID[this.safe.network];
    }
    // eslint-disable-next-line
    sendAsync(request, callback) {
        this.send(request, callback);
    }
    // eslint-disable-next-line
    send(request, callback) {
        if (!request)
            callback('Undefined request');
        this.request(request)
            .then((result) => callback(null, { jsonrpc: '2.0', id: request.id, result }))
            .catch((error) => callback(error, null));
    }
    // eslint-disable-next-line
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = request.params;
            switch (request.method) {
                case 'eth_accounts':
                    return [this.safe.safeAddress];
                case 'net_version':
                case 'eth_chainId':
                    return `0x${this.chainId.toString(16)}`;
                case 'eth_sendTransaction':
                    const tx = yield this.sdk.txs.send({
                        txs: params.map((tx) => {
                            return Object.assign({ value: '0', data: '0x' }, tx);
                        }),
                    });
                    return tx.safeTxHash;
                case 'eth_blockNumber':
                    const block = yield this.sdk.eth.getBlockByNumber(['latest']);
                    return block.number;
                case 'eth_getBalance':
                    return this.sdk.eth.getBalance([getLowerCase(params[0]), params[1]]);
                case 'eth_getCode':
                    return this.sdk.eth.getCode([getLowerCase(params[0]), params[1]]);
                case 'eth_getStorageAt':
                    return this.sdk.eth.getStorageAt([getLowerCase(params[0]), params[1], params[2]]);
                case 'eth_getBlockByNumber':
                    return this.sdk.eth.getBlockByNumber([params[0], params[1]]);
                case 'eth_getBlockByHash':
                    return this.sdk.eth.getBlockByHash([params[0], params[1]]);
                case 'eth_getTransactionByHash':
                    let txHash = params[0];
                    try {
                        const resp = yield this.sdk.txs.getBySafeTxHash(txHash);
                        txHash = resp.transactionHash || txHash;
                    }
                    catch (e) { }
                    return this.sdk.eth.getTransactionByHash([txHash]).then((tx) => {
                        // We set the tx hash to the one requested, as some provider assert this
                        if (tx) {
                            tx.hash = params[0];
                        }
                        return tx;
                    });
                case 'eth_getTransactionReceipt': {
                    let txHash = params[0];
                    try {
                        const resp = yield this.sdk.txs.getBySafeTxHash(txHash);
                        txHash = resp.transactionHash || txHash;
                    }
                    catch (e) { }
                    return this.sdk.eth.getTransactionReceipt([txHash]).then((tx) => {
                        // We set the tx hash to the one requested, as some provider assert this
                        if (tx) {
                            tx.transactionHash = params[0];
                        }
                        return tx;
                    });
                }
                case 'eth_estimateGas': {
                    return 0;
                }
                case 'eth_call': {
                    return this.sdk.eth.call([params[0], params[1]]);
                }
                case 'eth_getLogs':
                    return this.sdk.eth.getPastLogs([params[0]]);
                default:
                    throw Error(`"${request.method}" not implemented`);
            }
        });
    }
}
exports.SafeAppProvider = SafeAppProvider;
//# sourceMappingURL=provider.js.map