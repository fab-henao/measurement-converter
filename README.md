# 📐 px‑to‑units

<p align="center"><b>A tiny VS Code extension that instantly converts <code>px</code> to <code>rem</code>, <code>vw</code>, <code>em</code> & more right from your autocomplete 🤯</b></p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=fab-henao.px-to-units"><img alt="VS Code Marketplace" src="https://img.shields.io/visual-studio-marketplace/v/fab-henao.px-to-units?style=for-the-badge"></a>
  <img alt="Downloads" src="https://img.shields.io/visual-studio-marketplace/d/fab-henao.px-to-units?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/github/license/fab-henao/px-to-units?style=for-the-badge">
</p>

![Banner](./media/banner.png)

---

## ✨ Features

* 🧠 **Smart autocomplete**: type `-->` after any `px` value and receive instant suggestions.
* 🌎 Supports **CSS**, **SCSS/Sass**, **Less**, **PostCSS** and CSS‑in‑JS blocks.
* 🎛️ **Customisable base values** (`rootFontSize`, `viewportWidth`, precision).
* ⚡ **Zero‑config**: works right out of the box.

---

## 📺 Demo

| CSS                               | SCSS                                |
| --------------------------------- | ----------------------------------- |
| ![CSS demo](./media/demo-css.gif) | ![SCSS demo](./media/demo-scss.gif) |

> The demos above convert `16px` to `1rem`, `0.83vw`, `1em`, etc.

---

## 🚀 Quick Start

1. **Install** from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=fab-henao.px-to-units) or run:

   ```bash
   ext install fab-henao.px-to-units
   ```
2. Open any `.css`, `.scss`, `.sass`, `.less`, or `.pcss` file.
3. Type a rule with a pixel value **followed by `-->`**:

   ```css
   font-size: 12px; -->
   ```

   Press <kbd>Ctrl</kbd>+<kbd>Space</kbd> (if it doesn’t open automatically) and pick the unit you need.
4. 🎉 Done! The selected unit replaces the pixel value — no manual maths 🧮.

---

## ⚙️ Extension Settings

| Setting                     | Default | Description                                       |
| --------------------------- | ------- | ------------------------------------------------- |
| `pxToUnits.rootFontSize`    | `16`    | Base font‑size used for `rem` / `em` conversions. |
| `pxToUnits.viewportWidth`   | `1920`  | Viewport width used for `vw` conversions.         |
| `pxToUnits.decimalPlaces`   | `2`     | Number of decimals to keep in suggestions.        |
| `pxToUnits.additionalUnits` | `[]`    | Array of custom units & formulas.                 |

> Access settings via ***File → Preferences → Settings → Extensions → px‑to‑units***.

---

## 🧩 Supported Languages & Scopes

| Language                            | Scope ID                             |
| ----------------------------------- | ------------------------------------ |
| CSS                                 | `css`                                |
| SCSS / Sass                         | `scss`, `sass`                       |
| Less                                | `less`                               |
| PostCSS                             | `postcss`                            |
| CSS‑in‑JS (template‑literal blocks) | `javascriptreact`, `typescriptreact` |

---

## 🔍 How It Works

The provider watches for the pattern:

```regex
(\d+(\.\d+)?)px;\s*-->$
```

When detected, it serves a list of `CompletionItem`s with pre‑calculated equivalents.

## 🛠 Development

```bash
git clone https://github.com/fab-henao/px-to-units.git
cd px-to-units
pnpm install # or npm / yarn
pnpm run watch # compile in background

# press F5 in VS Code to launch the Extension Development Host
```

### Running Tests

```bash
pnpm test
```

---

## 📦 Packaging & Publishing

```bash
pnpm vsce package       # creates .vsix
pnpm vsce publish minor
```

---

## 🤝 Contributing

PRs are welcome! Please open an issue for feature requests or bug reports first.

1. Fork the project
2. Create your feature branch (`git checkout -b feat/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Released under the [MIT](LICENSE) license © 2025 fab-henao.

---

> Built with ❤️ & TypeScript. Enjoy your new responsive workflow! 🚀
