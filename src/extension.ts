import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("[px-to-units] EXTENSION ACTIVATED"); // Log inicial crucial

  const LANGUAGES = ["css", "scss", "sass", "less", "postcss"];
  console.log(`Registrando proveedor para idiomas: ${LANGUAGES.join(", ")}`);

  const provider = vscode.languages.registerCompletionItemProvider(
    LANGUAGES,
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        console.log("Proveedor invocado para:", document.languageId);

        const line = document.lineAt(position).text;
        const linePrefix = line.substring(0, position.character);
        console.log("Línea completa:", line);
        console.log("Prefijo de línea:", linePrefix);

        // Regex más flexible
        const regex = /(\d+(?:\.\d+)?)px\b/;
        const match = linePrefix.match(regex);

        if (!match) {
          console.log("No se encontró valor px en el prefijo");
          return null;
        }

        console.log("Match encontrado:", match[0]);
        const pxValue = parseFloat(match[1]);
        console.log(`Valor px detectado: ${pxValue}`);

        // Obtener configuración
        const config = vscode.workspace.getConfiguration("pxToUnits");
        const rootFontSize = config.get<number>("rootFontSize", 16);
        const viewportWidth = config.get<number>("viewportWidth", 1920);
        const decimalPlaces = config.get<number>("decimalPlaces", 2);

        // Calcular unidades
        const toFixed = (value: number) => value.toFixed(decimalPlaces);
        const rem = toFixed(pxValue / rootFontSize);
        const vw = toFixed((pxValue / viewportWidth) * 100);

        const items = [
          { label: `${rem}rem`, description: `REM conversión` },
          { label: `${vw}vw`, description: `VW conversión` },
          { label: `${rem}em`, description: `EM conversión` },
        ];

        console.log("Generando items de finalización:", items);

        return items.map((item) => {
          const completionItem = new vscode.CompletionItem(
            item.label,
            vscode.CompletionItemKind.Unit
          );
          completionItem.detail = item.description;
          return completionItem;
        });
      },
    },
    ">" // Carácter trigger
  );

  context.subscriptions.push(provider);
  console.log("Proveedor registrado exitosamente");
}

export function deactivate() {
  console.log("[px-to-units] Extensión desactivada");
}
