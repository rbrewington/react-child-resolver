import React from 'react';
import { shallow } from 'enzyme';
import ChildResolver from '../index';

describe('<ChildResolver />', () => {
  /* eslint-disable no-console */
  const consoleError = console.error;

  afterEach(() => {
    console.error = consoleError;
  });

  it('should return null if no children', () => {
    const props = {
      componentName: 'TestChildResolver',
    };

    const wrapper = shallow(<ChildResolver {...props} />);

    expect(wrapper.type()).toBe(null);
  });
  it('should call children of type function with props', () => {
    const props = {
      name: 'name',
      count: '2',
    };
    const mockChildren = jest.fn(() => null);

    shallow(
      <ChildResolver {...props}>
        {mockChildren}
      </ChildResolver>
    );

    expect(mockChildren).toBeCalled();
    expect(mockChildren).lastCalledWith(props);
  });
  it('should return component child with additional props', () => {
    const props = {
      name: 'name',
      count: '2',
    };
    const Child = ({ title = 'title' }) => <div>{title}</div>;

    const wrapper = shallow(
      <ChildResolver {...props}><Child title="test" /></ChildResolver>
    );
    expect(wrapper.props()).toEqual({ ...props, title: 'test' });
  });
  it('should log an error and return null for non function, non element children', () => {
    console.error = jest.fn();
    const wrapper = shallow(
      <ChildResolver componentName="ErrorTest">test</ChildResolver>
    );

    expect(wrapper.type()).toBe(null);
    expect(console.error).toBeCalled();
    expect(console.error).lastCalledWith(
      'ChildResolver expected children to be a function or valid React element; got type string'
    );
  });
  /* eslint-enable no-console */
  it('should return a child resolver for each of multiple children', () => {
    const ChildComponent = () => <div>null</div>;
    const wrapper = shallow(
      <ChildResolver prop1="prop1" prop2="prop2">
        {jest.fn(() => null)}
        <ChildComponent prop3="prop3" />
      </ChildResolver>
    );

    expect(wrapper.find(ChildResolver)).toHaveLength(2);
  });
});
