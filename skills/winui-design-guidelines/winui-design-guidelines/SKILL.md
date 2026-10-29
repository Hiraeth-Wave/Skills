---
name: winui-design-guidelines
description: WinUI 3 视觉设计规范速查，覆盖 Color、Geometry、Iconography、Spacing、Typography 的资源名、用途与写法。在编写或评审 WinUI/XAML 界面、选择主题画刷、圆角、间距、文本样式与图标时使用。不适用于 WPF、UWP 或 Web 样式。
license: MIT
---

# WinUI Design Guidelines

WinUI Gallery 的 Design 章节文字版。写 WinUI 3 / Windows App SDK 界面时按这里的资源名取值，不要自己编颜色、圆角、间距或字号。

## 使用约定

- 主题画刷用 `ThemeResource`，才会跟随明暗主题与高对比切换：

```xml
<TextBlock Text="..." Foreground="{ThemeResource TextFillColorPrimaryBrush}" />
```

- 圆角与文本样式用 `StaticResource`：

```xml
<Border CornerRadius="{StaticResource ControlCornerRadius}" />
<TextBlock Style="{StaticResource BodyTextBlockStyle}" />
```

- 表中都是 WinUI 3 内置资源。不要在应用里写死色值、圆角或字号，否则主题切换会失效。

## 速查

| 章节        | 关键内容                                                       |
| ----------- | -------------------------------------------------------------- |
| Color       | 6 个分页、28 组、约 106 个主题画刷与系统颜色                   |
| Geometry    | 8 / 4 / 0 epx 三级圆角                                         |
| Spacing     | 4 / 8 / 12 / 16 / 24 / 36 / 48 epx，4px 网格                   |
| Typography  | 9 个文本样式，Caption 12px 到 Display 68px                     |
| Iconography | Segoe Fluent Icons / Segoe MDL2 Assets，FontIcon 与 SymbolIcon |

## Color

以下画刷属于 WinUI 3，可直接在应用中引用。分页与 Gallery 一致：Text、Fill、Stroke、Background、Signal、High Contrast。

### Text

| 组             | 资源名                                 | 用途                                 |
| -------------- | -------------------------------------- | ------------------------------------ |
| Text           | TextFillColorPrimaryBrush              | 静止或悬停                           |
| Text           | TextFillColorSecondaryBrush            | 静止或悬停                           |
| Text           | TextFillColorTertiaryBrush             | 仅按下（不满足对比度）               |
| Text           | TextFillColorDisabledBrush             | 仅禁用（不满足对比度）               |
| Accent Text    | AccentTextFillColorPrimaryBrush        | 静止或悬停，推荐用于链接             |
| Accent Text    | AccentTextFillColorSecondaryBrush      | 静止或悬停                           |
| Accent Text    | AccentTextFillColorTertiaryBrush       | 仅按下（不满足对比度）               |
| Accent Text    | AccentTextFillColorDisabledBrush       | 仅禁用（不满足对比度）               |
| Text On Accent | TextOnAccentFillColorPrimaryBrush      | 强调色控件或填充上的文字，静止或悬停 |
| Text On Accent | TextOnAccentFillColorSecondaryBrush    | 仅按下（不满足对比度）               |
| Text On Accent | TextOnAccentFillColorDisabledBrush     | 仅禁用（不满足对比度）               |
| Text On Accent | TextOnAccentFillColorSelectedTextBrush | 文本输入中高亮选中的文字             |

### Fill

