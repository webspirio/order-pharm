import { useState } from "react";

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  category: string;
}

export interface GalleryCategoryOption {
  key: string;
  label: string;
}

export default function GalleryGrid({
  items,
  categories,
  allLabel,
}: {
  items: GalleryImage[];
  categories: GalleryCategoryOption[];
  allLabel: string;
}) {
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? items : items.filter((i) => i.category === active);

  const filters = [{ key: "all", label: allLabel }, ...categories];

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActive(filter.key)}
            aria-pressed={active === filter.key}
            className={
              active === filter.key
                ? "rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                : "rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <figure
            key={item.src}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <img
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
