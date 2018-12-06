import * as vscode from "vscode";

export default function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        // no open text editor
        return;
    }

    vscode.commands.executeCommand('editor.action.clipboardPasteAction');
}
