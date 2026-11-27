import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import {
  STOREFRONT_HERO,
  STOREFRONT_HERO_SLIDES,
} from "~/features/shop/data/storefront";
import { useHeroSlider } from "~/features/shop/hooks/use-hero-slider";

export function HeroSection() {
  const slider = useHeroSlider(STOREFRONT_HERO_SLIDES.length);

  return (
    <section
      aria-label="Promo utama"
      className="mx-auto max-w-7xl px-4 pt-4 sm:px-6"
    >
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <Carousel
          opts={{ loop: true }}
          plugins={[slider.plugin]}
          setApi={slider.setApi}
          className="relative overflow-hidden rounded-2xl bg-[#1C1917] text-white"
        >
          <CarouselContent className="ml-0">
            {STOREFRONT_HERO_SLIDES.map((slide, i) => {
              const isActive = i === slider.selected;
              const TitleTag = i === 0 ? "h1" : "p";
              return (
                <CarouselItem
                  key={slide.title}
                  aria-label={`${i + 1} dari ${slider.count}`}
                  aria-hidden={!isActive}
                  className="relative min-h-[300px] pl-0 sm:min-h-[340px]"
                >
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={1600}
                    height={900}
                    fetchPriority={i === 0 ? "high" : undefined}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    aria-hidden={!isActive}
                    className="absolute inset-0 h-full w-full object-cover opacity-75"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-[#1C1917]/85 via-[#1C1917]/45 to-transparent"
                  />
                  <div className="relative flex min-h-[300px] flex-col justify-center gap-3 p-6 sm:min-h-[340px] sm:p-10">
                    <Badge className="w-fit rounded-full bg-[#BE185D] px-3 py-0.5 text-xs font-semibold text-white">
                      {slide.eyebrow}
                    </Badge>
                    <TitleTag className="max-w-[18ch] text-2xl leading-[1.15] font-extrabold tracking-tight text-balance sm:text-4xl">
                      {slide.title}
                    </TitleTag>
                    <p className="max-w-[46ch] text-sm leading-relaxed text-white/90">
                      {slide.description}
                    </p>
                    <div className="pt-1">
                      <Link
                        to="/katalog"
                        search={
                          slide.category ? { category: slide.category } : {}
                        }
                        tabIndex={isActive ? undefined : -1}
                        className={buttonVariants({
                          variant: "secondary",
                          className:
                            "h-11 rounded-full bg-white px-6 text-sm font-bold text-[#1C1917] shadow-md ring-1 ring-black/10 hover:bg-[#FDF2F8] hover:text-[#9D174D]",
                        })}
                      >
                        {slide.ctaLabel}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="absolute right-4 bottom-4 z-10 flex items-center gap-1.5 rounded-full bg-[#1C1917]/55 px-3 py-2 backdrop-blur-xs">
            {STOREFRONT_HERO_SLIDES.map((slide, i) => {
              const isActive = i === slider.selected;
              return (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => slider.goTo(i)}
                  aria-label={`Ke banner ${i + 1}: ${slide.title}`}
                  aria-current={isActive}
                  className={`h-2 w-7 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isActive ? "bg-white" : "bg-white/45 hover:bg-white/75"
                  }`}
                />
              );
            })}
          </div>
        </Carousel>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {STOREFRONT_HERO.sideCards.map((card) => (
            <Link
              key={card.title}
              to="/katalog"
              search={{ category: card.category }}
              aria-label={`Lihat kategori ${card.title}`}
              className="group relative min-h-[144px] overflow-hidden rounded-2xl bg-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D] lg:min-h-0"
            >
              <img
                src={card.image}
                alt=""
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-[#1C1917]/25 to-transparent"
              />
              <span className="absolute right-3 bottom-3 left-3 text-white">
                <span className="block text-sm font-bold leading-snug">
                  {card.title}
                </span>
                <span className="text-xs text-white/90">{card.subtitle}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
