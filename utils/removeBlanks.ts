export const removeBlanks = (text: string) => {
  const replaced = text.replace(/\s+/g, "")

  return replaced
}