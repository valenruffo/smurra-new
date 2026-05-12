"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Building2,
  Globe,
  Trophy,
  Award,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Car,
  Heart,
  Home as HomeIcon,
  UserCheck,
  Briefcase,
  Truck,
  FileCheck,
  AlertTriangle,
  Scale,
  Users,
  UsersRound,
  Star,
  Quote,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLang } from "@/lib/i18n-context";

const insuranceNames = [
  "Federación Patronal", "La Segunda", "Sancor", "Zurich",
  "Allianz", "Mapfre", "Liberty", "RSA",
];
const insuranceLoop = [...insuranceNames, ...insuranceNames];

const provinces = ["Buenos Aires", "CABA", "Córdoba", "Santa Fe", "Mendoza"];
const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
const insuranceTypes = ["Vida", "Hogar", "Accidentes Personales", "Salud"];

function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  return <section id={id} className={`py-24 lg:py-32 ${className}`}>{children}</section>;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

type ServiceTab = "personas" | "pymes" | "corporativos";
type FormTab = "vehiculos" | "personas";

const serviceIcons: Record<string, typeof Car> = {
  Autos: Car, Vida: Heart, Casa: HomeIcon, "Accidentes Personales": UserCheck,
  "ART Domésticas": Shield, "Integral de Comercio": Building2,
  "Todo Riesgo Operativo": AlertTriangle, "Responsabilidad Civil": Scale,
  "ART y Riesgos Laborales": Users, "Vida Ley de Contrato": Heart,
  Transporte: Truck, Cauciones: FileCheck, "Affinity Group": Users,
  "Vida Colectivo": Heart, "Eventos Masivos": UsersRound,
  "Ahorro Corporativo": Briefcase, "Seguros No Tradicionales": Shield,
  "Domestic Worker Insurance": Shield, Auto: Car, Life: Heart, Home: HomeIcon,
  "Personal Accidents": UserCheck, "Business Insurance": Building2,
  "Operational All Risks": AlertTriangle, "Civil Liability": Scale,
  "Workers' Compensation": Users, "Life Insurance Law": Heart,
  Transport: Truck, "Surety Bonds": FileCheck, "Non-Traditional Insurance": Shield,
  "Collective Life": Heart, "Mass Events": UsersRound,
  "Corporate Savings": Briefcase,
};

