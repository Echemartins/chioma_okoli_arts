import { works } from "./portfolio.js";
export function seedArtwork(work, index) {
  return { ...work, _id: `seed-${work.slug}`, sourceKey: work.slug, imageUrl: work.image,
    category: work.category || "Painting", isSelected: work.isSelected ?? true, isFeatured: work.isFeatured ?? (index < 6), isEva:work.isEva ?? false, published: true,
    acquisitionAvailable: false, sortOrder: work.sortOrder ?? index, media: [], videoUrls: [], relatedWorks: [] };
}
export function mergeArtworks(documents) {
  const used = new Set();
  const merged = works.map((w, i) => {
    // Match legacy records by title on read; saving the seed adopts that record.
    const match = documents.find(d => d.sourceKey === w.slug) || documents.find(d => !d.sourceKey && d.title?.trim().toLowerCase() === w.title.toLowerCase());
    if (match) used.add(String(match._id));
    const base = seedArtwork(w, i);
    return match ? {...base, ...match, slug: w.slug, image: match.imageUrl, _id: String(match._id), published: match.published !== false} : base;
  });
  for (const d of documents) if (!used.has(String(d._id))) merged.push({...d, _id:String(d._id), slug:d.sourceKey || String(d._id), image:d.imageUrl, published:d.published !== false});
  return merged.sort((a,b) => (a.sortOrder || 0) - (b.sortOrder || 0) || a.title.localeCompare(b.title));
}

export function visibleArtworks(rows) { return rows.filter(w => w.published && !w.archived && !w.deleted); }
export function publicArtwork(w) {
  const {price, sourceKey, isStoreItem, ...result} = w;
  return result;
}

