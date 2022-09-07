const LANGUAGES = ["ja", "en"] as const

export type Language = (typeof LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = LANGUAGES[0]

const LANGUAGES_SET = new Set<string>(LANGUAGES)

export const isLanguage = (locale: string): locale is Language => {
  return LANGUAGES_SET.has(locale)
}

type FunctionalString = (...args: string[]) => string

type Localized = string | FunctionalString

type LocalizedTextSet = {
  [key in Language]: string
}

type LocalizedFunctionSet = {
  [key in Language]: (...args: string[]) => string
}

export type LocaleTable<T> = {
  [K in keyof T]: K extends `$${infer _}`
  ? LocalizedFunctionSet
  : LocalizedTextSet
}

export const asLocaleTable = <T>(table: LocaleTable<T>) => {
  return table
}

type ProxyTerminal<T> = {
  [key in keyof LocaleTable<T>]: key extends `$${infer _}`
  ? FunctionalString
  : string
}

type Setting = {
  language: Language,
}

export class I18n<T extends LocaleTable<T>> {
  public readonly t: ProxyTerminal<T>

  constructor(private readonly table: T, private setting: Setting) {
    const proxyHandler = {
      get: (_: never, prop: keyof T): Localized => {
        return this.resolver(prop)
      }
    }

    this.t = new Proxy(table, proxyHandler as ProxyHandler<T>) as unknown as ProxyTerminal<T>
  }

  private resolver(prop: keyof LocaleTable<T>) {
    return this.table[prop][this.setting.language]
  }
}
