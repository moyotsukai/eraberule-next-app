import React from 'react'
import Tab from '../ui/Tab'
import { css } from '@emotion/react'
import { primaryShadowColor } from '../../styles/colors'
import { useLocale } from '../../i18n/useLocale'
import { T_TAB_BAR } from '../../locales/tabBar'

type Tabs = {
  text: string
  path: string
  match: string[]
}

type TabTexts = {
  vote: string,
  create: string
}

const createTabs = (text: TabTexts): Tabs[] => {
  return [
    {
      text: text.vote,
      path: "/",
      match: ["/", "/room", "/room/vote", "/room/result"],
    },
    {
      text: text.create,
      path: "/create",
      match: ["/create", "/create/new", "/create/suggest", "/create/share"],
    }
  ]
}

type Props = {
  path: string
}

const TabBar: React.FC<Props> = (props) => {
  const { t } = useLocale(T_TAB_BAR)
  const tabs = createTabs({ vote: t.VOTE, create: t.CREATE })

  return (
    <nav css={tabBarStyle}>
      {tabs.map((tab, index) => {
        const isSelected = (tab.match.indexOf(props.path) !== -1)

        return (
          <Tab text={tab.text} path={tab.path} isSelected={isSelected} key={index} />
        )
      })}
    </nav>
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
  transform: translate3d(0, 0, 0);
  z-index: 999;
`

export default TabBar