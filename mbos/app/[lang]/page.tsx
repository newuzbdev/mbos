import Contacts from '@/components/Contacts'
import Values from '@/components/Values'
import Home from '@/components/Home'
import Services from '@/components/Services'
import Products from '@/components/Products'
import Team from '@/components/Team'
import Technologies from '@/components/Technologies'
import About from '@/components/About'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'

export default async function page(props: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await props.params
  const t = await getDictionary(lang)
  return (
    <main>
      <Home t={t} />
      <About t={t} />
      <Services t={t} />
      <Products t={t} />
      <Team t={t} />
      {/* <Technologies t={t} /> */}
      <Contacts t={t} />
      <Values t={t} />
    </main>
  )
}
