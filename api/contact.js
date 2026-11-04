const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME_LENGTH = 120
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 6000

export default async function contact(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    return response.status(503).json({ error: 'Contact delivery is not configured.' })
  }

  let payload
  try {
    payload = typeof request.body === 'string' ? JSON.parse(request.body) : request.body
  } catch {
    return response.status(400).json({ error: 'Invalid request.' })
  }

  const name = typeof payload?.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload?.email === 'string' ? payload.email.trim() : ''
  const message = typeof payload?.message === 'string' ? payload.message.trim() : ''
  const website = typeof payload?.website === 'string' ? payload.website.trim() : ''

  if (website) return response.status(200).json({ ok: true })
  if (
    !name || name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email) ||
    !message || message.length > MAX_MESSAGE_LENGTH
  ) {
    return response.status(400).json({ error: 'Please check the form fields.' })
  }

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL || 'smartmoses515@outlook.com'],
        reply_to: email,
        subject: `Portfolio enquiry from ${name.replace(/[\r\n]/g, ' ')}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    })

    if (!delivery.ok) return response.status(502).json({ error: 'Message delivery failed.' })
    return response.status(200).json({ ok: true })
  } catch {
    return response.status(502).json({ error: 'Message delivery failed.' })
  }
}
