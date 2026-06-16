/**
 * ============================================================
 * LEGAL CONTENT — Terms, Privacy, Refund/Cancellation
 *
 * LEGAL DISCLAIMER: This is an initial DRAFT for review. It is NOT legal advice.
 * A qualified lawyer must review and finalize before publishing. India e-commerce
 * touchpoints to confirm with counsel include the Consumer Protection
 * (E-Commerce) Rules, 2020, the DPDP Act 2023 (privacy), and applicable GST rules.
 * Items needing client confirmation are marked "TBD — confirm".
 * ============================================================
 */
import { brand } from "./content";

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  slug: "terms" | "privacy" | "refund";
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const entityLine = `${brand.name} ("we", "us", "our") is a brand operated by ${brand.legalEntity}, registered at ${brand.address} (GSTIN ${brand.gstin}). You can reach us at ${brand.email} or ${brand.phone}.`;

export const terms: LegalDoc = {
  slug: "terms",
  title: "Terms & Conditions",
  updated: "Last updated: TBD — confirm before publishing",
  intro:
    "These Terms & Conditions govern your access to and use of this website and your purchase of products from us. By using the site or placing an order, you agree to these terms. Please read them carefully.",
  sections: [
    {
      heading: "1. About us & acceptance of terms",
      body: [
        entityLine,
        "By accessing, browsing, or purchasing from this website you confirm that you accept these Terms & Conditions and agree to comply with them. If you do not agree, please do not use the site.",
      ],
    },
    {
      heading: "2. Definitions",
      body: [
        "“Site” means this website and all of its pages. “Products” means the apparel and goods offered for sale. “Order” means your request to purchase Products. “You”/“Customer” means the person accessing the Site or placing an Order.",
      ],
    },
    {
      heading: "3. Eligibility & accounts",
      body: [
        "You must be at least 18 years old (or have the consent of a parent/legal guardian) and capable of entering into a legally binding contract under the Indian Contract Act, 1872 to place an Order.",
        "If you create an account, you are responsible for keeping your login credentials confidential and for all activity under your account. Notify us immediately of any unauthorised use.",
      ],
    },
    {
      heading: "4. Products & availability",
      body: [
        "We make every effort to display Product colours, fabrics, and details accurately, but cannot guarantee that your device displays colours accurately. Slight variations in fabric, colour, and measurement may occur and are not defects.",
        "All Products are subject to availability. We may limit quantities, discontinue any Product, or correct errors in descriptions or pricing at any time without prior notice.",
      ],
    },
    {
      heading: "5. Pricing, taxes & payment",
      body: [
        "All prices are listed in Indian Rupees (₹/INR) and are inclusive of applicable Goods and Services Tax (GST) unless stated otherwise. Shipping charges, where applicable, are shown at checkout.",
        "We reserve the right to change prices at any time. In the event a Product is listed at an incorrect price due to a technical error, we may cancel the Order and refund any amount paid.",
        "Payments are processed through third-party payment gateways. By paying, you agree to that gateway's terms. We do not store your full card details. (TBD — confirm payment gateway provider.)",
      ],
    },
    {
      heading: "6. Orders & order acceptance",
      body: [
        "Your Order is an offer to buy. An Order is only accepted when we send a confirmation of dispatch; until then we may decline or cancel the Order (for example, due to stock, suspected fraud, or pricing errors), in which case any payment will be refunded.",
      ],
    },
    {
      heading: "7. Shipping & delivery",
      body: [
        "We currently ship across India. Estimated dispatch and delivery timelines, and any shipping charges, are described on our Shipping page. Delivery timelines are estimates and not guaranteed.",
      ],
    },
    {
      heading: "8. Returns, refunds & cancellations",
      body: [
        "Returns, exchanges, refunds, and cancellations are governed by our Refund & Cancellation Policy. Please review it before purchasing.",
      ],
    },
    {
      heading: "9. Intellectual property",
      body: [
        `All content on the Site — including the ${brand.name} name, logo, designs, graphics, text, and images — is owned by or licensed to ${brand.legalEntity} and protected by applicable intellectual-property laws. You may not copy, reproduce, or use it without our prior written permission.`,
      ],
    },
    {
      heading: "10. Acceptable use",
      body: [
        "You agree not to use the Site for any unlawful purpose, to attempt to gain unauthorised access, to introduce malicious code, or to interfere with the Site's operation or other users' use of it.",
      ],
    },
    {
      heading: "11. Third-party links",
      body: [
        "The Site may contain links to third-party websites or services that we do not control. We are not responsible for their content, policies, or practices.",
      ],
    },
    {
      heading: "12. Disclaimers & limitation of liability",
      body: [
        "The Site and Products are provided on an “as is” and “as available” basis. To the maximum extent permitted by law, we disclaim implied warranties and are not liable for indirect, incidental, or consequential losses arising from your use of the Site. Nothing in these terms limits liability that cannot be excluded under the Consumer Protection Act, 2019. (TBD — confirm liability cap with counsel.)",
      ],
    },
    {
      heading: "13. Indemnification",
      body: [
        "You agree to indemnify and hold harmless us and our officers, directors, and employees from any claims or expenses arising out of your breach of these terms or misuse of the Site.",
      ],
    },
    {
      heading: "14. Governing law & jurisdiction",
      body: [
        "These terms are governed by the laws of India. Subject to the dispute-resolution clause below, the courts at New Delhi shall have exclusive jurisdiction.",
      ],
    },
    {
      heading: "15. Dispute resolution",
      body: [
        "We aim to resolve concerns amicably — please contact us first. Any unresolved dispute may be referred to arbitration/mediation as per applicable Indian law before approaching the courts at New Delhi. (TBD — confirm preferred dispute-resolution mechanism.)",
      ],
    },
    {
      heading: "16. Changes to these terms",
      body: [
        "We may update these terms from time to time. The current version will always be available on this page with its effective date. Continued use of the Site after changes constitutes acceptance.",
      ],
    },
    {
      heading: "17. Contact",
      body: [entityLine],
    },
  ],
};

