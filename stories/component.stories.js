import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Span', module)
  .add('with text', () => (
    <span>Hello StoryBook</span>
  ), {
    info: 'additional info text description',
  })
  .add('with emoji', () => (
    <span role="img" aria-label="so cool">😀 😎 👍 💯</span>
  ), {
    info: {
      text: `
        additional **markdown** info text description
      `,
    },
  });
