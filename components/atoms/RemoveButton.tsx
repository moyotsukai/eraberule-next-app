import React from 'react'
import { css } from '@emotion/react'
import { errorColor, errorDisabledColor } from '../../styles/colors'
import { motion } from 'framer-motion'
import RemoveIcon from '../icons/RemoveIcon'

type Props = {
  onClick: () => void
  isEnabled: boolean
}

const RemoveButton: React.FC<Props> = (props) => {
  if (props.isEnabled) {
    return (
      <motion.button
        onClick={props.onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        css={() => removeButtonStyle(props.isEnabled)}
      >
        <RemoveIcon color={errorColor} />
      </motion.button>
    )
  } else {
    return (
      <button
        disabled={true}
        css={() => removeButtonStyle(props.isEnabled)}
      >
        <RemoveIcon color={errorDisabledColor} />
      </button>
    )
  }
}

const removeButtonStyle = (isEnabled) => css`
  margin-right: 10px;
  background-color: rgb(0, 0, 0, 0);
  cursor: ${isEnabled ? "pointer" : "default"};
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  border: none;

  &:focus {
    outline: none;
  }
`

export default RemoveButton