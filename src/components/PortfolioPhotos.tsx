import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const photo01 = "/media/portfolio-01.jpg";
const photo02 = "/media/portfolio-02.jpg";
const photo03 = "/media/portfolio-03.jpg";
const photo04 = "/media/portfolio-04.jpg";
const photo05 = "/media/portfolio-05.jpg";
const photo06 = "/media/portfolio-06.jpg";
const photo07 = "/media/portfolio-07.jpg";
const photo08 = "/media/portfolio-08.jpg";
const photo09 = "/media/portfolio-09.jpg";

const photos = [
  { src: photo04, alt: "Maquiagem iluminada e cabelos cacheados soltos, produção com vestido amarelo", width: 1080, height: 1920 },
  { src: photo06, alt: "Maquiagem com olhos marcados e cabelos cacheados, retrato com roupa preta", width: 1440, height: 1920 },
  { src: photo05, alt: "Maquiagem com sombra cintilante e cabelos ondulados, produção com vestido vinho", width: 1080, height: 1920 },
  { src: photo01, alt: "Maquiagem com olhos esfumados e cabelo preso, produção com vestido amarelo", width: 1413, height: 1920 },
  { src: photo02, alt: "Maquiagem com delineado e coque com mechas soltas, produção com vestido vermelho", width: 1344, height: 1920 },
  { src: photo03, alt: "Penteado em coque baixo com acabamento polido, visto de lado", width: 1440, height: 1920 },
  { src: photo07, alt: "Maquiagem social iluminada com cabelo preso e brincos de pérola", width: 1280, height: 1920 },
  { src: photo08, alt: "Penteado semipreso com ondas longas, visto de costas", width: 1080, height: 1920 },
  { src: photo09, alt: "Rabo de cavalo alto com ondas e mechas trabalhadas, visto de costas", width: 1000, height: 1778 },
];

const BASE_SPEED = 28; // px/s
const FAST_SPEED = 110;

export function PortfolioPhotos() {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? undefined : photos[active];
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const target = useRef<number | null>(null);
  const mode = useRef<"normal" | "fast" | "paused">("normal");
  const state = useRef({ open: false });
  state.current = { open: selected !== undefined };

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px), (prefers-reduced-motion: reduce)").matches) return;
    let raf = 0; let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      const width = stripRef.current?.offsetWidth ?? 0;
      if (width > 0) {
        if (target.current !== null) {
          const diff = target.current - offset.current;
          if (Math.abs(diff) < 0.5) { offset.current = target.current; target.current = null; }
          else offset.current += diff * Math.min(1, dt * 7);
        } else if (!state.current.open && mode.current !== "paused") {
          offset.current += (mode.current === "fast" ? FAST_SPEED : BASE_SPEED) * dt;
        }
        if (target.current === null) offset.current = ((offset.current % width) + width) % width;
        if (trackRef.current) trackRef.current.style.transform = `translate3d(${-offset.current}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = (dir: 1 | -1) => {
    const strip = stripRef.current; if (!strip) return;
    const starts = Array.from(strip.children).map((el) => (el as HTMLElement).offsetLeft);
    const width = strip.offsetWidth;
    const cur = ((offset.current % width) + width) % width;
    let next: number;
    if (dir === 1) next = starts.find((s) => s > cur + 2) ?? width;
    else next = [...starts].reverse().find((s) => s < cur - 2) ?? (starts[starts.length - 1] ?? 0) - width;
    offset.current = cur;
    target.current = next;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.target as HTMLElement;
    if (el.closest(".portfolio-control")) { mode.current = "paused"; return; }
    if (el.closest(".portfolio-photo")) {
      const rect = event.currentTarget.getBoundingClientRect();
      const edge = Math.min(rect.width * 0.12, 140);
      const x = event.clientX - rect.left;
      mode.current = x < edge || x > rect.width - edge ? "fast" : "paused";
      return;
    }
    mode.current = "fast";
  };

  return <Dialog.Root open={selected !== undefined} onOpenChange={(open) => { if (!open) setActive(null); }}>
    <div className="portfolio-window" onMouseMove={handleMouseMove} onMouseLeave={() => { mode.current = "normal"; }}>
      <div className="portfolio-track" ref={trackRef}>
        {[0, 1].map((copy) => <div ref={copy ? undefined : stripRef} className={`portfolio-strip${copy ? " portfolio-strip-copy" : ""}`} key={copy} aria-hidden={copy ? true : undefined}>
          {photos.map((photo, index) => <Button key={photo.src} variant="ghost" className="portfolio-photo" tabIndex={copy ? -1 : undefined} onClick={() => setActive(index)} aria-label={`Ampliar: ${photo.alt}`}>
            <img src={photo.src} alt={copy ? "" : photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
          </Button>)}
        </div>)}
      </div>
      <div className="portfolio-controls" role="group" aria-label="Controles da galeria">
        <Button variant="ghost" size="icon" className="portfolio-control" onClick={() => step(-1)} aria-label="Foto anterior"><ChevronLeft aria-hidden="true" /></Button>
        <Button variant="ghost" size="icon" className="portfolio-control" onClick={() => step(1)} aria-label="Próxima foto"><ChevronRight aria-hidden="true" /></Button>
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
