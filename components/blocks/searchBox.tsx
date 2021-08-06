import React from 'react'
import { css } from '@emotion/react'
import SearchIcon from '../icons/searchIcon'
import { primaryColor } from '../../styles/colors'
import InputLarge from '../atoms/inputSearch'
import { motion } from 'framer-motion'

type Props = {
  value: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEnterKey: () => void
}

const SearchBox: React.FC<Props> = (props) => {
  return (
    <div css={layoutStyle}>
      <div css={inputContainerStyle}>
        <InputLarge
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onEnterKey={props.onEnterKey}
          css={inputStyle}
        />
        <motion.button
          onClick={props.onEnterKey}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          css={buttonStyle}
        >
          <SearchIcon color="#fff" />
        </motion.button>
      </div>
    </div>
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

const buttonStyle = css`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${primaryColor};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &:focus {
    outline: none;
  }
`

export default SearchBox