import { useState } from 'react'
import QRCode from 'qrcode'
import { log } from '../utils/log'

export const useQrcode = (text: string) => {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [isLoadingImageUrl, setIsLoadingImageUrl] = useState<boolean>(true)
  const imageName = "eraberule_qrcode.png"

  QRCode.toDataURL(text ?? "").then((url) => {
    setImageUrl(url)
  }).catch((error) => {
    log("useQrcode, ", error)
  }).finally(() => {
    setIsLoadingImageUrl(false)
  })

  return { imageUrl, imageName, isLoadingImageUrl }
}