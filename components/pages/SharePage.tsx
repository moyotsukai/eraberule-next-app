import React, { useState } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import Card from '../ui/Card'
import Spacer from '../ui/Spacer'
import SupportingTextCell from '../ui/SupportingTextCell'
import TextButton from '../ui/TextButton'
import TextCell from '../ui/TextCell'
import { useLocale } from '../../i18n/useLocale'
import { T_SHARE } from '../../locales/sharePage'
import { generateRoomLink } from '../../model/qrcode/generateRoomLink'
import { useQrcode } from '../../model/qrcode/useQrcode'
import LoadingProviderWithoutAuth from '../common/LoadingProviderWithoutAuth'

const SharePage: React.FC = () => {
  const { title, roomLink, isLoadingRouter } = generateRoomLink()
  const { imageUrl, imageName, isLoadingImageUrl } = useQrcode(roomLink)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const { t } = useLocale(T_SHARE)

  const onDownload = () => {
    const downloadLink = document.createElement("a")
    downloadLink.href = imageUrl
    downloadLink.download = imageName
    downloadLink.click()
  }

  const onCopy = () => {
    navigator.clipboard?.writeText(roomLink)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <LoadingProviderWithoutAuth isLoading={isLoadingRouter || isLoadingImageUrl}>
      <Spacer y="25px" />
      <TextCell>
        <div css={textStyle}>
          {t.CREATED}
        </div>
      </TextCell>

      <div css={cardContainerStyle}>
        <Card>
          <SupportingTextCell textAlign="left">
            {t.EXPLANATION}
          </SupportingTextCell>
          <Spacer y="15px" />

          <SupportingTextCell textAlign="left">
            {t.TITLE}
          </SupportingTextCell>
          <TextCell>
            {title}
          </TextCell>
          <Spacer y="15px" />

          <SupportingTextCell textAlign="left">
            {t.QR_CODE}
          </SupportingTextCell>
          {imageUrl &&
            <div>
              <Image src={imageUrl} width={180} height={180} css={imageStyle} />
              <div css={textButtonContainerStyle}>
                <TextButton onClick={onDownload}>
                  {t.DOWNLOAD}
                </TextButton>
              </div>
            </div>
          }
          <Spacer y="15px" />

          <SupportingTextCell textAlign="left">
            {t.LINK}
          </SupportingTextCell>
          {roomLink &&
            <div>
              <TextCell>
                {roomLink}
              </TextCell>
              <div css={textButtonContainerStyle}>
                <TextButton onClick={onCopy}>
                  {isCopied
                    ? t.COPIED
                    : t.COPY}
                </TextButton>
              </div>
            </div>
          }
        </Card>
      </div>
    </LoadingProviderWithoutAuth>
  )
}

const cardContainerStyle = css`
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

export default SharePage