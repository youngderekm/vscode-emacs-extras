import * as vscode from "vscode";

export default function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        // no open text editor
        return;
    }

    // selection from where we are to the end of the line.
    const position = editor.selection.active;
    const endOfLine = editor.document.lineAt(position.line).range.end;
    const selection = new vscode.Selection(position, endOfLine);
    // if anything is selected, cut it to the clipboard
    if (!selection.isEmpty) {
        editor.selection = selection;
        vscode.commands.executeCommand("editor.action.clipboardCutAction");
    }
}