| 组                    | 资源名                                     | 用途                                    |
| --------------------- | ------------------------------------------ | --------------------------------------- |
| Control Fill          | ControlFillColorDefaultBrush               | 静止                                    |
| Control Fill          | ControlFillColorSecondaryBrush             | 悬停                                    |
| Control Fill          | ControlFillColorTertiaryBrush              | 按下                                    |
| Control Fill          | ControlFillColorQuarternaryBrush           | 静止（Pill Button 控件）                |
| Control Fill          | ControlFillColorDisabledBrush              | 禁用                                    |
| Control Fill          | ControlFillColorTransparentBrush           | 静止                                    |
| Control Fill          | ControlFillColorInputActiveBrush           | 激活或聚焦的文本输入框                  |
| Control Alt Fill      | ControlAltFillColorTransparentBrush        | 透明                                    |
| Control Alt Fill      | ControlAltFillColorSecondaryBrush          | 静止（切换控件的关闭态）                |
| Control Alt Fill      | ControlAltFillColorTertiaryBrush           | 悬停                                    |
| Control Alt Fill      | ControlAltFillColorQuarternaryBrush        | 按下                                    |
| Control Alt Fill      | ControlAltFillColorDisabledBrush           | 禁用                                    |
| Neutral Solid         | ControlSolidFillColorDefaultBrush          | 滑块拇指遮住下方轨道                    |
| Neutral Strong        | ControlStrongFillColorDefaultBrush         | 静止或悬停，用于需满足 3:1 对比度的控件 |
| Neutral Strong        | ControlStrongFillColorDisabledBrush        | 仅禁用（不满足对比度）                  |
| Subtle Fill           | SubtleFillColorTransparentBrush            | 静止                                    |
| Subtle Fill           | SubtleFillColorSecondaryBrush              | 悬停                                    |
| Subtle Fill           | SubtleFillColorTertiaryBrush               | 按下                                    |
| Subtle Fill           | SubtleFillColorDisabledBrush               | 仅禁用（不满足对比度）                  |
| Control On Image Fill | ControlOnImageFillColorDefaultBrush        | 静止，用于图像上的控件                  |
| Control On Image Fill | ControlOnImageFillColorSecondaryBrush      | 悬停                                    |
| Control On Image Fill | ControlOnImageFillColorTertiaryBrush       | 按下                                    |
| Control On Image Fill | ControlOnImageFillColorDisabledBrush       | 仅禁用（不满足对比度）                  |
| Accent Fill           | AccentFillColorDefaultBrush                | 静止                                    |
| Accent Fill           | AccentFillColorSecondaryBrush              | 悬停                                    |
| Accent Fill           | AccentFillColorTertiaryBrush               | 按下                                    |
| Accent Fill           | AccentFillColorDisabledBrush               | 禁用                                    |
| Accent Fill           | AccentFillColorSelectedTextBackgroundBrush | 高亮或选中文本的背景                    |

### Stroke

| 组                    | 资源名                                          | 用途                                           |
| --------------------- | ----------------------------------------------- | ---------------------------------------------- |
| Card Stroke           | CardStrokeColorDefaultBrush                     | 卡片层与描边                                   |
| Card Stroke           | CardStrokeColorDefaultSolidBrush                | Card Stroke Default 的实色版，用于命令栏展开态 |
| Control Elevation     | ControlElevationBorderBrush                     | 静止，标准控件描边与状态                       |
| Control Elevation     | CircleElevationBorderBrush                      | 静止，圆形控件                                 |
| Control Elevation     | TextControlElevationBorderBrush                 | 静止，文本控件                                 |
| Control Elevation     | TextControlElevationBorderFocusedBrush          | 激活的文本框                                   |
| Control Elevation     | AccentControlElevationBorderBrush               | 静止，强调色控件                               |
| Control Stroke        | ControlStrokeColorDefaultBrush                  | 用于 Control Elevation Brushes，按下或禁用     |
| Control Stroke        | ControlStrokeColorSecondaryBrush                | 用于 Control Elevation Brushes                 |
| Control Stroke        | ControlStrokeColorOnAccentDefaultBrush          | 用于 Control Elevation Brushes，按下或禁用     |
| Control Stroke        | ControlStrokeColorOnAccentSecondaryBrush        | 用于 Control Elevation Brushes                 |
| Control Stroke        | ControlStrokeColorOnAccentTertiaryBrush         | 强调色控件上的线条，如分隔线                   |
| Control Stroke        | ControlStrokeColorOnAccentDisabledBrush         | 禁用                                           |
| Control Stroke        | ControlStrokeColorForStrongFillWhenOnImageBrush | 与强填充色搭配，确保任意背景上 3:1 对比        |
| Control Strong Stroke | ControlStrongStrokeColorDefaultBrush            | 需满足 3:1 对比度的控件边框                    |
| Control Strong Stroke | ControlStrongStrokeColorDisabledBrush           | 禁用                                           |
| Surface Stroke        | SurfaceStrokeColorDefaultBrush                  | 窗口与对话框边框，主题反转                     |
| Surface Stroke        | SurfaceStrokeColorFlyoutBrush                   | 控件浮出，始终深色                             |
| Divider Stroke        | DividerStrokeColorDefaultBrush                  | 内容分隔线与图形线                             |
| Focus Stroke          | FocusStrokeColorOuterBrush                      | 外描边。主题反转，浅色主题下为深色             |
| Focus Stroke          | FocusStrokeColorInnerBrush                      | 内描边                                         |

### Background

