import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './button';

export default {
  title: 'Components/Button',
} as ComponentMeta<typeof Button>;

const template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = template.bind({});
Primary.args = {
  caption: 'Primary',
};
