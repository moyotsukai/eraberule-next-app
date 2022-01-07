import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useQuery } from '../../hooks/useQuery'
import Card from '../../components/atoms/card'
import SupportingTextCell from '../../components/atoms/supportingTextCell'
import TextCell from '../../components/atoms/textCell'
import Spacer from '../../components/atoms/spacer'
import QRCode from 'qrcode.react'

const SharePage: React.FC = () => {
  const title = useQuery("title")
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (title !== "") {
      setUrl(`https://app.eraberule.com/room?q=${title}`)
    }
  }, [title])

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
          ルームのタイトルを検索、またはQRコードを読み取ることで投票に参加できます。
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          タイトル
        </SupportingTextCell>
        <TextCell>
          {title}
        </TextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          QRコード
        </SupportingTextCell>
        {url &&
          <div>
            <QRCode value={url} id="rqCode" />
          </div>
        }
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          リンク
        </SupportingTextCell>
        {url &&
          <TextCell>
            {url}
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

export default SharePage