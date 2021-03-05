# Safe Apps Web3Modal

This is a wrapper around [web3modal](https://github.com/Web3Modal/web3modal) that adds Safe Apps support.

If the app using the wrapper is run as a Safe App the `connect` method will automatically connect to the Safe App.

### How to use

- Add dependency to `package.json` and run install

```
"safe-apps-web3modal": "https://github.com/rmeissner/safe-apps-web3modal#main",
```

- Setup Safe App
  - See https://docs.gnosis.io/safe/docs/sdks_safe_apps/


- Use `SafeAppWeb3Modal`

```js
import { SafeAppWeb3Modal } from 'safe-apps-web3modal';
const modal = new SafeAppWeb3Modal(web3modalOptions);
```

- Check if it can auto-connect to immediately connect

```js
if (await modal.canAutoConnect()) {
    provider = await modal.connect();
}
```
