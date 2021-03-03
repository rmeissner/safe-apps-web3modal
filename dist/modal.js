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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeAppWeb3Modal = void 0;
const safe_apps_sdk_1 = __importDefault(require("@gnosis.pm/safe-apps-sdk"));
const web3modal_1 = __importDefault(require("web3modal"));
const provider_1 = require("./provider");
class SafeAppWeb3Modal extends web3modal_1.default {
    constructor(options, sdk) {
        super(options);
        this.requestProvider = () => __awaiter(this, void 0, void 0, function* () {
            if (yield this.safeInfo()) {
                return this.getOrCreateProvider();
            }
            return this.connect();
        });
        this.sdk = sdk || new safe_apps_sdk_1.default();
        this.safeInfo();
    }
    safeInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cachedSafeInfo)
                try {
                    this.cachedSafeInfo = yield Promise.race([
                        this.sdk.getSafeInfo(),
                        new Promise((_, reject) => setTimeout(() => reject(), 100))
                    ]);
                }
                catch (e) {
                    this.cachedSafeInfo = undefined;
                }
            return this.cachedSafeInfo;
        });
    }
    getOrCreateProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.provider) {
                const safe = yield this.safeInfo();
                if (!safe)
                    throw Error("Could not load Safe information");
                this.provider = new provider_1.SafeAppProvider(safe, this.sdk);
            }
            return this.provider;
        });
    }
    canAutoConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.safeInfo()) !== undefined || !!this.cachedProvider;
        });
    }
}
exports.SafeAppWeb3Modal = SafeAppWeb3Modal;
//# sourceMappingURL=modal.js.map