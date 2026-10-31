import { z } from "zod";

export const categories = ["Painting", "Sculpture", "Digital Art", "Photography", "Mixed Media", "Other"];
export const artworkThemes = ["Identity & memory", "Women & society", "Material & environment"];
export function safeImage(url) {
  if (typeof url !== "string") return false;
  if (/^\/(?!\/)/.test(url)) return !/[\\\x00-\x1f]/.test(url) && !url.includes("..");
  try { const u = new URL(url); return u.protocol === "https:" && u.hostname === "res.cloudinary.com" && !u.username && !u.password; } catch { return false; }
}
export function videoEmbed(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return null;
    const host = u.hostname.replace(/^www\./, "");
    const id = host === "youtu.be" ? u.pathname.slice(1) : host === "youtube.com" && u.pathname === "/watch" ? u.searchParams.get("v") : null;
    if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    if (host === "vimeo.com" && /^\/\d+$/.test(u.pathname)) return `https://player.vimeo.com/video${u.pathname}`;
  } catch { /* Invalid URL */ }
  return null;
}
const text = (max = 500) => z.string().trim().max(max).default("");
export const artworkInput = z.object({
  title: z.string().trim().min(2).max(200), description: text(15000),
  imageUrl: z.string().refine(safeImage, "Use a local image path or Cloudinary URL"),
  category: z.enum(categories).default("Other"), year: text(50), medium: text(), dimensions: text(200),
  series: text(200), theme: z.enum(["", ...artworkThemes]).default(""), alt: text(),
  exhibitionHistory: text(10000), processNotes: text(15000), researchNotes: text(15000),
  relatedWorks: z.array(z.string().regex(/^(?:[a-f0-9]{24}|[a-z0-9]+(?:-[a-z0-9]+)*)$/)).max(30).default([]),
  media: z.array(z.object({url: z.string().refine(safeImage, "Invalid image URL"), alt: text(), caption: text(1000), kind: z.enum(["Detail", "Process", "Light study", "Installation", "Full work"]).default("Detail")})).max(24).default([]),
  videoUrls: z.array(z.string().refine(v => !!videoEmbed(v), "Use a YouTube or Vimeo video link")).max(8).default([]),
  price: z.number().finite().min(0).optional(), sortOrder: z.number().int().min(0).max(99999).default(0),
  isSelected: z.boolean().default(false), isFeatured: z.boolean().default(false), isEva: z.boolean().default(false),
  published: z.boolean().default(false), acquisitionAvailable: z.boolean().default(false),
  archived: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (data.published && !data.archived && !data.description) ctx.addIssue({code:"custom", path:["description"], message:"Add a conceptual description before publishing"});
});
