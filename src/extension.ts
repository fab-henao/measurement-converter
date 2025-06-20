import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("[px-to-units] EXTENSION ACTIVATED");

  const LANGUAGES = ["css", "scss", "sass", "less", "postcss"];
  console.log(`Registrando proveedor para idiomas: ${LANGUAGES.join(", ")}`);

  /**
   * Formatea números con la cantidad de decimales indicada, evitando ceros
   * innecesarios (p. ej. 1.00 → 1).
   */
  const formatNumber = (value: number, decimals: number): string => {
    const fixed = value.toFixed(decimals);
    return parseFloat(fixed).toString();
  };

  /**
   * COMPLETION PROVIDER
   * --------------------------------------------------------------------------
   * Ofrece las conversiones cuando se detecta «<número>px» antes del cursor.
   */
  const provider = vscode.languages.registerCompletionItemProvider(
    LANGUAGES,
    {
      provideCompletionItems(document, position) {
        const linePrefix = document
          .lineAt(position)
          .text.substring(0, position.character);

        // Buscar número en px
        const regex = /(\d+(?:\.\d+)?)px\b/;
        const match = linePrefix.match(regex);
        if (!match) return;

        const pxValue = parseFloat(match[1]);

        const cfg = vscode.workspace.getConfiguration("pxToUnits");
        const root = cfg.get<number>("rootFontSize", 16);
        const vwWidth = cfg.get<number>("viewportWidth", 1920);
        const decimals = cfg.get<number>("decimalPlaces", 2);

        const rem = `${formatNumber(pxValue / root, decimals)}rem`;
        const vw = `${formatNumber((pxValue / vwWidth) * 100, decimals)}vw`;
        const em = `${formatNumber(pxValue / root, decimals)}em`;

        const startCol = linePrefix.lastIndexOf(match[0]);
        const start = new vscode.Position(position.line, startCol);
        const end = start.translate(0, match[0].length);
        const range = new vscode.Range(start, end);

        const buildItem = (label: string, detail: string) => {
          const item = new vscode.CompletionItem(
            label,
            vscode.CompletionItemKind.Unit
          );
          item.detail = detail;
          item.sortText = "000" + label;
          item.filterText = match[0];
          item.textEdit = vscode.TextEdit.replace(range, label);
          item.insertText = label;
          return item;
        };

        return [
          buildItem(rem, `REM (rootFontSize = ${root}px)`),
          buildItem(vw, `VW  (viewportWidth = ${vwWidth}px)`),
          buildItem(em, `EM  (rootFontSize = ${root}px)`),
        ];
      },
    },
    "x" // Trigger character después de escribir "px"
  );

  context.subscriptions.push(provider);

  console.log("Proveedor registrado con trigger 'x' para detectar 'px'");
}

export function deactivate() {
  console.log("[px-to-units] Extensión desactivada");
}
