import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import type { Swiper as SwiperInstance } from "swiper"
import { SECTION_IDS } from "@/data/section-ids"
import "swiper/css"

export interface GallerySlide {
  avifSrcSet: string
  webpSrcSet: string
  fallbackSrc: string
  alt: string
}

interface ProductGalleryProps {
  slides: GallerySlide[]
  sizes: string
}

const AUTOPLAY_DELAY = 3500
const TRANSITION_SPEED = 600

export function ProductGallery({ slides, sizes }: ProductGalleryProps) {
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const swiperRef = React.useRef<SwiperInstance | null>(null)
  const regionRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  React.useEffect(() => {
    const node = regionRef.current
    if (!node) return
    const control = (run: boolean) => {
      const swiper = swiperRef.current
      if (!swiper || !swiper.autoplay) return
      if (run) swiper.autoplay.start()
      else swiper.autoplay.stop()
    }
    const observer = new IntersectionObserver(
      ([entry]) => control(entry.isIntersecting && !document.hidden),
      { threshold: 0.15 },
    )
    observer.observe(node)
    const onVisibility = () => control(!document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Galería de presentaciones Vetoxzyn"
      className="js-products-gallery w-full overflow-x-clip"
    >
      <Swiper
        modules={[Autoplay]}
        loop
        speed={TRANSITION_SPEED}
        slidesPerView={1.2}
        spaceBetween={12}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
        autoplay={
          reducedMotion
            ? false
            : { delay: AUTOPLAY_DELAY, pauseOnMouseEnter: true, disableOnInteraction: false }
        }
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.alt}>
            {/* Transparent product cutouts need a surface: one consistent
                white plate (elevation via shadow only, per craft floor) reads
                the same on the light panel, the dark panel and mobile white.
                The image itself scales past the plate (no clipping) for the
                oversized bleed look. */}
            <div className="aspect-square w-full rounded-2xl bg-on-primary p-md shadow-card">
              {/* Whole slide links to the contact form (smooth scroll via the
                  base layer; Swiper's preventClicks keeps drags from
                  navigating; keyboard-focusable with the shared ring). */}
              <a
                href={`#${SECTION_IDS.contactoFormulario}`}
                aria-label={`Consultar sobre ${slide.alt}`}
                className="block h-full w-full cursor-pointer"
              >
              <picture className="flex h-full w-full items-center justify-center">
                <source type="image/avif" srcSet={slide.avifSrcSet} sizes={sizes} />
                <source type="image/webp" srcSet={slide.webpSrcSet} sizes={sizes} />
                <img
                  src={slide.fallbackSrc}
                  alt={slide.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain product-bleed"
                />
              </picture>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
