import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import Card from '../ui/Card'
import SupportingTextCell from '../ui/SupportingTextCell'
import TextCell from '../ui/TextCell'
import Spacer from '../ui/Spacer'
import { useLocale } from '../../hooks/useLocale'
import QRCode from 'qrcode'
import TextButton from '../ui/TextButton'
import Image from 'next/image'

type Props = {
  title: string
  roomLink: string
}

const ShareTemplate: React.FC<Props> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>("")
  const { t } = useLocale()
  const localizedString = t.templates.shareTemplate
  const [isCopied, setIsCopied] = useState<boolean>(false)

  useEffect(() => {
    if (!props.roomLink) { return }
    QRCode.toDataURL(props.roomLink, (_, url) => {
      setImageUrl(url)
    })
  }, [props.roomLink])

  const onDownload = () => {
    const downloadLink = document.createElement("a")
    downloadLink.href = imageUrl
    downloadLink.download = "eraberule_qrcode.png"
    downloadLink.click()
  }

  const onCopy = () => {
    navigator.clipboard?.writeText(props.roomLink)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

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
        {imageUrl &&
          <div>
            <Image src={imageUrl} width={180} height={180} css={imageStyle} />
            <div css={textButtonContainerStyle}>
              <TextButton onClick={onDownload}>
                {localizedString.download}
              </TextButton>
            </div>
          </div>
        }
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          {localizedString.link}
        </SupportingTextCell>
        {props.roomLink &&
          <div>
            <TextCell>
              {props.roomLink}
            </TextCell>
            <div css={textButtonContainerStyle}>
              <TextButton onClick={onCopy}>
                {isCopied
                  ? localizedString.copied
                  : localizedString.copy}
              </TextButton>
            </div>
          </div>
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
const imageStyle = css`
  width: 180px;
  height: 180px;
  margin: 0 auto;
`
const textButtonContainerStyle = css`
  text-align: left;
  margin: 0 10px;
`

export default ShareTemplate