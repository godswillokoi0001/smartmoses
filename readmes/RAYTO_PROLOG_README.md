# Rayto Prolog — Logistics Website

> A dedicated, modern corporate website for Rayto Prolog, designed to present freight, haulage, and supply chain logistics services clearly and streamline client inquiries.

**Live Website:** [https://www.raytoprolog.com/](https://www.raytoprolog.com/)  
**Repository:** [https://github.com/godswillokoi0001/rayto-prolog](https://github.com/godswillokoi0001/rayto-prolog)

---

## Project Overview

A logistics company requires a clear, reliable web presence to explain its capabilities, outline the industries it serves, and provide frictionless enquiry channels for prospective shippers and partners.

This client project was acquired and delivered through **Smotiva Digital Ltd**, where I am the Founder/CEO and also contributed hands-on as the frontend developer.

### My Role & Contribution

- **Business Understanding & Content Direction:** Worked with the client to understand core operational strengths and translated them into structured website copy and service explanations.
- **UI Direction & Interface Design:** Established a clean, corporate visual language suited for industrial and commercial logistics.
- **Frontend Development:** Implemented the entire website in React and TypeScript with Vite.
- **Information Architecture:** Built out dedicated service-detail pages, company background sections, and industry breakdown views.
- **Inquiry Channels:** Integrated both direct WhatsApp contact routing and a secure server-side email enquiry form.

---

## Key Features

- **Service Showcase:** Multi-section breakdown covering freight forwarding, haulage, warehousing, and customs clearance.
- **Industry Coverage:** Dedicated segments highlighting logistics solutions tailored to diverse commercial sectors.
- **Contact & Quote Inquiries:** Direct WhatsApp chat link and a structured contact form connected to a transactional email endpoint.
- **Responsive Layout:** Optimized for high readability across mobile viewports, tablets, and large desktop screens.
- **Performance & SEO:** Fast client-side rendering with semantic HTML and metadata.

---

## Technology Stack

- **Frontend Library:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Icons:** Lucide React
- **Email Delivery:** Resend (`api/contact.ts`)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/godswillokoi0001/rayto-prolog.git
   cd rayto-prolog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory (never commit secret keys to version control):
   ```text
   RESEND_API_KEY=your_resend_api_key_here
   RESEND_EMAIL_DOMAIN=your_verified_domain.com
   ```
   *Note: In production (e.g. Vercel), configure these in your deployment platform's Environment Variables settings.*

4. Run the local development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## License & Credits

- Developed by **Godswill Okoi** via **Smotiva Digital Ltd**.
- All brand marks and company assets belong to Rayto Prolog.

