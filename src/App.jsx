import React, { useMemo, useState } from "react";

// Front‑end demo with textareas instead of text boxes for input fields.

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-400">{label}{required && " *"}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-block rounded-full border border-slate-600 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300">
      {children}
    </span>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-2xl bg-slate-900 p-6 shadow-xl ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function Toast({ text }) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {
    if (text) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2200);
      return () => clearTimeout(t);
    }
  }, [text]);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 shadow-lg">
        {text}
      </div>
    </div>
  );
}

export default function WebToZohoPreviewDemo() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const invalid = useMemo(() => {
    const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(form.email || "");
    return !form.lastName?.trim() || !emailOk;
  }, [form]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onPreview(e) {
    e.preventDefault();
    if (invalid) return;
    setPreviewOpen(true);
  }

  function PreviewContent() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Web → Zoho Lead (Preview Demo)</h1>
      <p>If you see this, the Vercel build is wired correctly.</p>
    </div>
  );
}

  async function onConfirm() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setPreviewOpen(false);
    setToast("Sent to Zoho (simulated)");
    setForm({ firstName: "", lastName: "", company: "", email: "", phone: "", message: "", utm_source: "", utm_medium: "", utm_campaign: "" });
  }

  return (
    <div className="min-h-[60vh] w-full bg-slate-950 py-8 text-slate-100">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-2xl font-semibold mb-4">Website Enquiry → Zoho CRM</h1>
        <form onSubmit={onPreview} className="grid gap-4 bg-slate-900 p-6 rounded-2xl">
          <Field label="First name">
            <textarea name="firstName" value={form.firstName} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="2" />
          </Field>
          <Field label="Last name" required>
            <textarea name="lastName" value={form.lastName} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="2" required />
          </Field>
          <Field label="Company">
            <textarea name="company" value={form.company} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="2" />
          </Field>
          <Field label="Email" required>
            <textarea name="email" value={form.email} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="2" required />
          </Field>
          <Field label="Phone">
            <textarea name="phone" value={form.phone} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="2" />
          </Field>
          <Field label="Message">
            <textarea name="message" value={form.message} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="4" />
          </Field>
          <details className="rounded-xl border border-slate-700 bg-slate-950/40 p-3">
            <summary className="cursor-pointer text-sm text-slate-300">UTM (optional)</summary>
            <div className="mt-3 grid gap-2">
              <textarea name="utm_source" placeholder="utm_source" value={form.utm_source} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="2" />
              <textarea name="utm_medium" placeholder="utm_medium" value={form.utm_medium} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="2" />
              <textarea name="utm_campaign" placeholder="utm_campaign" value={form.utm_campaign} onChange={onChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" rows="2" />
            </div>
          </details>
          <div className="flex gap-3">
            <button className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white shadow-lg hover:bg-indigo-500 disabled:opacity-60" disabled={invalid}>Preview</button>
            {invalid && <span className="text-sm text-slate-400">Enter valid Email and Last name.</span>}
          </div>
        </form>

        <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
          <h3 className="text-lg font-semibold mb-2">Preview Lead</h3>
          <div className="my-4 divide-y divide-slate-800 border border-slate-700 rounded-2xl">
            {Object.entries(form).map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-3 px-4 py-2 text-sm">
                <div className="text-slate-400">{k}</div>
                <div className="col-span-2">{v || '—'}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setPreviewOpen(false)} className="rounded-xl bg-slate-800 px-4 py-2 text-slate-200">Edit</button>
            <button onClick={onConfirm} disabled={submitting} className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white">{submitting ? 'Submitting…' : 'Send to Zoho'}</button>
          </div>
        </Modal>

        <Toast text={toast} />
      </div>
    </div>
  );
}