import { createFileRoute } from "@tanstack/react-router";
import MariaClaraLanding from "@/components/MariaClaraLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maria Clara Galvão | Maquiadora em Lauro de Freitas" },
      { name: "description", content: "Maquiagem profissional em Lauro de Freitas e Salvador. Maquiagem social, noivas, penteados, Beauty & Fotos e curso de automaquiagem com Maria Clara Galvão." },
      { property: "og:title", content: "Maria Clara Galvão | Maquiagem Profissional" },
      { property: "og:description", content: "Beleza, qualidade e excelência em maquiagem profissional no studio em Buraquinho ou a domicílio." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: "Maria Clara Galvão — Maquiagem Profissional",
        description: "Maquiadora profissional em Buraquinho, Lauro de Freitas, com atendimento em studio e a domicílio.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lauro de Freitas",
          addressRegion: "BA",
          addressCountry: "BR",
        },
        areaServed: ["Lauro de Freitas", "Salvador", "Abrantes", "Linha Verde"],
        sameAs: ["https://www.instagram.com/maquiagembyclara/"],
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return <MariaClaraLanding />;
}
