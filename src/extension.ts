import * as vscode from 'vscode';

import languages from './languages';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        'docstring-generator.generateDocstring',
        () => {
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                const document = editor.document;
                let docstring = '';

                for (const language of languages) {
                    if (Array.isArray(language.id)) {
                        for (const id of language.id) {
                            if (id === document.languageId) {
                                docstring = language.docstring;
                            }
                        }
                    } else {
                        if (language.id === document.languageId) {
                            docstring = language.docstring;
                        }
                    }
                }

                if (docstring) {
                    editor.edit((editBuilder) =>
                        editBuilder.insert(editor.selection.active, docstring)
                    );
                } else {
                    vscode.window.showInformationMessage(
                        'Docstring generation is not yet supported for this language.'
                    );
                }
            }
        }
    );

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
