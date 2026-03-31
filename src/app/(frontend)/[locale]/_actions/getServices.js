export default async function GetServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.status}`)
    }

    const data = await res.json()

    return data?.docs || []
  } catch (err) {
    console.error('Error in GetServices:', err)
    return []
  }
}
