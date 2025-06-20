import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("[px-to-units] EXTENSION ACTIVATED");

  // Idiomas en los que se activará el provider
  const LANGUAGES = ["css", "scss", "sass", "less", "postcss"];
  console.log(`Registrando proveedor para idiomas: ${LANGUAGES.join(", ")}`);

  /**
   * Utilidad para formatear números con una cantidad fija de decimales sin
   * producir valores como "0.00" cuando no es necesario.
   */
  const formatNumber = (value: number, decimals: number): string => {
    const fixed = value.toFixed(decimals);
    return parseFloat(fixed).toString();
  };

  const provider = vscode.languages.registerCompletionItemProvider(LANGUAGES, {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const line = document.lineAt(position).text;
      const linePrefix = line.substring(0, position.character);

      // Regex para detectar "<numero>px" justo antes del cursor
      const regex = /(\d+(?:\.\d+)?)px\b/;
      const match = linePrefix.match(regex);
      if (!match) {
        return undefined;
      }

      const pxValue = parseFloat(match[1]);

      /**
       * ⚙️ Configuración del usuario (con valores por defecto)
       *   - pxToUnits.rootFontSize   -> 16
       *   - pxToUnits.viewportWidth  -> 1920
       *   - pxToUnits.decimalPlaces  -> 2
       */
      const config = vscode.workspace.getConfiguration("pxToUnits");
      const rootFontSize = config.get<number>("rootFontSize", 16);
      const viewportWidth = config.get<number>("viewportWidth", 1920);
      const decimalPlaces = config.get<number>("decimalPlaces", 2);

      // Cálculos de las unidades
      const rem = formatNumber(pxValue / rootFontSize, decimalPlaces) + "rem";
      const vw =
        formatNumber((pxValue / viewportWidth) * 100, decimalPlaces) + "vw";
      const em = formatNumber(pxValue / rootFontSize, decimalPlaces) + "em";

      // 📍 Rango a sustituir → desde donde empieza el número+px hasta donde termina
      const start = new vscode.Position(
        position.line,
        linePrefix.lastIndexOf(match[0])
      );
      const end = start.translate(0, match[0].length);
      const range = new vscode.Range(start, end);

      /**
       * Crea un CompletionItem que reemplaza directamente el valor «NNpx» por
       * la unidad convertida. Se usa un TextEdit para asegurar la sustitución.
       */
      const makeItem = (
        label: string,
        description: string
      ): vscode.CompletionItem => {
        const item = new vscode.CompletionItem(
          label,
          vscode.CompletionItemKind.Unit
        );
        item.detail = description;
        item.sortText = "0"; // Todos con la misma prioridad → se muestran tal cual
        item.textEdit = vscode.TextEdit.replace(range, label);
        return item;
      };

      return [
        makeItem(rem, `REM (rootFontSize = ${rootFontSize}px)`),
        makeItem(vw, `VW  (viewportWidth = ${viewportWidth}px)`),
        makeItem(em, `EM  (rootFontSize = ${rootFontSize}px)`),
      ];
    },
  });

  context.subscriptions.push(provider);
  console.log("Proveedor registrado exitosamente");
}

export function deactivate() {
  console.log("[px-to-units] Extensión desactivada");
}
