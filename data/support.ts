/** Placeholder support content — edit freely. */
export const supportPages = {
  shipping: {
    title: "Shipping",
    subtitle: "Where we ship, how long it takes, and what it costs.",
    sections: [
      {
        q: "Where do you ship?",
        a: "We currently ship pan-India. International shipping is coming soon — join the newsletter to hear first.",
      },
      {
        q: "How much does shipping cost?",
        a: "Flat ₹79 shipping on orders under ₹1,499. Orders of ₹1,499 and above ship free.",
      },
      {
        q: "How long will my order take?",
        a: "Orders are dispatched within 1–2 business days and typically arrive in 3–6 business days depending on your location.",
      },
      {
        q: "Can I track my order?",
        a: "Yes — you'll receive a tracking link by SMS/email as soon as your order ships.",
      },
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    subtitle: "Easy 7-day returns. We want you to love the fit.",
    sections: [
      {
        q: "What is your return window?",
        a: "You can request a return or exchange within 7 days of delivery, provided tags are intact and the item is unworn and unwashed.",
      },
      {
        q: "How do I start a return?",
        a: "Email info@thesmalltalkstore.com or message us on WhatsApp with your order number and we'll arrange a pickup.",
      },
      {
        q: "When will I get my refund?",
        a: "Refunds are processed to the original payment method within 5–7 business days of the returned item passing quality check.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Absolutely — size exchanges are free, subject to availability.",
      },
    ],
  },
  faq: {
    title: "FAQ",
    subtitle: "Quick answers to the things people ask most.",
    sections: [
      {
        q: "What fabrics do you use?",
        a: "Our tees use 100% combed cotton (180–240 GSM) and our polos use a premium cotton piqué. Each product page lists the exact composition.",
      },
      {
        q: "How do your sizes run?",
        a: "Our regular fits are true to size; the Heavyweight Tee is intentionally boxy. Check the size guide on each product page.",
      },
      {
        q: "How should I care for my garments?",
        a: "Machine wash cold inside-out, tumble dry low, and avoid bleach to keep colours and shape looking their best.",
      },
      {
        q: "Do you offer bulk / corporate orders?",
        a: "Yes! Reach out via the contact page or WhatsApp for wholesale and corporate gifting enquiries.",
      },
    ],
  },
} as const;

export type SupportSlug = keyof typeof supportPages;