| 组                        | 资源名                                       | 用途                                 |
| ------------------------- | -------------------------------------------- | ------------------------------------ |
| Card Background           | CardBackgroundFillColorDefaultBrush          | 默认卡片色                           |
| Card Background           | CardBackgroundFillColorSecondaryBrush        | 备用卡片色，略深                     |
| Card Background           | CardBackgroundTertiaryBrush                  | 默认卡片的悬停与按下色               |
| Smoke Background          | SmokeFillColorDefaultBrush                   | 压暗对话框后面的背景                 |
| Layer                     | LayerFillColorDefaultBrush                   | 内容层颜色                           |
| Layer                     | LayerFillColorAltBrush                       | 备用内容层颜色                       |
| Layer on Acrylic          | LayerOnAcrylicFillColorDefaultBrush          | 亚克力表面上的内容层颜色             |
| Layer on Mica Base Alt    | LayerOnMicaBaseAltFillColorDefaultBrush      | 活动标签静止，内容层                 |
| Layer on Mica Base Alt    | LayerOnMicaBaseAltFillColorSecondaryBrush    | 非活动标签悬停                       |
| Layer on Mica Base Alt    | LayerOnMicaBaseAltFillColorTertiaryBrush     | 活动标签拖动                         |
| Layer on Mica Base Alt    | LayerOnMicaBaseAltFillColorTransparentBrush  | 非活动标签静止                       |
| Solid Background          | SolidBackgroundFillColorBaseBrush            | 体验的最底层                         |
| Solid Background          | SolidBackgroundFillColorBaseAltBrush         | 体验的最底层                         |
| Solid Background          | SolidBackgroundFillColorSecondaryBrush       | 需要更深背景时的备用底色             |
| Solid Background          | SolidBackgroundFillColorTertiaryBrush        | 内容层颜色                           |
| Solid Background          | SolidBackgroundFillColorQuarternaryBrush     | 备用内容层颜色                       |
| Solid Background          | SolidBackgroundFillColorQuinaryBrush         | 实色默认卡片色                       |
| Solid Background          | SolidBackgroundFillColorSenaryBrush          | 实色默认卡片色                       |
| Mica Background           | MicaBackgroundFillColorBaseBrush             | 体验的最底层                         |
| Mica Background           | MicaBackgroundFillColorBaseAltBrush          | 默认标签带背景色                     |
| Acrylic Background        | AcrylicBackgroundFillColorBaseBrush          | 仅当亚克力表面会使用层时，作为最底层 |
| Acrylic Background        | AcrylicBackgroundFillColorDefaultBrush       | 控件浮出与应用内表面的默认亚克力配方 |
| Accent Acrylic Background | AccentAcrylicBackgroundFillColorBaseBrush    | 仅当亚克力表面会使用层时，作为最底层 |
| Accent Acrylic Background | AccentAcrylicBackgroundFillColorDefaultBrush | 控件浮出与应用内表面的默认亚克力配方 |

### Signal

| 组     | 资源名                                       | 用途                 |
| ------ | -------------------------------------------- | -------------------- |
| System | SystemFillColorSuccessBrush                  | 徽章，成功           |
| System | SystemFillColorCautionBrush                  | 徽章，警告           |
| System | SystemFillColorCriticalBrush                 | 徽章，危险           |
| System | SystemFillColorSuccessBackgroundBrush        | 信息栏背景           |
| System | SystemFillColorCautionBackgroundBrush        | 信息栏背景           |
| System | SystemFillColorCriticalBackgroundBrush       | 信息栏背景           |
| System | SystemFillColorAttentionBrush                | 徽章，注意           |
| System | SystemFillColorNeutralBrush                  | 徽章，中性           |
| System | SystemFillColorSolidNeutralBrush             | 内容上的中性徽章     |
| System | SystemFillColorAttentionBackgroundBrush      | 信息栏背景           |
| System | SystemFillColorNeutralBackgroundBrush        | 信息栏背景           |
| System | SystemFillColorSolidNeutralBackgroundBrush   | 内容上的中性徽章背景 |
| System | SystemFillColorSolidAttentionBackgroundBrush | 实色关注背景         |

### High Contrast

这些是高对比主题下的系统颜色，不是画刷，名称以 `Color` 结尾。

| 资源名                        | 用途                                                             |
| ----------------------------- | ---------------------------------------------------------------- |
| SystemColorWindowTextColor    | 标题、正文、列表、占位文本、应用与窗口边框等不可交互 UI 的前景色 |
| SystemColorWindowColor        | 页面、窗格、弹出层与窗口的背景                                   |
| SystemColorHighlightTextColor | 选中、交互（悬停或按下）或进行中 UI 的前景色                     |
| SystemColorHighlightColor     | 选中、交互（悬停或按下）或进行中 UI 的背景或强调色               |
| SystemColorButtonTextColor    | 按钮及所有可交互 UI 的前景色                                     |
| SystemColorButtonFaceColor    | 按钮及所有可交互 UI 的背景                                       |
| SystemColorHotlightColor      | 超链接文字的前景色                                               |
| SystemColorGrayTextColor      | 非活动或禁用 UI 的前景色                                         |

