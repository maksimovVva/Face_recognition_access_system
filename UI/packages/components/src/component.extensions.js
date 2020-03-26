import React from "react";

const Null = () => null;

const conditionalComponent = () => {
    return {
        if: condition => ({
            then: Then => ({
                else: Else => {
                    const component = props => {
                        const Component = condition(props) ? Then : Else;
                        return Component ? <Component {...props} /> : <Null />;
                    };

                    const name = `then(${nameOf(Then)}),else(${nameOf(Else)})>`;
                    component.displayName = name;

                    return component;
                }
            })
        })
    };
};

const withCondition = condition => Component =>
    conditionalComponent()
        .if(condition)
        .then(Component)
        .else(Null);

const extendProp = (prop, propName) => Component => props => {
    if (!propName) throw new Error("propName must be specified.");

    const resultProps = {
        ...props,
        ...{ [propName]: { ...(props || {})[propName], ...prop } }
    };

    return <Component {...resultProps} />;
};

const nameOf = component => component.displayName || component.name;

export { withCondition, conditionalComponent, extendProp, nameOf };
