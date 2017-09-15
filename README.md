# react-child-resolver

Pass values from parent as props to a child component.

Supports children of type function and React element.

Any props passed to the ChildResolver component will be:
- Children is type element - merged with the children's existing props.
- Children is type function - passed as arguments to children

It also works with multiple children.

## Install

```bash
npm install --save react-child-resolver
```

### Basic Usage

```javascript
<ChildResolver name="Usage">
  {(name) => <div>{name}</div>}
  <ComponentThatExpectsName />
</ChildResolver>
```


