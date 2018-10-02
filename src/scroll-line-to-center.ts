import * as vscode from "vscode";

export default function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        // no open text editor
        return;
    }

    const selection = editor.selection;
    const range = new vscode.Range(selection.start, selection.end);
    editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
}