export const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  updated: "Last updated: TBD — confirm before publishing",
  intro:
    "This Privacy Policy explains what personal data we collect, why we collect it, and how we use and protect it when you use this website or buy from us.",
  sections: [
    {
      heading: "1. Who we are",
      body: [entityLine],
    },
    {
      heading: "2. Information we collect",
      body: [
        "Information you provide: name, email, phone, shipping/billing address, and order details. We do not store full payment-card numbers.",
        "Information collected automatically: device/browser data, IP address, and usage data via cookies and similar technologies, to operate and improve the Site.",
      ],
    },
    {
      heading: "3. How we use your information",
      body: [
        "To process and deliver orders, provide customer support, send order updates, prevent fraud, comply with legal obligations, and — with your consent — send marketing communications you can opt out of at any time.",
      ],
    },
    {
      heading: "4. Sharing your information",
      body: [
        "We share data with service providers strictly to run our business — payment gateways, logistics/courier partners, and analytics/communication tools — under appropriate safeguards. We do not sell your personal data.",
      ],
    },
    {
      heading: "5. Cookies",
      body: [
        "We use cookies to remember your cart, preferences, and to analyse traffic. You can control cookies through your browser settings; disabling some may affect site functionality.",
      ],
    },
    {
      heading: "6. Data retention & security",
      body: [
        "We retain personal data only as long as necessary for the purposes above or as required by law, and apply reasonable technical and organisational measures to protect it. No method of transmission is 100% secure.",
      ],
    },
    {
      heading: "7. Your rights",
      body: [
        "Subject to applicable law (including the Digital Personal Data Protection Act, 2023), you may request access to, correction, or deletion of your personal data, and withdraw consent. Contact us using the details below. (TBD — confirm DPDP compliance steps with counsel.)",
      ],
    },
    {
      heading: "8. Children's privacy",
      body: [
        "The Site is not directed to children under 18, and we do not knowingly collect their data.",
      ],
    },
    {
      heading: "9. Changes & contact",
      body: [
        "We may update this policy and will post changes here. For any privacy request, contact us:",
        entityLine,
      ],
    },
  ],
};

export const refund: LegalDoc = {
  slug: "refund",
  title: "Refund & Cancellation Policy",
  updated: "Last updated: TBD — confirm before publishing",
  intro:
    "We want you to love what you wear. This policy explains cancellations, returns, exchanges, and refunds. (All specific timelines below are TBD — confirm with client.)",
  sections: [
    {
      heading: "1. Order cancellation",
      body: [
        "You may request to cancel an Order before it is dispatched by contacting us as soon as possible. Once an Order has shipped, it cannot be cancelled but may be returned per the conditions below.",
      ],
    },
    {
      heading: "2. Returns & exchanges window",
      body: [
        "You may request a return or exchange within 7 days of delivery (TBD — confirm window), provided the item is unworn, unwashed, undamaged, with original tags and packaging intact.",
        "Certain items may be non-returnable for hygiene reasons; these will be marked on the Product page. (TBD — confirm list of non-returnable items.)",
      ],
    },
    {
      heading: "3. How to start a return",
      body: [
        `Email ${brand.email} or message us on WhatsApp at ${brand.phone} with your order number and reason. We will guide you through pickup or return shipping.`,
      ],
    },
    {
      heading: "4. Refunds",
      body: [
        "Once we receive and inspect your return, approved refunds are issued to your original payment method (or as store credit, if you prefer) within 5–7 business days (TBD — confirm). Shipping charges, if any, may be non-refundable.",
      ],
    },
    {
      heading: "5. Exchanges & size issues",
      body: [
        "Size exchanges are free subject to availability. If a replacement is unavailable, we will offer a refund or store credit.",
      ],
    },
    {
      heading: "6. Damaged, defective or wrong items",
      body: [
        "If you receive a damaged, defective, or incorrect item, contact us within 48 hours of delivery with photos. We will arrange a replacement or full refund, including any return shipping cost.",
      ],
    },
    {
      heading: "7. Contact",
      body: [entityLine],
    },
  ],
};

export const legalDocs = { terms, privacy, refund };
export type LegalSlug = keyof typeof legalDocs;
