import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo({
  inline: true,
  text: true,
  header: false,
}));

const loadStories = () => {
  const req = require.context('../stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};
configure(loadStories, module);
