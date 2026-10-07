![Skills](https://socialify.git.ci/Hiraeth-Wave/Skills/image?font=KoHo&name=1&owner=1&pattern=Solid&theme=Auto)

Hiraeth 个人自用的部分 Skills。\
该仓库放的是**特别针对 TraeCode CN 适配**的 Skill，没有放不需要特别适配的纯 Skill（指不需要 Hooks 的），如果你对我使用的全部 Skill 感兴趣可以翻阅[我的 Star 清单](https://github.com/stars/Hiraeth-Wave/lists/ai-%E5%A4%A7%E6%A8%A1%E5%9E%8B-%E6%99%BA%E8%83%BD%E4%BD%93)。

## 仓库 Skill 列表

仓库 Skill 是针对我自己的 TraeCode 特化的，因此其与原始仓库的内容可能存在不同。

- [Ponytail](https://github.com/DietrichGebert/ponytail)：让你的 Agent 找到最简洁的实现路径。

## 安装

首先通过 Skills CLI 快速安装 Skill 本体：

```bash
# pnx 是 pnpm dlx 的别名。
# 你也可以使用 npx，都一样。
pnx skills add Hiraeth-Wave/Skills -g -a 'trae-cn'
```

之后手动复制仓库根目录的 `hooks.json`，打开 TraeCode 设置，找到 Hooks，启用 Hooks 配置，将 `hooks.json` 粘贴过去即可。

## 更新

Skill 本体更新可用 CLI 直接升级：

```bash
cd ~/.trae-cn/
pnx skills update
```

Hooks 更新直接复制粘贴覆盖掉旧的即可。