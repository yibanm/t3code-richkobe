# t3code richkobe — 带简体中文界面的 T3 Code

T3 Code 的汉化增强版：在上游基础上添加**简体中文界面**与语言切换设置，并把 Windows 安装器改为**可选择安装目录**的向导式安装。

T3 Code 本身是一个「AI 编码代理控制面板」：它能远程控制你机器上已登录的编码代理（Claude Code、Codex、Cursor、Grok Build、OpenCode、Google Antigravity、fx），通过桌面端、网页端和手机端随时查看与操作。

## 本版定制

- **简体中文界面**：桌面端全部界面已翻译（13477 条文案，覆盖聊天、设置、代码审查、语音等模块）。未翻译的内容自动回退英文，不会出现空白或乱码。
- **语言切换**：在 **设置 → 常规 → 语言** 中选择「跟随系统 / English / 简体中文」，切换立即生效、无需重启，选择会被记住。
- **Windows 安装器可选目录**：从一键静默安装改为向导式安装，可自选安装位置。
- **Android APK**：软件名 `t3code richkobe`，包名 `com.richkobe.t3code`，通用包（含 arm64-v8a / armeabi-v7a / x86 / x86_64）。

> 移动端的汉化目前只覆盖「设置」页，其余界面仍是英文；桌面端是完整汉化。详见 [CHANGELOG.md](./CHANGELOG.md) 的「已知限制」。

## 下载与安装

| 平台 | 文件 | 安装方式 |
|---|---|---|
| Windows x64 | `t3code-richkobe-1.0.0-windows-x64-setup.exe` | 双击运行，按向导选择安装目录 |
| Windows x64 便携版 | `t3code-richkobe-1.0.0-windows-x64-portable.zip` | 解压后直接运行，无需安装 |
| Android（通用包） | `t3code-richkobe-1.0.0-android-universal.apk` | 允许「未知来源应用」后安装，需 Android 7.0 及以上 |

