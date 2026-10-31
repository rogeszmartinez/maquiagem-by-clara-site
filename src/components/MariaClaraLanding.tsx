import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Camera, ChevronDown, Gem, GraduationCap, Instagram, MapPin, Menu, Palette, X } from "lucide-react";
import { PortfolioPhotos } from "@/components/PortfolioPhotos";

const portraitAsset = "/media/maria-clara-retrato.jpg";
const applyingAsset = "/media/maria-clara-maquiando.jpg";
const editorialAsset = "/media/maria-clara-editorial.jpg";
const logoAsset = "/media/clara-galvao-logo.png";
const logoLightAsset = "/media/clara-galvao-logo-light.png";
const heroVideoAsset = "/media/clara-galvao-hero.mp4";
const logoHorizontalWhite = "/media/clara-galvao-horizontal-white.webp";
const logoVerticalWhite = "/media/clara-galvao-vertical-white.webp";
const heroPosterAsset = "/media/clara-galvao-hero-poster.jpg";

const SITE_CONFIG = {
  whatsappNumber: "",
  whatsappUrl: "https://wa.me/message/JATFFJCIQ7YCF1",
  instagramHandle: "@maquiagembyclara",
  instagramUrl: "https://www.instagram.com/maquiagembyclara/",
};

const navItems = [
  ["Início", "inicio"], ["Serviços", "servicos"], ["Portfólio", "portfolio"],
  ["Sobre", "sobre"], ["Localização", "localizacao"], ["Contato", "contato"],
] as const;

const desktopNavItems = [
  ["Serviços", "servicos"], ["Portfólio", "portfolio"], ["Sobre", "sobre"],
] as const;

function whatsappHref(message: string) {
  const digits = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  if (digits) return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  return SITE_CONFIG.whatsappUrl || "#contato";
}

