# t3code richkobe — T3 Code 简体中文版

T3 Code 的汉化增强版：在原版基础上添加**完整的简体中文界面**，可在「设置 → 常规 → 语言」里随时切换中文或英文，并让 Windows 安装包支持自选安装位置。

T3 Code 是一个「AI 编码助手控制面板」。它能远程控制你电脑上已经登录的各种 AI 编码工具（Claude Code、Codex、Cursor、Grok、OpenCode、Antigravity、fx），让你在电脑、网页和手机上随时查看和操作它们正在跑的任务。

> 本仓库 fork 自 [pingdotgg/t3code](https://github.com/pingdotgg/t3code)（MIT 许可），汉化与安装器改动都在 `i18n-zh-hans` 分支。

## 本版特色

- **电脑版全中文界面**：聊天、设置、代码审查、语音等各个页面均已翻译。个别尚未翻译的地方会自动显示英文，不会出现空白或乱码。
- **一键切换语言**：在「设置 → 常规 → 语言」中选择「跟随系统 / 英文 / 简体中文」，切换立即生效、无需重启，下次打开会记住你的选择。
- **安装可选位置**：Windows 安装包改为向导式安装，可以自己选装到哪个文件夹。
- **Android 手机版**：一个安装包适配所有安卓手机，软件名为「t3code richkobe」。

> 目前手机版只有「设置」菜单是中文，其余页面仍是英文；电脑版是完整中文。详见 [更新日志](./CHANGELOG.md) 的「已知限制」。

## 下载与安装

最新版本请到 [Release 下载页](https://github.com/yibanm/t3code-richkobe/releases) 获取。

| 平台 | 文件名 | 安装方式 |
|---|---|---|
| Windows 电脑版 | `t3code-richkobe-1.0.0-windows-x64-setup.exe` | 双击运行，按向导选择安装位置 |
| Windows 便携版 | `t3code-richkobe-1.0.0-windows-x64-portable.zip` | 解压后直接打开，无需安装 |
| Android 手机版 | `t3code-richkobe-1.0.0-android-universal.apk` | 安装时允许「未知来源应用」，需 Android 7.0 及以上 |

> 安装包未购买代码签名证书：Windows 首次打开会弹「已保护你的电脑」，点「更多信息 → 仍要运行」即可；Android 需先允许安装未知来源应用。

## 使用前准备

T3 Code 需要你电脑上至少装好并登录一个 AI 编码工具才能工作：

| 工具 | 安装与登录 |
|---|---|
| Claude Code | 安装 [Claude Code](https://claude.com/product/claude-code)，运行 `claude auth login` |
| Codex | 安装 [Codex CLI](https://developers.openai.com/codex/cli)，运行 `codex login` |
| Cursor | 安装 [Cursor CLI](https://cursor.com/cli)，运行 `agent login` |
| Grok | 安装 [Grok Build CLI](https://x.ai/cli)，运行 `grok login` |
| OpenCode | 安装 [OpenCode](https://opencode.ai)，运行 `opencode auth login` |
| Antigravity | 在设置里启用，用「Install Antigravity」并以 Google 账号登录，无需命令行 |
| fx | 安装 [fx](https://fx.sh)，在运行 T3 Code 的那台电脑上执行 `fx login` |

## 常见问题

- **打开软件是英文的？** 进入「设置 → 常规 → 语言」，选「简体中文」。
- **Windows 提示「已保护你的电脑」？** 这是没有代码签名证书导致的正常提示，点「更多信息 → 仍要运行」即可，软件本身没有问题。
- **手机版能覆盖升级吗？** 当前是测试签名，以后换正式签名时需要先卸载旧版再装新版。

## 从源码构建

需要 Node.js 与 pnpm（版本要求见 `package.json`）。

```bash
pnpm install
pnpm run dev                    # 同时启动服务端与网页端
pnpm run dist:desktop:win:x64   # 构建 Windows 安装包（需 Rust 与 Windows SDK）
```

构建 Android 手机版（需 Android SDK 与 JDK 17）：

```bash
cd apps/mobile
npx expo prebuild --clean --platform android --no-install
cd android && ./gradlew assembleRelease
```

> **注意**：项目所在路径不要包含中文或其它非 ASCII 字符，否则网页端构建与测试会失败。

## 更多文档

上游的完整使用文档（英文）在 [docs/user/](./docs/user/) 目录，涵盖[安装与首次运行](./docs/user/install.md)、[常见问题](./docs/user/faq.md)、[键盘快捷键](./docs/user/keybindings.md)、[远程控制](./docs/user/remote-access.md)等。

## 许可证

MIT，与上游一致。
