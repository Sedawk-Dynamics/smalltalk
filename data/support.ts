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
        a: "We offer free shipping across India for all prepaid orders above ₹1,000. For Cash on Delivery orders, a nominal charge is applicable depending on the location.",
      },
      {
        q: "When will my order be dispatched?",
        a: "We strive to fulfil orders as soon as you place them. In most cases, your order will be dispatched within 1–2 business days. Our business days are Monday–Friday.",
      },
      {
        q: "How long will delivery take?",
        a: "For most serviceable pin codes, we deliver within 5 days. There could be a possible delay of 2–3 business days in delivery — you'll be able to track your package throughout using the unique tracking link we send you.",
      },
      {
        q: "Can I track my order?",
        a: "Yes — you'll receive a tracking number in your inbox (email/SMS) as soon as your order ships to our delivery partner.",
      },
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    subtitle: "7-days free return & exchanges. We want you to love the fit.",
    sections: [
      {
        q: "What is your return window?",
        a: "The Small Talk Store products are eligible for return or exchange within 7 days of delivery, provided the original tags are intact and the item is unworn, unwashed and unsoiled. There are NO CHARGES to exchange the products — it's on us!",
      },
      {
        q: "How does the return / exchange process work?",
        a: "Email info@thesmalltalkstore.com or message us on WhatsApp with your order number. Once your request is verified by our support team, reverse pickup is initiated within 24 hours, and the product is picked up by our logistics partner within the next 1–2 days.",
      },
      {
        q: "Where does the pickup and exchange delivery happen?",
        a: "Pickup can only happen from the address the product was delivered to. For exchanges, the delivery address will be the same as the address on the original order.",
      },
      {
        q: "Can a pickup be refused?",
        a: "Yes — the courier can refuse the pickup if the original tags are not intact, or where it's obvious that the item has been worn, washed, or soiled.",
      },
      {
        q: "When will I get my refund?",
        a: "Prepaid orders: the entire amount is refunded to your original payment mode, and bank refunds take 7–10 business days. Cash on Delivery orders: the refund is initiated to the bank account you provide at the time of raising the request.",
      },
      {
        q: "What should I do if I do not receive my refund?",
        a: "We'll update you via email/SMS as soon as the refund is initiated. Bank refunds for prepaid orders take 7–10 business days. If you face any issues, reach out and our support team will help you out.",
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
