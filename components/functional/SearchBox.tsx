import React, { useState } from 'react'
import { css } from '@emotion/react'
import SearchIcon from '../icons/SearchIcon'
import { primaryColor } from '../../styles/colors'
import InputSearch from '../ui/InputSearch'
import CircleButton from '../ui/CircleButton'

type Props = {
  value: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isValid: () => boolean
  onSubmit: () => void
}

const SearchBox: React.FC<Props> = (props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const onSubmit = () => {
    if (!props.isValid()) { return }
    setIsClicked(true)
    props.onSubmit()
  }

  return (
    <div css={layoutStyle}>
      <div css={inputContainerStyle}>
        <InputSearch
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onEnterKey={onSubmit}
          css={inputStyle}
        />
        <CircleButton
          onClick={onSubmit}
          isEnabled={!isClicked}
          isLoading={isClicked}
        >
          {!isClicked &&
            <SearchIcon color={primaryColor} />
          }
        </CircleButton>
      </div>
    </div >
  )
}

const layoutStyle = css`
  text-align: center;
`
const inputContainerStyle = css`
  display: inline-block;
  height: 45px;
  min-width: 240px;
  width: 86vw;
  max-width: 400px;
  position: relative;
`
const inputStyle = css`
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 16px;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: none;
  border: solid 1px rgb(200, 200, 200);
  border-radius: 6px;
  font-family: 'Noto Sans JP', sans-serif;
  -webkit-appearance: none;

  &:focus {
    border: solid 1px ${primaryColor};
    outline: none;
  }
`

export default SearchBox