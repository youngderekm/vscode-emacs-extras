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
    let selection = new vscode.Selection(position, endOfLine);
    // if anything is selected, cut it to the clipboard
    if (!selection.isEmpty) {
        editor.selection = selection;
        vscode.commands.executeCommand("editor.action.clipboardCutAction");
    } else {
        // cursor is at end of line, so combine it with the next line.
        const beginningOfNextLine = endOfLine.translate(1).with(undefined, 0);

        if (beginningOfNextLine.line < editor.document.lineCount) {
            // not at the final line of the document, so OK to cut
            selection = new vscode.Selection(position, beginningOfNextLine);
            vscode.commands.executeCommand("editor.action.clipboardCutAction");
        }
    }
}
