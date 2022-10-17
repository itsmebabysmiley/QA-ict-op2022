import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import Button from './Button'
import { ColorVariants } from './variants'

export default {
  title: 'OP2022/Button',
  component: Button,
  argTypes: {
    type: {
      control: 'select',
      type: { name: 'string', required: false },
      description: 'The HTML type of button',
      options: ['button', 'submit', 'reset'],
      defaultValue: 'button',
    },
    label: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The label of the button',
      defaultValue: 'Button',
    },
    className: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'Additional class names to apply to the button',
    },
    icon: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'The icon to display on the button (defined in Iconify)',
    },
    iconPosition: {
      control: 'select',
      type: { name: 'string', required: false },
      description: 'The position of the icon',
      options: ['left', 'right'],
    },
    variant: {
      control: 'select',
      type: { name: 'string', required: false },
      description: 'The variant of the button',
      options: Object.keys(ColorVariants),
    },
  },
} as Meta<typeof Button>

const Template: ComponentStoryFn<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Button',
  type: 'button',
}
