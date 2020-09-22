import dedent from 'ts-dedent';

export type DocstringTypes = {
    name: string;
    docstring: string;
};

interface Docstrings {
    [language: string]: string | Array<DocstringTypes>;
}

const docstrings: Docstrings = {
    java: [
        {
            name: 'Class',
            docstring: dedent(`/**
                                * Description of the class
                                *
                                * @author <author_name>
                                * @version 1.0
                                * @since YYYY-MM-DD
                                */`),
        },
        {
            name: 'Method',
            docstring: dedent(`/**
                                * Description of the method
                                *
                                * @param <param> Description of the parameter
                                * @return Description of the return value
                                */`),
        },
    ],
    python: [
        {
            name: 'Module',
            docstring: dedent(`"""Description of the module.

                               Classes:
                                   <class>

                               Functions:
                                   <function>

                               Misc. variables:
                                   <variable>
                               """`),
        },
        {
            name: 'Class',
            docstring: dedent(`"""Description of the class.

                               Args:
                                   <arg> (<type>): Description of the arg.

                               Variables:
                                   <variable> (<type>): Description of the variable.
                               """`),
        },
        {
            name: 'Function/Method',
            docstring: dedent(`"""Description of the function/method.

                               Parameters:
                                   <param>: Description of the parameter

                               Returns:
                                   <variable>: Description of the return value
                               """`),
        },
    ],
    typescript: dedent(`/**
                        * Description of the function/method.
                        *
                        * @remarks
                        * Any remarks you have about the function/method.
                        *
                        * @param <param> - Description of the parameter
                        * @returns Description of what the function/method returns
                        */`),
};

const supportedLanguages = [
    {
        id: 'python',
        docstring: docstrings.python,
    },
    {
        id: ['typescript', 'typescriptreact'],
        docstring: docstrings.typescript,
    },
    {
        id: 'java',
        docstring: docstrings.java,
    },
];

export default supportedLanguages;
