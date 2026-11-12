# 更新日志 / Changelog

本项目 fork 自 [pingdotgg/t3code](https://github.com/pingdotgg/t3code)，在其基础上添加简体中文界面、语言切换设置与 Windows 安装器优化。适用于 Windows x64 与 Android（arm64-v8a/armeabi-v7a/x86/x86_64 通用包）。

## v1.0.0

首个汉化版本：添加简体中文界面，可在「设置 → 常规 → 语言」切换中文/英文；Windows 安装器改为可选目录的向导式安装。

### 本次更新

- **新增**：简体中文界面。从上游 PR #32192 移植的零依赖 i18n 基建，13477 条翻译覆盖桌面端全部界面（聊天、设置、审查、语音等 20 个模块）。未翻译的文案自动回退英文，不会显示空白或 key 名。
- **新增**：「设置 → 常规 → 语言」选项。提供「跟随系统 / English / 简体中文」三选，切换即时生效无需重启，重启后保持。上游原版放在「外观」面板，本版按需求搬到「常规」。
- **优化**：Windows 安装器从一键静默改为向导式（assisted installer），安装时可选择安装目录，不再强制装到 `%LOCALAPPDATA%`。
- **优化**：Windows 安装器的「应用正在运行」提示现在能正确识别产品名。
- **优化**：Electron 打包时加入 `zh-CN` 语言资源，系统菜单与拼写检查跟随界面语言。
- **新增**：Android APK（universal 通用包，含 arm64-v8a / armeabi-v7a / x86 / x86_64 四种架构），软件名 `t3code richkobe`，包名 `com.richkobe.t3code`。

### 已知限制

- **定时任务设置页仍是英文**：上游把 `scheduleLabel` 函数抽到独立文件并改成带时区的 3 参数签名，与汉化版的 2 参数冲突，硬融会碰定时任务的时区逻辑。取上游版保功能，汉化列为遗留（不影响语言切换功能本身）。
- **Android APK 汉化覆盖率低**：上游 PR #33169 只翻译了「设置」页菜单 32 条，其余界面文案仍是英文。桌面端汉化是完整的（13477 条），移动端是另一套代码库，需单独接线后才能全中文。
- **APK 用 debug 签名**：CLAUDE.md 0.10 规定 release 必须用主密钥 `richkobe-release.jks`，但密钥上传 CI 需用户确认（敏感操作），目前回退到 debug 签名。签名 plugin 与 CI 注入逻辑已写好，你说一声就能换成正式签名。
- **Deep link 失效**：生产包名改为 `com.richkobe.t3code`，但官方 `app.t3.codes` 托管的 `apple-app-site-association.json` 与 `assetlinks.json` 未列出这个包名，点击网页链接唤起 App 的功能不可用（App 本身功能不受影响）。

### 安装说明

1. **Windows**：下载 `t3code-richkobe-1.0.0-windows-x64-setup.exe`，双击安装，按向导选择安装目录；或下载便携版 `t3code-richkobe-1.0.0-windows-x64-portable.zip`，解压即用。未签名安装包，Windows SmartScreen 会警告「Windows 已保护你的电脑」，点「更多信息 → 仍要运行」。
2. **Android**：下载 `t3code-richkobe-1.0.0-android-universal.apk`，允许「未知来源应用」后安装。系统要求 Android 7.0（minSdk 24）及以上。debug 签名，无法覆盖安装官方版（包名不同），也无法后续升级到正式签名版（需卸载重装）。

