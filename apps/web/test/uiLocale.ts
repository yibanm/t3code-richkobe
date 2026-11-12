// Unit tests assert UI copy against the English catalogs, but the resolved locale
// comes from navigator.language when client settings default to "system". Pin it so the
// host machine's language cannot flip tests to zh-Hans; i18n.test.ts covers zh directly.
Object.defineProperty(globalThis.navigator, "language", { value: "en-US", configurable: true });
