
import { Locale } from "../i18n"
import { en } from "./en"
import { fr } from "./fr"


export const getDictionary = async (locale: Locale) => {
  return locale === "en" ? en : fr
}
