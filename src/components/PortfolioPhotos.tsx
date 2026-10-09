import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import photo01 from "@/assets/portfolio-01.jpg.asset.json";
import photo02 from "@/assets/portfolio-02.jpg.asset.json";
import photo03 from "@/assets/portfolio-03.jpg.asset.json";
import photo04 from "@/assets/portfolio-04.jpg.asset.json";
import photo05 from "@/assets/portfolio-05.jpg.asset.json";
import photo06 from "@/assets/portfolio-06.jpg.asset.json";
import photo07 from "@/assets/portfolio-07.jpg.asset.json";
import photo08 from "@/assets/portfolio-08.jpg.asset.json";
import photo09 from "@/assets/portfolio-09.jpg.asset.json";

const photos = [
  { src: photo04.url, alt: "Maquiagem iluminada e cabelos cacheados soltos, produção com vestido amarelo", width: 1080, height: 1920 },
  { src: photo06.url, alt: "Maquiagem com olhos marcados e cabelos cacheados, retrato com roupa preta", width: 1440, height: 1920 },
  { src: photo05.url, alt: "Maquiagem com sombra cintilante e cabelos ondulados, produção com vestido vinho", width: 1080, height: 1920 },
  { src: photo01.url, alt: "Maquiagem com olhos esfumados e cabelo preso, produção com vestido amarelo", width: 1413, height: 1920 },
  { src: photo02.url, alt: "Maquiagem com delineado e coque com mechas soltas, produção com vestido vermelho", width: 1344, height: 1920 },
  { src: photo03.url, alt: "Penteado em coque baixo com acabamento polido, visto de lado", width: 1440, height: 1920 },
  { src: photo07.url, alt: "Maquiagem social iluminada com cabelo preso e brincos de pérola", width: 1280, height: 1920 },
  { src: photo08.url, alt: "Penteado semipreso com ondas longas, visto de costas", width: 1080, height: 1920 },
  { src: photo09.url, alt: "Rabo de cavalo alto com ondas e mechas trabalhadas, visto de costas", width: 1000, height: 1778 },
];

export function PortfolioPhotos() {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? undefined : photos[active];

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest(".portfolio-photo")) {
      event.currentTarget.classList.remove("is-fast");
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const edge = Math.min(rect.width * 0.18, 180);
    const x = event.clientX - rect.left;
    event.currentTarget.classList.toggle("is-fast", x < edge || x > rect.width - edge);
  };

  return <Dialog.Root open={selected !== undefined} onOpenChange={(open) => { if (!open) setActive(null); }}>
    <div className={`portfolio-window${selected ? " is-paused" : ""}`} onMouseMove={handleMouseMove} onMouseLeave={(event) => event.currentTarget.classList.remove("is-fast")}>
      <div className="portfolio-track">
        {[0, 1].map((copy) => <div className={`portfolio-strip${copy ? " portfolio-strip-copy" : ""}`} key={copy} aria-hidden={copy ? true : undefined}>
          {photos.map((photo, index) => <Button key={photo.src} variant="ghost" className="portfolio-photo" tabIndex={copy ? -1 : undefined} onClick={() => setActive(index)} aria-label={`Ampliar: ${photo.alt}`}>
            <img src={photo.src} alt={copy ? "" : photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
          </Button>)}
        </div>)}
      </div>
    </div>
    <Dialog.Portal>
      <Dialog.Overlay className="portfolio-lightbox-overlay" />
      <Dialog.Content className="portfolio-lightbox" aria-describedby={undefined}>
        <Dialog.Title className="sr-only">Foto do portfólio ampliada</Dialog.Title>
        {selected && <img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} />}
        <Dialog.Close asChild><Button variant="ghost" size="icon" className="portfolio-close" aria-label="Fechar imagem"><X aria-hidden="true" /></Button></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}