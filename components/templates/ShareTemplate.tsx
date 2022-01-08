import React from 'react'
import { css } from '@emotion/react'
import Card from '../../components/atoms/card'
import SupportingTextCell from '../../components/atoms/supportingTextCell'
import TextCell from '../../components/atoms/textCell'
import Spacer from '../../components/atoms/spacer'
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
        <SupportingTextCell shouldAlignLeft={true}>
          ルームのタイトルを検索する、QRコードを読み取る、またはリンクのURLにアクセスすることで投票に参加できます。
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          タイトル
        </SupportingTextCell>
        <TextCell>
          {props.title}
        </TextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          QRコード
        </SupportingTextCell>
        {props.url &&
          <div>
            <QRCode value={props.url} id="rqCode" />
          </div>
        }
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
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