## Geometry

Geometry 描述界面上元素的大小、形状与位置。WinUI 按被圆角对象及其与相邻元素的关系，使用三级圆角。

| 圆角  | 资源                | 用途                                     |
| ----- | ------------------- | ---------------------------------------- |
| 8 epx | OverlayCornerRadius | 顶层容器，如应用窗口、浮出、卡片、对话框 |
| 4 epx | ControlCornerRadius | 页内元素，如控件、列表背板               |
| 0     | 不设置 CornerRadius | 与其他直边相交的直边                     |

```xml
<Border CornerRadius="{StaticResource ControlCornerRadius}" />
```

## Spacing

一致的间距与留白把体验分组为独立组件。这些值与圆角逻辑对应，共同构成统一的布局。

最佳实践是 4px 网格：任何间距或尺寸都取 4 的倍数，便于缩放并保持视觉和谐。下表单位为 epx（有效像素）。

| 值     | 用途                                             |
| ------ | ------------------------------------------------ |
| 4 epx  | 紧凑尺寸的间距                                   |
| 8 epx  | UI 控件之间，控件与标签之间                      |
| 12 epx | 控件与标题之间，表面边缘与文字之间，文本区块之间 |
| 16 epx | 列表样式与卡片的内边距                           |
| 24 epx | 内容区块之间                                     |
| 36 epx | 页面内边距                                       |
| 48 epx | 带标题的页面区块之间                             |

## Typography

字体为界面提供结构与层级。Windows 默认字体是 [Segoe UI Variable](https://learn.microsoft.com/windows/apps/design/downloads/#fonts)。大多数文字用 Regular，标题用 Semibold；最小值为 12px Regular、14px Semibold。

| 样式              | 字号/行高（epx） | 可变字体          | 字重 | 资源名                        |
| ----------------- | ---------------- | ----------------- | ---- | ----------------------------- |
| Caption           | 12/16            | Small, Regular    | 400  | CaptionTextBlockStyle         |
| Body              | 14/20            | Text, Regular     | 400  | BodyTextBlockStyle            |
| Body Strong       | 14/20            | Text, SemiBold    | 600  | BodyStrongTextBlockStyle      |
| Body Large        | 18/24            | Text, Regular     | 400  | BodyLargeTextBlockStyle       |
| Body Large Strong | 18/24            | Text, SemiBold    | 600  | BodyLargeStrongTextBlockStyle |
| Subtitle          | 20/28            | Display, SemiBold | 600  | SubtitleTextBlockStyle        |
| Title             | 28/36            | Display, SemiBold | 600  | TitleTextBlockStyle           |
| Title Large       | 40/52            | Display, SemiBold | 600  | TitleLargeTextBlockStyle      |
| Display           | 68/92            | Display, SemiBold | 600  | DisplayTextBlockStyle         |

```xml
<TextBlock Style="{StaticResource BodyTextBlockStyle}" />
```

## Iconography

图标能快速传递信息。Windows 11 使用 Segoe Fluent Icons，Windows 10 使用 Segoe MDL2 Assets。部分图标只在 Segoe Fluent Icons 中提供，在未安装该字体的 Windows 10 上可能不显示。

- 用 `FontIcon` 按字形码取图标。字形码是图标目录里的四位十六进制值，如：

```xml
<FontIcon Glyph="&#xE700;" />
```

```csharp
FontIcon icon = new FontIcon();
icon.Glyph = "\uE700";
```

- 有对应 `Symbol` 枚举的图标，用 `SymbolIcon` 更易读：

```xml
<SymbolIcon Symbol="Add" />
```

```csharp
SymbolIcon icon = new SymbolIcon();
icon.Symbol = Symbol.Add;
```

- 图标字体通过 `SymbolThemeFontFamily` 取得；Gallery 的图标网格以 28px 展示，详情面板以 48px 展示。
- 查找图标用名称、字形码或标签（tags）搜索。Gallery 的图标目录字段为 `Name`、`Code`、`Tags`，例如 `GlobalNavButton`、`E700`、`menu`。

官方文档：

- [Iconography in Windows](https://learn.microsoft.com/windows/apps/design/signature-experiences/iconography#system-icons)
- [Segoe Fluent Icons font](https://learn.microsoft.com/windows/apps/design/style/segoe-fluent-icons-font)
- [Segoe MDL2 Assets font](https://learn.microsoft.com/windows/apps/design/style/segoe-ui-symbol-font)
