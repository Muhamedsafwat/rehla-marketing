import GetWorkById from '@/app/(frontend)/[locale]/_actions/GetWorkByID'
import Work from './_components/Work'
const Page = async ({ params }) => {
  await new Promise((resolve) => setTimeout(resolve, 4000))

  const { locale, id } = await params
  const work = await GetWorkById(id)

  return (
    <div>
      <Work work={work} locale={locale} />
    </div>
  )
}

export default Page
