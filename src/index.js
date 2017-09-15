import React from 'react';

const ChildResolver = ({ children, ...restProps }) => {
  if (!children) {
    return null;
  }

  if (Array.isArray(children)) {
    return (
      <div>
        {children.map((child, i) => {
          return <ChildResolver key={i} {...restProps}>{child}</ChildResolver>;
        })}
      </div>
    );
  }

  if (typeof children === 'function') {
    return children(restProps);
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, restProps);
  }

  // eslint-disable-next-line no-console
  console.error(
    `ChildResolver expected children to be a function or valid React element; got type ${typeof children}`
  );
  return null;
};

export default ChildResolver;
