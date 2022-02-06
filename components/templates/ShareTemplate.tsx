import React from 'react'
import { css } from '@emotion/react'
import Card from '../ui/Card'
import SupportingTextCell from '../ui/SupportingTextCell'
import TextCell from '../ui/TextCell'
import Spacer from '../ui/Spacer'
import QRCode from 'qrcode.react'

type Props = {
  title: string
  url: string
}

const ShareTemplate: React.FC<Props> = (props) => {
  return (
    <div css={layoutStyle}>
      <Spacer y="25px" />
      <TextCell>
        <div css={textStyle}>
          ルームを作成しました。
        </div>
      </TextCell>

      <Card>
        <SupportingTextCell textAlign="left">
          ルームのタイトルを検索する、QRコードを読み取る、またはリンクのURLにアクセスすることで投票に参加できます。
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          タイトル
        </SupportingTextCell>
        <TextCell>
          {props.title}
        </TextCell>
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          QRコード
        </SupportingTextCell>
        {props.url &&
          <div>
            <QRCode value={props.url} id="rqCode" />
          </div>
        }
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          リンク
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