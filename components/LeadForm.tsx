"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Loader2,
  Mic,
  ImagePlus,
  X,
  Eye,
} from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";
import { cn, slugify } from "@/lib/utils";

const BUDGETS = [
  "Moins de 5 000 €",
  "5 000 € – 10 000 €",
  "10 000 € – 25 000 €",
  "25 000 € – 50 000 €",
  "Plus de 50 000 €",
  "Je ne sais pas encore",
];

const PROPERTY_TYPES = [
  "Maison",
  "Appartement",
  "Local professionnel",
  "Autre",
];

const MAX_PHOTOS = 8;

function countDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim());
}

function cityByPostal(code: string) {
  return CITIES.find((c) => c.postalCode === code.trim());
}

function cityByName(name: string) {
  const s = slugify(name);
  return CITIES.find((c) => c.slug === s);
}

// ---- Reconnaissance vocale (Web Speech API, natif du navigateur) ----
type SpeechRecognitionEvent = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function PhotoThumb({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [url] = useState(() => URL.createObjectURL(file));
  const [open, setOpen] = useState(false);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  return (
    <>
      <div className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={file.name} className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 m-auto flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Aperçu de la photo"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-0 top-0 z-10 flex h-5 w-5 items-center justify-center rounded-bl-lg bg-slate-900/70 text-white hover:bg-red-600"
          aria-label="Supprimer la photo"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={file.name}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
            aria-label="Fermer l'aperçu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

export function LeadForm({
  defaultService,
  defaultCity,
  compact = false,
}: {
  defaultService?: string;
  defaultCity?: string;
  compact?: boolean;
}) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [projectType, setProjectType] = useState(defaultService ?? "");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState(defaultCity ?? "");
  const [description, setDescription] = useState("");

  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [consentPartners, setConsentPartners] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [photoMessage, setPhotoMessage] = useState<string | null>(null);

  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- détection d'API navigateur, nécessaire côté client
    setSpeechSupported(getSpeechRecognition() !== null);
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const projectName = useMemo(
    () => SERVICES.find((s) => s.slug === projectType)?.name ?? "Travaux",
    [projectType]
  );

  function handlePostalChange(value: string) {
    setPostalCode(value);
    const found = cityByPostal(value);
    if (found) setCity(found.name);
  }

  function handleCityChange(value: string) {
    setCity(value);
    const found = cityByName(value);
    if (found) setPostalCode(found.postalCode);
  }

  function validatePhone(value: string) {
    if (!value.trim()) {
      setPhoneError(null);
      return true;
    }
    const digits = countDigits(value);
    if (digits !== 10) {
      setPhoneError(
        `Le numéro doit contenir 10 chiffres (${digits} saisi${digits > 1 ? "s" : ""}).`
      );
      return false;
    }
    setPhoneError(null);
    return true;
  }

  function validateEmail(value: string) {
    if (!value.trim()) {
      setEmailError(null);
      return true;
    }
    if (!isValidEmail(value)) {
      setEmailError("Adresse email invalide (ex : nom@exemple.fr).");
      return false;
    }
    setEmailError(null);
    return true;
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    const merged = [...photos, ...selected];
    if (merged.length > MAX_PHOTOS) {
      setPhotoMessage(
        `Vous avez sélectionné plus de ${MAX_PHOTOS} photos : seules les ${MAX_PHOTOS} premières ont été conservées.`
      );
    } else {
      setPhotoMessage(null);
    }
    setPhotos(merged.slice(0, MAX_PHOTOS));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleMic() {
    const ctor = getSpeechRecognition();
    if (!ctor) return;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setListening(false);
      return;
    }

    const rec = new ctor();
    rec.lang = "fr-FR";
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) text += e.results[i][0].transcript;
      }
      if (text.trim()) {
        setDescription((prev) =>
          prev.trim() ? `${prev} ${text.trim()}` : text.trim()
        );
      }
    };
    rec.onerror = () => {
      recognitionRef.current = null;
      setListening(false);
    };
    rec.onend = () => {
      recognitionRef.current = null;
      setListening(false);
    };
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }

  function resetForm() {
    setDone(false);
    setStep(1);
    setProjectType(defaultService ?? "");
    setPropertyType("");
    setBudget("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPostalCode("");
    setCity(defaultCity ?? "");
    setDescription("");
    setPhotos([]);
    setConsentPartners(false);
    setConsentMarketing(false);
    setPhoneError(null);
    setEmailError(null);
    setPhotoMessage(null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consentPartners) {
      setError(
        "Veuillez accepter la transmission de vos informations à nos partenaires pour continuer."
      );
      return;
    }
    if (!validatePhone(phone)) {
      setError("Veuillez corriger le numéro de téléphone.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Veuillez corriger l'adresse email.");
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("projectType", projectType);
      formData.append("propertyType", propertyType);
      formData.append("budget", budget);
      formData.append("postalCode", postalCode);
      formData.append("city", city);
      formData.append("description", description);
      photos.forEach((f) => formData.append("photos", f));

      const res = await fetch("/api/leads", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Une erreur est survenue.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-7 w-7 text-emerald-700" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900">
          Votre demande a bien été envoyée !
        </h3>
        <p className="mt-2 text-slate-600">
          Notre équipe vous recontacte sous <strong>72h</strong> pour un
          chiffrage gratuit et sans engagement de votre projet de {projectName}.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Un email de confirmation vous a été adressé.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link href="/blog" className="btn-accent">
            En attendant, lire nos guides
          </Link>
          <button type="button" onClick={resetForm} className="btn-primary">
            Faire un nouveau devis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("card overflow-hidden", !compact && "lg:p-8")}>
      {/* Progression */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                step >= i
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-500"
              )}
            >
              {i}
            </span>
            <span
              className={cn(
                "hidden text-xs font-medium sm:block",
                step >= i ? "text-slate-900" : "text-slate-400"
              )}
            >
              {i === 1 ? "Travaux" : i === 2 ? "Bien" : "Contact"}
            </span>
            {i < 3 && <div className="h-px flex-1 bg-slate-200" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Quel type de travaux ?
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setProjectType(s.slug)}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
                    projectType === s.slug
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
                  )}
                >
                  {s.name}
                  {projectType === s.slug && (
                    <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Quel est votre type de bien ?
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PROPERTY_TYPES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPropertyType(p)}
                    className={cn(
                      "rounded-lg border px-3 py-3 text-sm font-medium transition-colors",
                      propertyType === p
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 text-slate-700 hover:border-emerald-400"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Quel est votre budget ?
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={cn(
                      "rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
                      budget === b
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 text-slate-700 hover:border-emerald-400"
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="lf-postal" className="field-label">
                  Code postal
                </label>
                <input
                  id="lf-postal"
                  type="text"
                  inputMode="numeric"
                  value={postalCode}
                  onChange={(e) => handlePostalChange(e.target.value)}
                  placeholder="25000"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="lf-city" className="field-label">
                  Ville
                </label>
                <input
                  id="lf-city"
                  type="text"
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  placeholder="Besançon"
                  list="lf-city-list"
                  className="field"
                />
                <datalist id="lf-city-list">
                  {CITIES.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.postalCode} · {c.department}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Décrivez votre projet
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="lf-firstname" className="field-label">
                  Prénom *
                </label>
                <input
                  id="lf-firstname"
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="lf-lastname" className="field-label">
                  Nom *
                </label>
                <input
                  id="lf-lastname"
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="field"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="lf-email" className="field-label">
                  Email *
                </label>
                <input
                  id="lf-email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className={cn(
                    "field",
                    emailError &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-600">{emailError}</p>
                )}
              </div>
              <div>
                <label htmlFor="lf-phone" className="field-label">
                  Téléphone (facultatif)
                </label>
                <input
                  id="lf-phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) validatePhone(e.target.value);
                  }}
                  onBlur={(e) => validatePhone(e.target.value)}
                  placeholder="06 75 55 55 48"
                  className={cn(
                    "field",
                    phoneError &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {phoneError && (
                  <p className="mt-1 text-xs text-red-600">{phoneError}</p>
                )}
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="lf-desc" className="text-sm font-medium text-slate-700">
                  Description du projet
                </label>
                {speechSupported && (
                  <button
                    type="button"
                    onClick={toggleMic}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                      listening
                        ? "bg-emerald-800 text-white"
                        : "bg-emerald-700 text-white hover:bg-emerald-800"
                    )}
                  >
                    <Mic
                      className={cn("h-3.5 w-3.5", listening && "animate-pulse")}
                      aria-hidden="true"
                    />
                    {listening ? "Écoute…" : "Dicter"}
                  </button>
                )}
              </div>
              <textarea
                id="lf-desc"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  listening
                    ? "Je vous écoute, décrivez votre projet…"
                    : "Décrivez votre projet : surface, état du bien, délais souhaités…"
                }
                className="field resize-none"
              />
            </div>

            <div>
              <label className="field-label">
                Photos du projet (facultatif · {MAX_PHOTOS} max)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
              <div className="flex flex-wrap items-center gap-3">
                {photos.map((f, i) => (
                  <PhotoThumb
                    key={`${f.name}-${i}`}
                    file={f}
                    onRemove={() => removePhoto(i)}
                  />
                ))}
                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition-colors hover:border-emerald-500 hover:text-emerald-600"
                    aria-label="Ajouter des photos"
                  >
                    <ImagePlus className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Vous pouvez sélectionner toutes vos photos en une seule fois.
              </p>
              {photoMessage && (
                <p className="mt-2 rounded-md bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                  {photoMessage}
                </p>
              )}
            </div>

            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-start gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={consentPartners}
                  onChange={(e) => setConsentPartners(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-700"
                />
                <span>
                  J&apos;accepte que mes informations et photos soient
                  transmises aux artisans partenaires de RenovAllo pour le
                  traitement de ma demande. *
                </span>
              </label>
              <label className="flex items-start gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={consentMarketing}
                  onChange={(e) => setConsentMarketing(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-700"
                />
                <span>
                  J&apos;accepte de recevoir des informations et offres de
                  RenovAllo et de ses partenaires.
                </span>
              </label>
              <p className="text-xs text-slate-500">
                Conformément au RGPD, vos données sont utilisées uniquement pour
                traiter votre demande.{" "}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-medium text-emerald-700 underline"
                >
                  Politique de confidentialité
                </Link>
              </p>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn-outline"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Retour
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && !projectType) {
                  setError("Veuillez sélectionner un type de travaux.");
                  return;
                }
                setError(null);
                setStep((s) => s + 1);
              }}
              className="btn-primary"
            >
              Continuer
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Envoi…
                </>
              ) : (
                "Envoyer ma demande"
              )}
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            Réponse sous 72h
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            Gratuit & sans engagement
          </span>
        </div>
      </form>
    </div>
  );
}
