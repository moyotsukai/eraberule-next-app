export const spaceToPlus = (text: string) => {
  const replaced = text.replace(/\s+/g, "+")

  return replaced
}