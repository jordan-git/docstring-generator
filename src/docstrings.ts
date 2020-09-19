export type MultipleFormats = {
    name: string;
    docstring: string;
};

interface Docstrings {
    [language: string]: string | Array<MultipleFormats>;
}

const docstrings: Docstrings = {
    typescript: `/**
 * Description of the function.
 *
 * @remarks
 * Any remarks you have about the function.
 *
 * @param <param> - Description of the parameter
 * @returns Description of what the function returns
 */`,
    python: [
        {
            name: 'Module',
            docstring: `"""Description of the module.

Classes:
    <class>

Functions:
    <function>

Misc. variables:
    <variable>
"""`,
        },
        {
            name: 'Class',
            docstring: `"""Description of the class.

Args:
    <arg> (<type>): Description of the arg.

Variables:
    <variable> (<type>): Description of the variable.
"""`,
        },
        {
            name: 'Function',
            docstring: `"""Description of the function.

Parameters:
    <param>: Description of the parameter

Returns:
    <variable>: Description of the return value
"""`,
        },
    ],
};

export default docstrings;
