import React from 'react';
import { render } from 'enzyme';
import App from './index';

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
