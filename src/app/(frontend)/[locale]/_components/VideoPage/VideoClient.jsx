'use client'

import { useTranslations } from 'next-intl'
import VideoContent from './VideoContent'

const VideoContentClient = () => {
  try {
    const t = useTranslations('Video')
    return <VideoContent t={t} />
  } catch (error) {
    console.error('NextIntlClientProvider not found:', error)
    return (
      <div className="text-red-500 p-4">
        NextIntlClientProvider is missing. Check your layout configuration.
      </div>
    )
  }
}

export default VideoContentClient
