'use strict';

import * as vscode from 'vscode';
import KillState from "./cut-to-end-of-line";
import scrollLineToCenter from "./scroll-line-to-center";

export function activate(context: vscode.ExtensionContext) {

    const killState = new KillState();

    let cutToEndOfLineDisposable = vscode.commands.registerCommand("emacsExtras.cutToEndOfLine", killState.cutToEndOfLine);
    context.subscriptions.push(cutToEndOfLineDisposable);

    let scrollLineToCenterDisposable = vscode.commands.registerCommand("emacsExtras.scrollLineToCenter", scrollLineToCenter);
    context.subscriptions.push(scrollLineToCenterDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
