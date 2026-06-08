"use client";

/** Contact form with client-side validation + success toast. */
import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useToast } from "@/components/providers/ToastProvider";
import { cn } from "@/lib/utils";

type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

export default function ContactForm() {
  const { toast } = useToast();
  const [values, setValues] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s()]{7,}$/.test(values.phone))
      e.phone = "Enter a valid phone number.";
    if (values.message.trim().length < 10)
      e.message = "Tell us a little more (10+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    // TODO: POST to your backend / form service (e.g. /api/contact, Formspree).
    setTimeout(() => {
      setSending(false);
      toast("Thanks! We'll be in touch shortly.");
      setValues({ name: "", email: "", phone: "", message: "" });
    }, 700);
  };

  const inputCls = (k: keyof Fields) =>
    cn(
      "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-mist focus:border-navy",
      errors[k] ? "border-glow" : "border-navy/20"
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            value={values.name}
            onChange={set("name")}
            placeholder="Your name"
            className={inputCls("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-glow">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone
          </label>
          <input
            id="phone"
            value={values.phone}
            onChange={set("phone")}
            placeholder="+91 ..."
            className={inputCls("phone")}
          />
          {errors.phone && <p className="mt-1 text-xs text-glow">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={set("email")}
          placeholder="you@example.com"
          className={inputCls("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-glow">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          placeholder="How can we help?"
          className={cn(inputCls("message"), "resize-none")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-glow">{errors.message}</p>
        )}
      </div>

      <MagneticButton type="submit" onClick={() => {}} withArrow={!sending}>
        {sending ? "Sending…" : "Send Message"}
      </MagneticButton>
    </form>
  );
}
