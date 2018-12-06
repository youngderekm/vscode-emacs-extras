import * as vscode from 'vscode';
import * as clip from 'clipboardy';

// import * as clip from 'clipboardy'

class KillState {
    private killBuffer: string;
    private lastKillPosition: vscode.Position | null;

    constructor() {
        this.lastKillPosition = null;
        this.killBuffer = '';
        vscode.window.onDidChangeTextEditorSelection(() => {
            this.lastKillPosition = null;
            this.killBuffer = '';
        });
    }

    private cutSelection = (editor: vscode.TextEditor, repeatKill: boolean, selection: vscode.Selection) => {
        //        editor.selection = selection;
        const text = editor.document.getText(selection);
        if (!repeatKill) {
            // could have moved positions since the last kill
            this.killBuffer = '';
        }
        this.killBuffer += text;

        // copy the kill buffer to the clipboard
        clip.writeSync(this.killBuffer);

        // delete the selection, then clear it.
        editor.edit(editBuilder => {
            editBuilder.delete(selection);
        }).then(success => {
            var position = editor.selection.end;
            editor.selection = new vscode.Selection(position, position);
        });
    }

    cutToEndOfLine = () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            // no open text editor
            return;
        }

        // selection from where we are to the end of the line.
        const position = editor.selection.active;

        // did the user just kill right before this?
        let repeatKill = this.lastKillPosition !== null && position.isEqual(this.lastKillPosition);
        this.lastKillPosition = position;

        const endOfLine = editor.document.lineAt(position.line).range.end;
        let selection = new vscode.Selection(position, endOfLine);
        // if anything is selected, cut it to the clipboard
        if (!selection.isEmpty) {
            this.cutSelection(editor, repeatKill, selection);
        } else {
            // cursor is at end of line, so combine it with the next line.
            const beginningOfNextLine = endOfLine.translate(1).with(undefined, 0);

            if (beginningOfNextLine.line < editor.document.lineCount) {
                // not at the final line of the document, so OK to cut
                this.cutSelection(editor, repeatKill, new vscode.Selection(position, beginningOfNextLine));
            }
        }
    }
}


export default KillState;
