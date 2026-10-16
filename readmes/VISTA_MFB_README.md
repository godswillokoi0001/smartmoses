# Vista MFB — Website Frontend Implementation

> A design-to-code implementation for Vista Microfinance Bank, faithfully translating a supplied Figma design into a responsive, high-performance React web experience.

**Live Website:** [https://vistamfb.com/](https://vistamfb.com/)  
**Repository:** [https://github.com/godswillokoi0001/vista](https://github.com/godswillokoi0001/vista)

---

## Project Overview

Vista MFB is a digital-first microfinance institution providing banking, savings, and credit solutions. The project's goal was to take an existing Figma design specification and translate it into a fully deployed, pixel-accurate web frontend without compromising on visual direction or user experience.

### Context & Contribution

- **Agency Context:** Completed while working as a frontend developer at **Technolix Digitals**.
- **Role:** Design-to-code implementation. *(Note: The original visual UI was supplied in Figma; my responsibility was translating that design into production code).*
- **Key Contributions:**
  - Accurately translated complex layouts, typography scales, spacing units, and brand colors from Figma into code.
  - Implemented the core page structure, including **Home**, **About**, and **Contact** pages.
  - Built smooth page transitions and interactive components using Framer Motion.
  - Handled responsive breakpoints to guarantee stability on both mobile phones and desktop displays.

---

## Key Features

- **Page Architecture:** Clean route-based navigation spanning Home, About, and Contact pages.
- **Precision Styling:** Component-level styling adhering strictly to the client's visual hierarchy.
- **Fluid Breakpoints:** Mobile-first responsive implementation ensuring full layout integrity on phones and tablets.
- **Interactive UI Primitives:** Accessible accordions, selectors, and modals built with Radix UI and Tailwind CSS.
- **Motion Polish:** Subtle micro-interactions and route transitions powered by Framer Motion.

---

## Technology Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript / JavaScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS, PostCSS, Class Variance Authority (`cva`), `clsx`, `tailwind-merge`
- **UI Components:** Radix UI primitives (`@radix-ui/react-accordion`, `@radix-ui/react-select`, `@radix-ui/react-slot`)
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/godswillokoi0001/vista.git
   cd vista
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the site.

4. Build for production:
   ```bash
   npm run build
   ```

---

## License & Credits

- Frontend implementation by **Godswill Okoi** at **Technolix Digitals**.
- Original brand design and trademark belong to Vista Microfinance Bank.
