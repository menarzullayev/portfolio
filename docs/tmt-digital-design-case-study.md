# TMT Digital Design Case Study

Concept case study prepared for **TEXTILE MILL TASHKENT**.

## Deliverables

- Digital audit and information architecture
- Responsive corporate website concept
- Product catalog and product-detail UX
- Production / machine monitoring dashboard concept
- Social media design system
- Working Next.js case-study page

## Research basis

The public TMT website currently presents socks and footwear production, a Nurafshon address, 20M+ pairs/year, 500+ knitting machines, export orientation, product categories, certifications and contract/custom-order capability.

Source: https://tmtsocks.uz/

This is a candidate-facing design proposal, not an official TMT redesign. Publicly sourced company facts should be revalidated with TMT before production use.

## Prototype

The implementation lives at:

- `src/app/[locale]/tmt-case/page.tsx`

Expected route:

- `/uz/tmt-case`
- `/en/tmt-case`

## Design

Figma:
https://www.figma.com/design/zJTwXHnOFMFezR3iJsMtLh

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS 4
- Vercel-compatible deployment

## Notes

The production dashboard is intentionally a concept UI. Values such as production counts and machine states are illustrative and must not be presented as live TMT operational data.
