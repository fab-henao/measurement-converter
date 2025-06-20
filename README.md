# 📐 px‑to‑units

<p align="center"><b>A tiny VS Code extension that instantly converts <code>px</code> to <code>rem</code>, <code>vw</code>, <code>em</code> & more right from your autocomplete 🤯</b></p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=px-to-units.px-to-units"><img alt="VS Code Marketplace" src="https://img.shields.io/visual-studio-marketplace/v/px-to-units.px-to-units?style=for-the-badge"></a>
  <img alt="Downloads" src="https://img.shields.io/visual-studio-marketplace/d/px-to-units.px-to-units?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/github/license/fab-henao/px-to-units?style=for-the-badge">
</p>

![Banner](https://github.com/fab-henao/fab-henao/blob/main/assets/extension-vs-code-px-to-units-baner-1.png?raw=true)

---

## ✨ Features

- 🧠 **Smart autocomplete**: suggestions appear automatically after any `px` value or Control + Space.
- 🌎 Supports **CSS**, **SCSS/Sass**, **Less**, **PostCSS** and CSS‑in‑JS blocks.
- 🎛️ **Customisable base values** (`rootFontSize`, `viewportWidth`, precision).
- ⚡ **Zero‑config**: works right out of the box.

---

## 📺 Demo

![CSS demo](https://github.com/fab-henao/fab-henao/blob/main/assets/extension-vs-code-px-to-units-demo-1.gif?raw=true)

> The demos above convert `16px` to `1rem`, `0.83vw`, `1em`, etc.

---

## 🚀 Quick Start

1. **Install** from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=px-to-units.px-to-units) or run:

   ```bash
   ext install px-to-units.px-to-units
   ```

2. Open any `.css`, `.scss`, `.sass`, `.less`, or `.pcss` file.
3. Type a rule with a pixel value:

   ```css
   font-size: 12px;
   ```

   Once you finish typing `px`, the extension will show suggestions (like `rem`, `vw`, `em`) to replace it.

4. 🎉 Done! The selected unit replaces the pixel value — no manual maths 🧮.

---

## ⚙️ Extension Settings

| Setting                     | Default | Description                                       |
| --------------------------- | ------- | ------------------------------------------------- |
| `pxToUnits.rootFontSize`    | `16`    | Base font‑size used for `rem` / `em` conversions. |
| `pxToUnits.viewportWidth`   | `1920`  | Viewport width used for `vw` conversions.         |
| `pxToUnits.decimalPlaces`   | `2`     | Number of decimals to keep in suggestions.        |
| `pxToUnits.additionalUnits` | `[]`    | Array of custom units & formulas.                 |

> Access settings via **_File → Preferences → Settings → Extensions → px‑to‑units_**.

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

## 📄 License

Released under the [MIT](#) license © 2025 fab-henao.

---

> Built with ❤️ & TypeScript. Enjoy your new responsive workflow! 🚀
