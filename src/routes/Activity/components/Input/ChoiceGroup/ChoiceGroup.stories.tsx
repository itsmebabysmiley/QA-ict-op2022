import React from 'react'
import type { ComponentStoryFn, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import ChoiceGroup from './ChoiceGroup'

export default {
  title: 'OP2022/Activity/Input/ChoiceGroup',
  component: ChoiceGroup,
} as Meta<typeof ChoiceGroup>

const Template: ComponentStoryFn<typeof ChoiceGroup> = ({
  register: _,
  watch: __,
  ...args
}) => {
  const { register, watch } = useForm()

  return <ChoiceGroup register={register} watch={watch} {...args} />
}

export const Radio = Template.bind({})
Radio.args = {
  name: 'radio-group',
  type: 'radio',
  options: [
    {
      label: 'ตัวเลือกที่ 1',
      value: '1',
    },
    {
      label: 'ตัวเลือกที่ 2',
      value: '2',
    },
    {
      label: 'ตัวเลือกที่ 3',
      value: '3',
    },
  ],
}

export const Checkbox = Template.bind({})
Checkbox.args = {
  name: 'checkbox-group',
  type: 'checkbox',
  options: [
    {
      label: 'ตัวเลือกที่ 1',
      value: '1',
    },
    {
      label: 'ตัวเลือกที่ 2',
      value: '2',
    },
    {
      label: 'ตัวเลือกที่ 3',
      value: '3',
    },
  ],
}