最新下载地址见 [Release 页面](https://github.com/yibanm/t3code-richkobe/releases)。

安装包未做代码签名：Windows 会弹「已保护你的电脑」提示，点「更多信息 → 仍要运行」即可；Android 需允许未知来源安装。

## 使用前准备

T3 Code 需要至少一个已登录的编码代理命令行工具才能工作：

| 代理 | 安装与登录 |
|---|---|
| Claude Code | 安装 [Claude Code](https://claude.com/product/claude-code)，运行 `claude auth login` |
| Codex | 安装 [Codex CLI](https://developers.openai.com/codex/cli)，运行 `codex login` |
| Cursor | 安装 [Cursor CLI](https://cursor.com/cli)，运行 `agent login` |
| Grok Build | 安装 [Grok Build CLI](https://x.ai/cli)，运行 `grok login` |
| OpenCode | 安装 [OpenCode](https://opencode.ai)，运行 `opencode auth login` |
| Antigravity | 在设置里启用，用「Install Antigravity」并以 Google 登录，无需命令行工具 |
| fx | 安装 [fx](https://fx.sh)，在运行服务端的那台机器上执行 `fx login` |

## 从源码构建

需要 Node.js 与 pnpm（版本见 `package.json` 的 `engines` 与 `packageManager`）：

```bash
pnpm install
pnpm run dev          # 同时启动服务端与网页端
```

Windows 安装包与便携版（需要 Rust 与 Windows SDK）：

```bash
pnpm run dist:desktop:win:x64
```

Android APK（需要 Android SDK 与 JDK 17）：

```bash
cd apps/mobile
npx expo prebuild --clean --platform android --no-install
cd android && ./gradlew assembleRelease
```

**注意**：项目路径不要包含中文或非 ASCII 字符——`apps/web/vite.config.ts` 用 `new URL(...)` 生成资源别名，非 ASCII 路径会被 percent-encode 成非法路径，导致构建与测试失败（`os error 123`）。

## 与上游的关系

本仓库 fork 自 [pingdotgg/t3code](https://github.com/pingdotgg/t3code)，保留上游全部功能，汉化与安装器改动集中在 `i18n-zh-hans` 分支。上游许可为 MIT。

## 更新日志

见 [CHANGELOG.md](./CHANGELOG.md)。

---

## 以下为上游原始说明

T3 Code is an "agent harness control surface". It enables control of the agents on your machine with a best-in-class mobile app ([iOS](https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824), [Android](https://play.google.com/store/apps/details?id=com.t3tools.t3code)), [web app](https://app.t3.codes) and [Electron-based desktop app](https://t3.codes).

Works with your subscriptions on Claude Code, Codex, Cursor, Grok Build, OpenCode, Google Antigravity, and fx. If they're set up on your computer, T3 Code can control them.

## "Wait, what are you selling me?"

Nothing. We built T3 Code because we wanted the best possible development experience with agents. We were inspired by existing solutions like the Codex desktop app, Conductor, Claude Desktop and Cursor Glass, but none met our bar.

We wanted something performant, remote-ready, and truly open. If we ever go the wrong direction, we want you to have everything you need to fork and build the editor that you want.

## Installation

> [!WARNING]
> T3 Code currently supports Codex, Claude, Cursor, Grok Build, OpenCode, Antigravity, and fx. Install and authenticate at least one provider before use:
>
> - Codex: install [Codex CLI](https://developers.openai.com/codex/cli) and run `codex login`
> - Claude: install [Claude Code](https://claude.com/product/claude-code) and run `claude auth login`
> - Cursor: install [Cursor CLI](https://cursor.com/cli) and run `agent login`
> - Grok Build: install [Grok Build CLI](https://x.ai/cli) and run `grok login`
> - OpenCode: install [OpenCode](https://opencode.ai) and run `opencode auth login`
> - Antigravity: enable it in Settings, then use **Install Antigravity** and **Sign in with Google**. No CLI is required.
> - fx: install [fx](https://fx.sh) and run `fx login` on the machine running the T3 Code server ([setup guide](./docs/user/providers-fx.md))

### Command line

```bash
curl -fsSL https://t3.codes/install.sh | sh
```

On Windows, in PowerShell:

```powershell
irm https://t3.codes/install.ps1 | iex
```

Then run `t3` to start the server and open the local web app. `t3 service install` keeps it running in the background, `t3 update` moves to a newer release, and `t3 --help` has the full reference.

To try it once without installing, run `npx t3@latest`. It offers to install the `t3` command for you.

### Desktop app

Install the latest version of the desktop app from [GitHub Releases](https://github.com/pingdotgg/t3code/releases), or from your favorite package registry:

#### Windows (`winget`)

```bash
winget install T3Tools.T3Code
```

#### Windows (`scoop`)

```bash
scoop install extras/t3code
```

#### macOS (Homebrew)

```bash
brew install --cask t3-code
```

#### Debian, Ubuntu (`.deb`)

Download the `.deb` from [GitHub Releases](https://github.com/pingdotgg/t3code/releases), then:

```bash
sudo apt install ./T3-Code-*.deb
```

#### Arch Linux (AUR)

Stable:

```bash
yay -S t3code-bin
```

Nightly:

```bash
yay -S t3code-nightly-bin
```

The AUR packaging is maintained in this repository under [`packaging/aur`](./packaging/aur).

#### Nix (nixpkgs)

```bash
nix profile add github:NixOS/nixpkgs/nixos-unstable#t3code
```

The package is maintained in [nixpkgs](https://github.com/NixOS/nixpkgs/tree/nixos-unstable/pkgs/by-name/t3/t3code)
and includes the desktop app (`t3code-desktop`) and the `t3` command.
See [Nix installation](./docs/user/install.md#nix-nixpkgs) for NixOS configuration and updates.

## Interface languages

The UI ships in English and Simplified Chinese. It follows your system language by default; change it in **Settings → Appearance → Language**. To contribute another language, add a catalog under [`packages/client-runtime/src/i18n/`](./packages/client-runtime/src/i18n) — English keys are the source of truth, and a locale missing a key falls back to English.

## 界面语言

界面目前提供英文和简体中文，默认跟随系统语言，可在 **Settings（设置）→ Appearance（外观）→ Language（语言）** 中切换。欢迎贡献更多语言：在 [`packages/client-runtime/src/i18n/`](./packages/client-runtime/src/i18n) 下新增词典即可——英文 key 是事实源，缺失的 key 自动回退英文。

## Some notes

We are very very early in this project. Expect bugs.

We are (mostly) not accepting contributions yet. Small fixes may be considered. Big features will not be.

## Documentation

Full docs live in [docs/](./docs). There's no docs site yet.

- [FAQ](./docs/user/faq.md)
- [Install and first run](./docs/user/install.md)
- [Permission modes](./docs/user/permission-modes.md)
- [Keyboard shortcuts](./docs/user/keybindings.md)
- [Project settings](./docs/user/project-settings.md)
- [Appearance preferences](./docs/user/appearance.md)
- [Remote access from a phone or another machine](./docs/user/remote-access.md)
- [Connect Claude Code, Codex, ChatGPT and other agents over MCP](./docs/user/outside-agents.md)
- [Keeping app and server in sync](./docs/user/updating.md)
- [Source control integrations](./docs/user/source-control.md)
- Multiple accounts: [Codex](./docs/user/providers-codex.md) · [Claude](./docs/user/providers-claude.md)
- [Run T3 Code as a background service](./docs/user/background-service.md)

Building from source? Start at [docs/internals/overview.md](./docs/internals/overview.md).

## If you REALLY want to contribute still.... read this first

### Install `vp`

T3 Code uses Vite+ so you'll need to install the global `vp` command-line tool.

#### macOS / Linux

```bash
curl -fsSL https://vite.plus | bash
```

#### Windows

```bash
irm https://vite.plus/ps1 | iex
```

Checkout their getting started guide for more information: https://viteplus.dev/guide/

### Install dependencies

```bash
vp i
```

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before reporting a bug or opening a PR.

Have a feature request? Start an [Ideas discussion](https://github.com/pingdotgg/t3code/discussions/categories/ideas).

Need support? Join the [Discord](https://discord.gg/jn4EGJjrvv).
