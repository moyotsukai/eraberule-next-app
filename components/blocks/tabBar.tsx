import React from 'react'
import Tab from '../atoms/tab'
import { css } from '@emotion/react'
import { primaryShadowColor } from '../../styles/colors'

type Props = {
  path: string
}

interface Tabs {
  text: string
  path: string
}

const tabs: Tabs[] = [
  {
    text: "参加",
    path: "/",
  },
  {
    text: "作成",
    path: "/create",
  }
]

const TabBar: React.FC<Props> = (props) => {
  const path = props.path

  return (
    <div css={tabBarStyle}>
      {tabs.map((tab, index) => {
        const isSelected = (path === tab.path)

        return (
          <Tab text={tab.text} path={tab.path} isSelected={isSelected} key={index} />
        )
      })}
    </div>
  )
}

const tabBarStyle = css`
  display: flex;
  justify-content: space-around;
  padding: 0 2px;
  font-family: 'Noto Sans JP', sans-serif;
  background-color: #fff;
  border-bottom: 1px solid rgb(220, 220, 220);
  box-shadow: 0 2px 5px 0 ${primaryShadowColor};
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`

export default TabBar