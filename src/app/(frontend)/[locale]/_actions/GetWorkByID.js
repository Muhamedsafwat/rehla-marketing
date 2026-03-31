export default async function GetWorkById(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Works/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.status}`)
    }

    const data = await res.json()

    return data
  } catch (err) {
    console.error('Error in GetServices:', err)
    return []
  }
}
