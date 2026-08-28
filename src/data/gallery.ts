import type { ImageMetadata } from "astro";

/**
 * Gallery registry. Not wired into any page on this site (a solo legal
 * practice has no natural photo gallery) — kept so an office/certificates
 * section can be added later without rebuilding this infrastructure. Adding a
 * photo means dropping the file into `src/assets/gallery/` and adding a line
 * here — `img()` throws at build time if a filename does not resolve, so a
 * typo fails loudly instead of silently rendering nothing.
 *
 * Rename these categories to match the real work being shown; the labels come
 * from `d.gallery.categories` in the dictionaries.
 */
export type GalleryCategory = "office" | "certificates" | "other";

export interface GalleryItem {
  src: ImageMetadata;
  category: GalleryCategory;
  /** Describe what is in the photo. Shown to screen readers and crawlers. */
  alt: string;
}

const files = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/gallery/*.{jpg,jpeg,JPG,png}",
  { eager: true },
);

function img(name: string): ImageMetadata {
  const key = Object.keys(files).find((k) => k.endsWith("/" + name));
  if (!key) {
    throw new Error(
      `Gallery image not found: ${name}. Available: ${Object.keys(files)
        .map((k) => k.split("/").pop())
        .join(", ")}`,
    );
  }
  return files[key].default;
}

export const galleryItems: GalleryItem[] = [
  { src: img("placeholder-01.jpg"), category: "office", alt: "Placeholder image one" },
  { src: img("placeholder-02.jpg"), category: "office", alt: "Placeholder image two" },
  { src: img("placeholder-03.jpg"), category: "certificates", alt: "Placeholder image three" },
  { src: img("placeholder-04.jpg"), category: "certificates", alt: "Placeholder image four" },
  { src: img("placeholder-05.jpg"), category: "other", alt: "Placeholder image five" },
  { src: img("placeholder-06.jpg"), category: "other", alt: "Placeholder image six" },
];
