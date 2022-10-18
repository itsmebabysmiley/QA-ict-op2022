import type { FC } from 'react'

interface TextBoxProps {
  text: string
}

const TextBox: FC<TextBoxProps> = ({ text }) => {
  return (
    <div className="h-96 overflow-hidden rounded-xl bg-white p-5 shadow-lg">
      <div className="h-full overflow-y-scroll text-justify">
        <div>{text}</div>
      </div>
    </div>
  )
}

export default TextBox
