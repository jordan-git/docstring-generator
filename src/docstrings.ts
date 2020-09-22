import dedent from 'ts-dedent';

export type LanguageData = {
    name: string;
    docstring: string;
};

interface Docstrings {
    [language: string]: string | Array<LanguageData>;
}

const docstrings: Docstrings = {
    typescript: dedent(`/**
                        * Description of the function.
                        *
                        * @remarks
                        * Any remarks you have about the function.
                        *
                        * @param <param> - Description of the parameter
                        * @returns Description of what the function returns
                        */`),
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
            name: 'Function',
            docstring: dedent(`"""Description of the function.

                               Parameters:
                                   <param>: Description of the parameter

                               Returns:
                                   <variable>: Description of the return value
                               """`),
        },
    ],
};

export default docstrings;
