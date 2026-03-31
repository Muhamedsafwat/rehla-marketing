//@ts-nocheck
import { getPayload } from 'payload'
import config from '@/payload.config'

let payloadClient: Awaited<ReturnType<typeof getPayload>> | null = null

export const getPayloadClient = async () => {
  if (!payloadClient) {
    payloadClient = await getPayload({
      config,
      local: true,
    })
  }
  return payloadClient
}
