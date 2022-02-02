import React from 'react'
import { css } from '@emotion/react'
import { primaryColor } from '../../styles/colors'

type Props = {
  value: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  // onEnterKey: () => void
}

const TextArea: React.FC<Props> = (props) => {
  // const onEnterKey: () => void = props.onEnterKey

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.keyCode === 13) {
  //     onEnterKey()
  //   }
  // }

  return (
    <div css={containerStyle}>
      <textarea
        value={props.value}
        placeholder={props.placeholder}
        rows={4}
        onChange={props.onChange}
        // onKeyDown={handleKeyDown}
        css={textAreaStyle}
      />
    </div>
  )
}
const containerStyle = css`
  padding: 0 10px;
`
const textAreaStyle = css`
  resize: none;
  width: 100%;
  background-color: #fff;
  font-size: 16px;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: none;
  border: solid 1px rgb(200, 200, 200);
  border-radius: 6px;
  font-family: 'Noto Sans JP', sans-serif;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &:focus {
    border: solid 1px ${primaryColor};
    outline: none;
  }
`

export default TextArea