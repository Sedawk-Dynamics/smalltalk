/**
 * Accepted-payment badges rendered as logos (inline SVG on white chips)
 * instead of plain text. Swap/extend as the client's payment partners change.
 */

const chip =
  "flex h-7 w-11 items-center justify-center rounded-md bg-white shadow-sm";

function Visa() {
  return (
    <span className={chip} title="Visa" aria-label="Visa">
      <svg viewBox="0 0 48 16" className="h-3" role="img" aria-hidden>
        <text
          x="24"
          y="13"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontStyle="italic"
          fontSize="15"
          letterSpacing="0.5"
          fill="#1A1F71"
        >
          VISA
        </text>
      </svg>
    </span>
  );
}

function Mastercard() {
  return (
    <span className={chip} title="Mastercard" aria-label="Mastercard">
      <svg viewBox="0 0 40 24" className="h-4" role="img" aria-hidden>
        <circle cx="15" cy="12" r="8" fill="#EB001B" />
        <circle cx="25" cy="12" r="8" fill="#F79E1B" />
        <ellipse cx="20" cy="12" rx="3" ry="6" fill="#FF5F00" />
      </svg>
    </span>
  );
}

function Amex() {
  return (
    <span className={chip} title="American Express" aria-label="American Express">
      <svg viewBox="0 0 44 24" className="h-5" role="img" aria-hidden>
        <rect width="44" height="24" rx="3" fill="#006FCF" />
        <text
          x="22"
          y="15"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="9"
          letterSpacing="0.5"
          fill="#ffffff"
        >
          AMEX
        </text>
      </svg>
    </span>
  );
}

function Rupay() {
  return (
    <span className={chip} title="RuPay" aria-label="RuPay">
      <svg viewBox="0 0 52 16" className="h-3" role="img" aria-hidden>
        <text
          x="0"
          y="13"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="14"
        >
          <tspan fill="#1B458F">Ru</tspan>
          <tspan fill="#F37021">Pay</tspan>
        </text>
      </svg>
    </span>
  );
}

function Upi() {
  return (
    <span className={chip} title="UPI" aria-label="UPI">
      <svg viewBox="0 0 34 16" className="h-3.5" role="img" aria-hidden>
        <text
          x="0"
          y="13"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="14"
        >
          <tspan fill="#F37021">U</tspan>
          <tspan fill="#0C8A3E">P</tspan>
          <tspan fill="#1B458F">I</tspan>
        </text>
      </svg>
    </span>
  );
}

export default function PaymentBadges({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}
      aria-label="Accepted payment methods"
    >
      <Visa />
      <Mastercard />
      <Rupay />
      <Upi />
      <Amex />
    </div>
  );
}
