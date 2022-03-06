import React from 'react'
import { css } from '@emotion/react'
import Card from '../ui/Card'
import SupportingTextCell from '../ui/SupportingTextCell'
import TextCell from '../ui/TextCell'
import Spacer from '../ui/Spacer'
import QRCode from 'qrcode.react'
import { useLocale } from '../../hooks/useLocale'

type Props = {
  title: string
  url: string
}

const ShareTemplate: React.FC<Props> = (props) => {
  const { t } = useLocale()
  const localizedString = t.templates.shareTemplate

  return (
    <div css={layoutStyle}>
      <Spacer y="25px" />
      <TextCell>
        <div css={textStyle}>
          {localizedString.createdRoom}
        </div>
      </TextCell>

      <Card>
        <SupportingTextCell textAlign="left">
          {localizedString.explanation}
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          {localizedString.title}
        </SupportingTextCell>
        <TextCell>
          {props.title}
        </TextCell>
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          {localizedString.qrCode}
        </SupportingTextCell>
        {props.url &&
          <div>
            <QRCode value={props.url} id="rqCode" />
          </div>
        }
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          {localizedString.link}
        </SupportingTextCell>
        {props.url &&
          <TextCell>
            {props.url}
          </TextCell>
        }
      </Card>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  padding: 0 15px;
`
const textStyle = css`
  text-align: center;
`

export default ShareTemplate