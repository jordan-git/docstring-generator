import * as vscode from 'vscode';

import languages from './languages';
import { MultipleFormats } from './docstrings';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        'docstring-generator.generateDocstring',
        async () => {
            const editor = vscode.window.activeTextEditor;

            // If an editor is open
            if (editor) {
                const document = editor.document;
                let docstring: string | Array<MultipleFormats> = '';

                // Check if the language is supported
                for (const language of languages) {
                    // Supports an array of IDs for languages with the same docstring
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

                // If a docstring was found
                if (docstring) {
                    let output: string;

                    // If the docstring is an object, create a menu to select an element
                    if (typeof docstring === 'string') {
                        output = docstring;
                    } else {
                        const choice = await vscode.window.showQuickPick(
                            docstring.map((element) => element.name)
                        );

                        if (choice) {
                            docstring.forEach((element) => {
                                if (element.name === choice)
                                    output = element.docstring;
                            });
                        } else return;
                    }

                    // If text is selected, replace it, otherwise insert
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