export default function Home() {
  const { lang, toggleLang, tt } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ServiceTab>("personas");
  const [formTab, setFormTab] = useState<FormTab>("vehiculos");

  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const specialIcons = [Building2, Trophy, Globe];

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* NAVIGATION — transparent over hero, opaque when scrolled */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-[#EAEAEA]" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex justify-between items-center">
          <Image
            src="/smurra-logo.png"
            alt="Smurra"
            width={140}
            height={40}
            className={`h-12 w-auto transition-all duration-500 ${scrolled ? "brightness-0" : "brightness-0 invert"}`}
            priority
          />

          <div className="hidden md:flex items-center gap-6">
            {(["servicios", "nosotros", "especializaciones", "testimonios"] as const).map((k) => (
              <button
                key={k}
                onClick={() => scrollTo(k)}
                className={`text-[15px] transition-colors cursor-pointer capitalize ${scrolled ? "text-[#787774] hover:text-[#2F3437]" : "text-white/80 hover:text-white"}`}
              >
                {tt.nav[k]}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className={`text-xs font-medium cursor-pointer uppercase tracking-wider px-2 py-1 rounded border transition-colors ${scrolled ? "text-[#787774] border-[#EAEAEA] hover:text-[#2F3437]" : "text-white/70 border-white/20 hover:text-white hover:border-white/40"}`}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <Button
              onClick={() => scrollTo("contacto")}
              className={`cursor-pointer rounded-md text-sm px-5 h-9 transition-colors ${scrolled ? "bg-[#111111] hover:bg-[#333333] text-white" : "bg-white text-[#2B496C] hover:bg-white/90"}`}
            >
              {tt.nav.cotizar}
            </Button>
          </div>

          <button className="md:hidden p-1 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} className={scrolled ? "text-[#2F3437]" : "text-white"} /> : <Menu size={22} className={scrolled ? "text-[#2F3437]" : "text-white"} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-t border-[#EAEAEA]">
            <div className="px-6 py-4 space-y-3">
              {(["servicios", "nosotros", "especializaciones", "testimonios"] as const).map((k) => (
                <button key={k} onClick={() => scrollTo(k)} className="block w-full text-left py-2 text-sm text-[#787774] capitalize cursor-pointer">
                  {tt.nav[k]}
                </button>
              ))}
              <button onClick={toggleLang} className="block w-full text-left py-2 text-sm text-[#787774] cursor-pointer uppercase">
                {lang === "es" ? "English" : "Español"}
              </button>
              <Button onClick={() => scrollTo("contacto")} className="w-full cursor-pointer rounded-md bg-[#111111] hover:bg-[#333333] text-white">
                {tt.nav.cotizar}
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO — full-bleed image + dark overlay, text bottom-left */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/office.webp"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Dark navy overlay — lighter at bottom-left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E]/90 via-[#0F1A2E]/60 to-[#0F1A2E]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-5 pb-20 sm:pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-white leading-[1.08] tracking-tight font-[family-name:var(--font-playfair)]"
          >
            {tt.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-base sm:text-lg text-white/55 max-w-xl leading-relaxed font-[family-name:var(--font-playfair)]"
          >
            {tt.hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-sm uppercase tracking-[0.2em] text-[#C4A35A] font-medium"
          >
            {tt.hero.guru}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => scrollTo("contacto")}
              className="cursor-pointer rounded-md bg-white text-[#2B496C] hover:bg-[#F7F6F3] text-sm px-8 h-12 shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
            >
              {tt.hero.cta1} <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollTo("nosotros")}
              className="cursor-pointer rounded-md border-white/25 text-white hover:bg-white/[0.08] text-sm px-8 h-12"
            >
              {tt.hero.cta2}
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 border border-white/25 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-1 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* QUÉ HACEMOS */}
      <Section id="nosotros" className="bg-[#F7F6F3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#1F6C9F]">{tt.about.overline}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F3437] tracking-tight">{tt.about.title}</h2>
            <p className="mt-4 text-lg text-[#787774] max-w-2xl mx-auto">{tt.about.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tt.about.items.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className="bg-[#FBFBFA] rounded-xl p-8 border border-[#EAEAEA] hover:border-[#787774]/30 transition-colors duration-300 h-full cursor-pointer">
                  <div className="w-11 h-11 bg-[#E1F3FE] rounded-lg flex items-center justify-center mb-5">
                    {i === 0 ? <Shield className="h-5 w-5 text-[#1F6C9F]" /> : i === 1 ? <Award className="h-5 w-5 text-[#1F6C9F]" /> : <Users className="h-5 w-5 text-[#1F6C9F]" />}
                  </div>
                  <h3 className="text-lg font-semibold text-[#2F3437] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#787774] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* SERVICIOS */}
      <Section id="servicios">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#1F6C9F]">{tt.services.overline}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F3437] tracking-tight">{tt.services.title}</h2>
            <p className="mt-4 text-lg text-[#787774] max-w-2xl mx-auto">{tt.services.subtitle}</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[#F7F6F3] p-1 rounded-lg border border-[#EAEAEA]">
              {(["personas", "pymes", "corporativos"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`cursor-pointer px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === tab ? "bg-white text-[#2F3437] border border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.04)]" : "text-[#787774] hover:text-[#2F3437]"}`}>
                  {tt.services.tabs[tab]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tt.services[activeTab].map((service, i) => (
              <motion.div key={`${activeTab}-${service.title}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                <div className="bg-[#FBFBFA] rounded-xl p-6 border border-[#EAEAEA] hover:border-[#1F6C9F]/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 h-full group cursor-pointer">
                  <div className="w-10 h-10 bg-[#E1F3FE] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1F6C9F]/10 transition-colors">
                    {(() => { const Icon = serviceIcons[service.title] || Shield; return <Icon className="h-5 w-5 text-[#1F6C9F]" />; })()}
                  </div>
                  <h4 className="text-base font-semibold text-[#2F3437] mb-1.5">{service.title}</h4>
                  <p className="text-xs text-[#787774] leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* COMPAÑÍAS */}
      <div className="bg-[#2B496C] overflow-hidden py-12">
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-center text-white/40">{tt.companies.overline}</p>
          <p className="text-sm text-center text-white/30 mt-1">{tt.companies.subtitle}</p>
        </div>
        <div className="flex animate-scroll-logos [&>*]:flex-shrink-0">
          {insuranceLoop.map((name, i) => (
            <div key={i} className="mx-8 w-36 h-20 bg-white/[0.04] rounded-lg border border-white/[0.06] flex items-center justify-center">
              <span className="text-white/50 font-medium text-sm tracking-wider">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ESPECIALIZACIONES */}
      <Section id="especializaciones" className="bg-[#F7F6F3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#1F6C9F]">{tt.specializations.overline}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F3437] tracking-tight">{tt.specializations.title}</h2>
            <p className="mt-4 text-lg text-[#787774] max-w-2xl mx-auto">{tt.specializations.subtitle}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {tt.specializations.items.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className="bg-[#FBFBFA] rounded-xl border border-[#EAEAEA] hover:border-[#787774]/40 transition-colors duration-300 h-full overflow-hidden group cursor-pointer">
                  <div className="h-1 bg-[#1F6C9F] group-hover:bg-[#2B496C] transition-colors" />
                  <div className="p-8 pt-7">
                    <div className="w-12 h-12 bg-[#E1F3FE] rounded-lg flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                      {(() => { const Icon = specialIcons[i]; return <Icon className="h-6 w-6 text-[#1F6C9F]" />; })()}
                    </div>
                    <h3 className="text-lg font-semibold text-[#2F3437] mb-3">{item.title}</h3>
                    <p className="text-sm text-[#787774] leading-relaxed mb-5">{item.desc}</p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1F6C9F] uppercase tracking-wider">
                      <Award className="h-3.5 w-3.5" /> {item.stat}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* HOLDING */}
      <Section>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#1F6C9F]">{tt.holding.overline}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F3437] tracking-tight">{tt.holding.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-3xl mx-auto">
            {([
              { src: "/syassistance.png", name: tt.holding.companies[0].name, desc: tt.holding.companies[0].desc },
              { src: "/smurrainsu.png", name: tt.holding.companies[1].name, desc: tt.holding.companies[1].desc },
              { src: "/cyberassist.png", name: tt.holding.companies[2].name, desc: tt.holding.companies[2].desc },
            ] as const).map((company, i) => (
              <FadeIn key={company.name} delay={i * 0.15}>
                <div className="text-center cursor-pointer">
                  <div className="w-52 h-52 mx-auto bg-[#F7F6F3] rounded-xl border border-[#EAEAEA] flex items-center justify-center mb-5 p-8 hover:shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow">
                    <Image src={company.src} alt={company.name} width={150} height={100} className="w-full h-auto object-contain" />
                  </div>
                  <h4 className="text-base font-semibold text-[#2F3437] mb-1">{company.name}</h4>
                  <p className="text-xs text-[#787774]">{company.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIOS */}
      <Section id="testimonios" className="bg-[#2F3437]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">{tt.testimonials.overline}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-[family-name:var(--font-playfair)]">{tt.testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tt.testimonials.items.map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.12}>
                <div className="bg-white/[0.04] rounded-xl border border-white/[0.08] p-8 h-full cursor-pointer">
                  <Quote className="h-8 w-8 text-white/15 mb-4" />
                  <p className="text-sm text-white/75 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/[0.08] rounded-lg flex items-center justify-center">
                      <span className="text-xs font-semibold text-white/60">{t.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t.author}</p>
                      <p className="text-xs text-white/45">{t.role}, {t.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 text-[#1F6C9F] fill-[#1F6C9F]" />)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTO */}
      <Section id="contacto" className="bg-[#F7F6F3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#1F6C9F]">{tt.contact.overline}</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F3437] tracking-tight font-[family-name:var(--font-playfair)]">{tt.contact.title}</h2>
              <p className="mt-4 text-base text-[#787774]">{tt.contact.subtitle}</p>
              <div className="mt-10 space-y-5">
                {[
                  { icon: MapPin, title: tt.contact.info.ubicacion, text: "Av. de los Lagos 7008 piso 1°, B1670 Tigre, Buenos Aires" },
                  { icon: Phone, title: tt.contact.info.telefono, text: "+54 11 3864-3262" },
                  { icon: Mail, title: tt.contact.info.email, text: "seguros@smurra.com" },
                  { icon: Clock, title: tt.contact.info.horarios, text: "Lunes a Viernes: 9:00 — 18:00" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#E1F3FE] rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-[#1F6C9F]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#2F3437] mb-0.5">{item.title}</h4>
                      <p className="text-sm text-[#787774]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FBFBFA] rounded-xl border border-[#EAEAEA] p-8">
              <div className="flex gap-1 bg-[#F7F6F3] p-1 rounded-lg border border-[#EAEAEA] mb-8">
                {(["vehiculos", "personas"] as const).map((tab) => (
                  <button key={tab} onClick={() => setFormTab(tab)} className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${formTab === tab ? "bg-white text-[#2F3437] border border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.04)]" : "text-[#787774] hover:text-[#2F3437]"}`}>
                    {tt.contact.form.tabs[tab]}
                  </button>
                ))}
              </div>

              {formTab === "vehiculos" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.nombre} *</Label>
                      <Input placeholder={tt.contact.form.placeholder.nombre} className="mt-1.5" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.patente} *</Label>
                      <Input placeholder={tt.contact.form.placeholder.patente} className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.marca} *</Label>
                      <Input placeholder={tt.contact.form.placeholder.marca} className="mt-1.5" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.modelo} *</Label>
                      <Input placeholder={tt.contact.form.placeholder.modelo} className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.anio} *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={tt.contact.form.placeholder.anio} />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y) => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.provincia} *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={tt.contact.form.placeholder.provincia} />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((p) => <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.telefono} *</Label>
                    <Input placeholder={tt.contact.form.placeholder.telefono} className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.email}</Label>
                    <Input type="email" placeholder={tt.contact.form.placeholder.email} className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.mensaje}</Label>
                    <Textarea placeholder={tt.contact.form.placeholder.mensaje} rows={3} className="mt-1.5" />
                  </div>
                  <Button className="w-full cursor-pointer rounded-md bg-[#111111] hover:bg-[#333333] text-white h-11 text-sm">
                    {tt.contact.form.enviar}
                  </Button>
                </div>
              )}

              {formTab === "personas" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.nombre} *</Label>
                    <Input placeholder={tt.contact.form.placeholder.nombre} className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.dni} *</Label>
                      <Input placeholder={tt.contact.form.placeholder.dni} className="mt-1.5" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.nacimiento}</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.tipoSeguro} *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={tt.contact.form.placeholder.tipoSeguro} />
                      </SelectTrigger>
                      <SelectContent>
                        {insuranceTypes.map((t) => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.telefono} *</Label>
                      <Input placeholder={tt.contact.form.placeholder.telefono} className="mt-1.5" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#2F3437]">{tt.contact.form.email}</Label>
                      <Input type="email" placeholder={tt.contact.form.placeholder.email} className="mt-1.5" />
                    </div>
                  </div>
                  <Button className="w-full cursor-pointer rounded-md bg-[#111111] hover:bg-[#333333] text-white h-11 text-sm">
                    {tt.contact.form.enviar}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-[#0F1117] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Image src="/smurra-logo.png" alt="Smurra" width={160} height={44} className="h-10 w-auto mb-5" />
              <p className="text-sm text-white/50 mb-5 max-w-sm leading-relaxed">{tt.footer.tagline}</p>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#1F6C9F]" />
                <span className="text-xs text-white/45">{tt.footer.experience}</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">{tt.footer.servicios}</h4>
              <ul className="space-y-2 text-xs text-white/45">
                {tt.footer.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">{tt.footer.contacto}</h4>
              <ul className="space-y-2 text-xs text-white/45">
                <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 flex-shrink-0" /> Tigre, Buenos Aires</li>
                <li className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 flex-shrink-0" /> +54 11 3864-3262</li>
                <li className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 flex-shrink-0" /> seguros@smurra.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/30">{tt.footer.copyright}</p>
            <span className="text-xs text-white/30">smurra.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
