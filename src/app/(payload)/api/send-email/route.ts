import { getPayloadClient } from '@/app/(payload)/lib/GetPayloadClient'

export async function POST(req: Request) {
  const data = await req.json()
  const { selectedButton, selectedMarket, ...allFields } = data

  try {
    const payload = await getPayloadClient()

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f8f8; padding: 20px; color: #222;">
        <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; border: 1px solid #e0e0e0; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <h2 style="margin-top: 0; font-size: 22px; color: #b8860b; text-align: center;">✨ New Contact Form Submission</h2>
          <p style="font-size: 14px; text-align: center; color: #666;">You’ve received a new inquiry from the website</p>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />

          <p><strong style="color:#b8860b;">🟢 Selected Button:</strong> ${selectedButton || '-'}</p>
          <p><strong style="color:#b8860b;">🌐 Selected Market:</strong> ${selectedMarket || '-'}</p>

          ${Object.entries(allFields)
            .map(([key, value]) => {
              if (key.toLowerCase() === 'message') {
                return `
        <div style="margin-top: 15px; padding: 15px; background: #fdf6e3; border-left: 4px solid #b8860b; border-radius: 6px;">
          <p style="margin: 0; white-space: pre-line; font-size: 14px; line-height: 1.6; color: #444;">
            ${value || '-'}
          </p>
        </div>
      `
              } else {
                return `<p><strong style="color:#b8860b;">${key}:</strong> ${value || '-'}</p>`
              }
            })
            .join('')}


          <p style="margin-top: 25px; font-size: 12px; color: #aaa; text-align: center;">© ${new Date().getFullYear()} Business Partners. All rights reserved.</p>
        </div>
      </div>
    `

    await payload.sendEmail({
      to: 'info@rehlamarketing.com',
      from: process.env.SMTP_USER,
      subject: '📩 New Message from Rehla Client',
      html: htmlContent,
      text: `
New Contact Form Submission:

Selected Button: ${selectedButton || '-'}
Selected Market: ${selectedMarket || '-'}

${Object.entries(allFields)
  .map(([key, value]) => {
    if (key.toLowerCase() === 'message') {
      return `
Message:
${value || '-'}
      `
    } else {
      return `${key}: ${value || '-'}`
    }
  })
  .join('\n')}
`,
    })

    return new Response(JSON.stringify({ message: 'Email Was Sent Successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error While Sending Email:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
