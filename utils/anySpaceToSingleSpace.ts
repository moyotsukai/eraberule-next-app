//Any space, including zenkaku
export const anySpaceToSingleSpace = (text: string) => {
  const replaced = text.replace(/\s+/g, " ")

  return replaced
}