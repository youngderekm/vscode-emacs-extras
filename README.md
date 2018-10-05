# vscode-emacs-extras

The Emacs Extras plugin adds a few small missing Emacs commands to Visual Studio Code.  It does not try to remap everything to Emacs style key bindings, only adding a few commands that make VS Code easier to use for longtime Emacs users.  I especially missed the Emacs `kill-line` function (`C-k`).  This extension adds this functionality and allows you to hit `C-k` multiple times in a row to keep appending to the clipboard, like Emacs allows.

## Commands

This currently adds the following commands
- `C-k` cut/kill to end of line (Emacs style.  Repeated kills append to the previous kill)
- `C-l` center on current line
- `C-y` paste (yank)
- `C-v` page down
- `M-v` page up
- `emacsExtras.cutToEndOfLine`: cut/kill to end of line
- `emacsExtras.scrollLineToCenter`: center on current line