function WhatsAppLink({ children, className = "button-primary" }: { children: ReactNode; className?: string }) {
  return <a className={className} href={whatsappHref("Olá, Clara! Gostaria de consultar a disponibilidade para um atendimento.")}>{children}<ArrowRight size={16} aria-hidden="true" /></a>;
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return <header className="section-heading reveal"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{intro && <p>{intro}</p>}</header>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`site-header${scrolled ? " scrolled" : ""}`}><a className="wordmark" href="#inicio" aria-label="Maria Clara Galvão — início"><img className="brand-logo" src={logoAsset} alt="Clara Galvão — Make & hair"/></a><nav className="desktop-nav" aria-label="Navegação principal">{desktopNavItems.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="header-actions"><a className="header-icon" href="#localizacao" aria-label="Localização"><MapPin size={17}/></a><a className="header-icon" href={SITE_CONFIG.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram de Clara Galvão"><Instagram size={17}/></a><WhatsAppLink className="header-cta">Agendar</WhatsAppLink></div><button className="menu-button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>{open && <nav className="mobile-nav" aria-label="Navegação móvel">{navItems.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<WhatsAppLink>Agendar atendimento</WhatsAppLink></nav>}</header>;
}

export function VideoIntro() {
  return <section className="video-intro" aria-label="Clara Galvão — Make & hair"><video className="video-intro-bg" src={heroVideoAsset} poster={heroPosterAsset} autoPlay muted loop playsInline preload="auto"/><div className="video-intro-overlay"/><img className="video-intro-logo video-intro-logo-desktop" src={logoHorizontalWhite} alt="Clara Galvão — Make & hair"/><img className="video-intro-logo video-intro-logo-mobile" src={logoVerticalWhite} alt="Clara Galvão — Make & hair"/><a className="video-intro-scroll" href="#inicio" aria-label="Descer para a próxima seção"><ChevronDown size={18} aria-hidden="true"/></a></section>;
}

export function Hero() {
  return <section id="inicio" className="hero"><div className="hero-copy"><p className="eyebrow">Maquiagem profissional <i/> Lauro de Freitas e Salvador</p><h1>Sua beleza,<br/><em>valorizada</em> em<br/>cada detalhe.</h1><p className="hero-lead">Maquiagem personalizada, com alta qualidade e longa duração. Uma experiência pensada para você se sentir segura em momentos especiais.</p><div className="hero-actions"><WhatsAppLink>Agendar atendimento</WhatsAppLink><a className="button-secondary" href="#servicos">Ver serviços</a></div><p className="location-line"><MapPin size={15}/> Studio em Buraquinho, Lauro de Freitas <span>•</span> Atendimento a domicílio</p></div><div className="hero-visual"><img src={portraitAsset} alt="Maria Clara Galvão, maquiadora profissional em Lauro de Freitas" fetchPriority="high"/><p>Beleza autoral<br/>para momentos únicos.</p></div></section>;
}

function Experience() {
  return <section className="experience section-pad reveal"><p className="eyebrow">A experiência Clara Galvão</p><div className="statement"><h2>Beleza, qualidade<br/>e <em>excelência.</em></h2><p>Um atendimento personalizado para valorizar sua beleza e transformar a preparação para o seu evento em uma experiência especial.</p></div><div className="values">{["Atendimento personalizado","Produtos de alta qualidade","Longa duração"].map(v=><button type="button" key={v} className="button-primary">{v}</button>)}</div></section>;
}

const services = [
  { title:"Maquiagem Social", text:"Maquiagem completa, à prova d’água e de longa duração, realizada com produtos de alta qualidade. Esfumado completo, delineado, cílios postiços e tudo o que você desejar para sua produção.", featured:true },
  { title:"Social + Escova e Babyliss", text:"Produção de maquiagem social completa combinada com escova e babyliss." },
  { title:"Social + Penteado", text:"Produção completa combinando maquiagem social e penteado." },
  { title:"Penteado", text:"Para todos os tipos de cabelos." },
];

export function ServiceCard({ service }: { service: typeof services[number] }) {
 return <article className={`service-card reveal ${service.featured ? "featured" : ""}`}><h3>{service.title}</h3><p>{service.text}</p>{service.featured && <ul><li>Pagamento via PIX ou cartão</li></ul>}</article>
}

function Services() {
 return <section id="servicos" className="services section-pad"><SectionHeading eyebrow="Serviços" title="Produções pensadas para cada ocasião." intro="Do acabamento natural à produção completa, cada escolha respeita seu estilo e o momento que você vai viver."/><div className="service-list">{services.map(s=><ServiceCard key={s.title} service={s}/>)}</div><p className="service-footnote">Consulte valores para parcelamento no crédito. Em atendimentos a domicílio, o valor final é calculado de acordo com o endereço.</p><div className="other-services"><SectionHeading eyebrow="Além da maquiagem social" title="Outros serviços"/><div className="other-grid">{[
  { title:"Beauty & Fotos", text:"Ensaio de posicionamento ou aniversário no studio, com iPhone 15 Pro Max, fotos profissionais editadas e fundo infinito preto ou branco.", cta:"Solicitar valores", icon:Camera },
  { title:"Curso de Automaquiagem", text:"Individual ou em grupo, com materiais inclusos, técnicas para o dia a dia, certificado, brinde e apostila. Disponível em Salvador e Lauro de Freitas.", cta:"Solicitar valores", icon:GraduationCap },
  { title:"Maquiagem Artística", text:"Maquiagem artística para fantasias e produções especiais.", cta:"Consultar disponibilidade", icon:Palette },
  { title:"Maquiagem para Noivas", text:"Pacotes para o seu dia de noiva ser inesquecível.", cta:"Solicitar valores", icon:Gem }
].map(({title,text,cta,icon:Icon},i)=><article key={title} className={`other-card reveal${i % 2 ? " other-card-dark" : ""}`}><Icon className="other-icon" size={26} aria-hidden="true"/><h3>{title}</h3><p>{text}</p><WhatsAppLink className="text-link">{cta}</WhatsAppLink></article>)}</div><p className="occasions">Atendimentos para <b>noivas</b>, formandas, madrinhas, aniversários de 15 anos, ensaios fotográficos e eventos especiais.</p></div></section>
}


export function PortfolioGallery() {
 return <section id="portfolio" className="portfolio section-pad"><SectionHeading eyebrow="Portfólio" title="Beleza que se revela nos detalhes." intro="Conheça algumas das produções realizadas por Clara."/><PortfolioPhotos/><a className="instagram-link" href={SITE_CONFIG.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={18}/><span>Ver Instagram</span><small>{SITE_CONFIG.instagramHandle}</small><ArrowRight size={18}/></a></section>
}

export function AboutSection() {
 return <section id="sobre" className="about section-pad"><div className="about-image reveal"><img src={editorialAsset} alt="Maria Clara Galvão com pincel e maquiagem" loading="lazy"/><span>5 anos de experiência</span></div><div className="about-copy reveal"><p className="eyebrow">Sobre Clara</p><h2>Técnica, cuidado<br/>e <em>presença.</em></h2><p>Maria Clara Galvão atua profissionalmente na área da beleza há cerca de 5 anos, oferecendo um atendimento personalizado, com foco em qualidade, excelência e cuidado em cada detalhe.</p><p>Seu trabalho é voltado para mulheres que desejam uma maquiagem personalizada e de qualidade, especialmente para momentos importantes e eventos especiais.</p><p>Além dos atendimentos no studio, Clara também realiza produções a domicílio e trabalha com equipe para atender grupos e eventos maiores.</p></div></section>
}

function WhyClara() {
 const items=[["Atendimento personalizado","Cada produção é pensada de acordo com o seu momento, estilo e ocasião."],["Qualidade e longa duração","Maquiagens realizadas com produtos de alta qualidade, com resistência à água e longa duração."],["Segurança para o seu evento","Um atendimento pensado para que você se sinta confiante e preparada para aproveitar o seu momento."]];
 return <section className="why section-pad"><SectionHeading eyebrow="Por que escolher Clara" title="Mais do que maquiagem. Uma experiência pensada para você."/><div className="why-grid">{items.map(([t,p])=><article className="reveal" key={t}><h3>{t}</h3><p>{p}</p></article>)}</div></section>
}

export function LocationSection() {
 return <section id="localizacao" className="location section-pad"><SectionHeading eyebrow="Atendimento" title="Onde você pode ser atendida"/><div className="location-layout"><div className="location-photo reveal"><img src={applyingAsset} alt="Maria Clara durante preparação de maquiagem profissional" loading="lazy"/></div><div className="location-info reveal"><article><div><h3>Studio</h3><p><strong>Buraquinho — Lauro de Freitas, Bahia</strong></p><small>Endereço completo após o agendamento.</small></div></article><article><div><h3>Atendimento a domicílio</h3><p><strong>Lauro de Freitas, Stella Maris e Abrantes</strong></p><p>Demais regiões — consulte a disponibilidade</p><p>Após o pedágio e Linha Verde</p><small>O valor final depende do endereço exato.</small></div></article><WhatsAppLink>Consultar disponibilidade</WhatsAppLink></div></div></section>
}

export function BookingPolicies() {
 const policies=[<>Para atendimentos homecare, em domicílios ou hotéis, é cobrada uma taxa de comodidade que varia conforme o local.</>,<>Para agendar, é necessário o pagamento de <strong>50% do valor total</strong> para reservar o horário.</>,<>O valor restante é pago no dia do evento.</>,<>Em caso de desistência ou atraso superior ao acordado, o sinal não será devolvido como forma de ressarcimento.</>,<>Em caso de imprevisto próximo ou no dia agendado, o sinal poderá ser utilizado em até <strong>2 meses</strong>.</>,<>O horário somente será reservado mediante envio do comprovante de pagamento.</>,<>A disponibilidade deve ser verificada antes do depósito.</>];
 return <section className="booking section-pad"><SectionHeading eyebrow="Informações importantes" title="Agendamento"/><div className="policy-list">{policies.map((p,i)=><div className="reveal" key={i}><p>{p}</p></div>)}</div></section>
}

export function CTASection() {
 return <section id="contato" className="final-cta"><p className="eyebrow">Seu momento começa aqui</p><h2>Vamos preparar seu próximo<br/><em>momento especial?</em></h2><p>Entre em contato para consultar disponibilidade, valores e condições de atendimento.</p><div><WhatsAppLink>Agendar pelo WhatsApp</WhatsAppLink><a className="button-light" href={SITE_CONFIG.instagramUrl} target="_blank" rel="noreferrer">Seguir no Instagram <Instagram size={16}/></a></div></section>
}

export function Footer() {
 return <footer><a className="wordmark footer-mark" href="#inicio" aria-label="Maria Clara Galvão — início"><img className="brand-logo brand-logo-light" src={logoLightAsset} alt="Clara Galvão — Make & hair"/></a><div className="footer-links"><a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noreferrer">{SITE_CONFIG.instagramHandle}</a><a href={whatsappHref("Olá, Clara! Gostaria de agendar um atendimento.")}>Agendamento</a></div><p className="footer-address">Studio — Buraquinho, Lauro de Freitas • Bahia</p><p className="footer-copy">© 2026 Maria Clara Galvão. Todos os direitos reservados.</p></footer>
}

export default function MariaClaraLanding(){ return <><Header/><main><VideoIntro/><Hero/><Experience/><PortfolioGallery/><Services/><AboutSection/><WhyClara/><LocationSection/><BookingPolicies/><CTASection/></main><Footer/></> }
