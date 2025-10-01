import { getRequestConfig } from 'next-intl/server'
import {cookies, headers} from 'next/headers'

const supportLocale = ['cn', 'en'] as const;
const defaultLocale = 'cn'

function parseAcceptLanguage(lang: string | null): string[] {
  if (!lang) return [];

  return lang
    .split(',')
    .map((part) => {
      const [lang, qValue] = part.trim().split(';q=');
      return {
        lang,
        q: qValue ? parseFloat(qValue) : 1.0 // 默认 q=1
      };
    })
    .sort((a, b) => b.q - a.q) // 按权重降序
    .map((item) => item.lang);
}

const acceptLanguageToLocale = (lang: string[]): typeof supportLocale[number] => {
  for (const l of lang) {
    if (supportLocale.includes(l as typeof supportLocale[number])) {
      return l as typeof supportLocale[number];
    }
  }
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const headerLocale = (await headers()).get('accept-language');
  const cookiesLocale = (await cookies()).get('NEXT_LOCALE')?.value ;

  let locale: typeof supportLocale[number];
  if(supportLocale.includes(cookiesLocale as typeof supportLocale[number])) {
    locale = cookiesLocale as typeof supportLocale[number];
  }else {
    locale = acceptLanguageToLocale(parseAcceptLanguage(headerLocale));
  }

  return{
    locale: locale,
    messages: (await import(`./locales/${locale}.json`)).default
  }
})