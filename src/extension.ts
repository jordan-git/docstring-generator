import * as vscode from 'vscode';

import languages from './languages';
import { MultipleFormats } from './docstrings';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        'docstring-generator.generateDocstring',
        async () => {
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                const document = editor.document;
                let languageSupported = false;
                let docstring: string | Array<MultipleFormats> = '';

                // Check if the language is supported
                for (const language of languages) {
                    if (Array.isArray(language.id)) {
                        for (const id of language.id) {
                            if (id === document.languageId) {
                                languageSupported = true;
                                docstring = language.docstring;
                            }
                        }
                    } else {
                        if (language.id === document.languageId) {
                            languageSupported = true;
                            docstring = language.docstring;
                        }
                    }
                }

                if (languageSupported) {
                    let output: string;

                    if (typeof docstring === 'string') {
                        output = docstring;
                    } else {
                        // TODO: Menu to select different types
                        let choice = await vscode.window.showQuickPick(
                            docstring.map((entry) => entry.name)
                        );

                        if (choice) {
                            docstring.forEach((entry) => {
                                if (entry.name === choice)
                                    output = entry.docstring;
                            });
                        } else return;
                    }

                    if (editor.selection.isEmpty) {
                        editor.edit((editBuilder) =>
                            editBuilder.insert(editor.selection.active, output)
                        );
                    } else {
                        editor.edit((editBuilder) =>
                            editBuilder.replace(editor.selection, output)
                        );
                    }
                } else {
                    vscode.window.showErrorMessage(
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
