# react-child-resolver

Pass values from parent as props to a child component.

Supports children of type function and React element.

Any props passed to the ChildResolver component will be:
- Children is type element - merged with the children's existing props.
- Children is type function - passed as arguments to children

It also works with multiple children.

[Demo](https://codesandbox.io/s/97j3686vo)

## Install

```bash
npm install --save react-child-resolver
```

### Basic Usage

```javascript
class LocateUser extends React.Component = {
  state = { address: null };

  componentDidMount() {
    getDeviceLocation.then((location) => this.setState({ address: location.address }));
  }

  render() {
    return <ChildResolver {...this.state}>
      {children}
    </ChildResolver>;
  }
}

const AddressView = () => {
  return <LocateUser>
    <Map />
    <AddressForm />
  </LocateUser>;
}
```

Both Map and AddressForm will now have access to address from LocateUser

```javascript
const AddressForm = ({ address }) => {
  const { city, state, zipCode } = address;

  return <form>
    <input type='text' label='city' defaultValue={city} />
    <input type='text' label='state' defaultValue={state} />
    <input type='text' label='zipCode' defaultValue={zipCode} />
  </form>;
};

const Map = ({ address }) => {
  return drawMap(address);
};
```


