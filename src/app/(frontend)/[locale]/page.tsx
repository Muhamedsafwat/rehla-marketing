import PhoneHeader from './_components/PhoneHeader/PhoneHeader'
import ImpArticles from './_components/ImportantArticles/ImpArticles'
import VideoClient from './_components/VideoPage/VideoClient'
import ServedPlaces from './_components/ServedPlaces/ServedPlaces'
import Work from './_components/Work/Work'
import Services from './_components/Services/Services'
import News from './_components/News/News'
import Contact from './_components/ContactUs/Contact'
import GetServedPlaces from './_actions/GetServedPlaces'
import GetServices from './_actions/getServices'
import GetArticles from './_actions/GetArticles'
import GetWorks from './_actions/GetWorks'
export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 4000))
  const [sliders, backendData, posts, works] = await Promise.all([
    GetServedPlaces(),
    GetServices(),
    GetArticles(),
    GetWorks(),
  ])

  return (
    <main className="relative">
      <PhoneHeader />
      <ImpArticles posts={posts} />
      <VideoClient />
      <ServedPlaces sliders={sliders} />
      <Work works={works} />
      <Services backendData={backendData} />
      <News posts={posts} />
      <Contact />
    </main>
  )
}
