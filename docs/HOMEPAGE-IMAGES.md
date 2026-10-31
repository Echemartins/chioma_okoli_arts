# Homepage photo variants

The originals remain unchanged at `public/branding/homepage-colour.jpg` and `public/branding/homepage-monochrome.jpg`.

New images, created with the built-in imagegen tool, are 1448 × 1086 (4:3):

- `public/branding/homepage-colour-wide.png`
- `public/branding/homepage-monochrome-wide.png`

These are AI-expanded photo variants, not untouched documentary photographs. Review the expanded artwork and gallery details before public use. All four versions are selectable in Admin → Appearance → Homepage image. The active database selection was set to `colour-wide`; the logo setting was preserved.

## Prompts used

Colour (edit target: original colour photo):

> Edit target: attached colour photograph. Create a landscape 4:3 homepage photo version by outpainting the LEFT and RIGHT edges of the original portrait. Preserve the complete original composition, the seated woman's exact face, body, clothing, hands, pose, and the existing foam artworks without redesigning them. Extend only the surrounding gallery wall and neutral room edges naturally to fit the wider canvas. Retain original lighting, colours, photographic texture. Do not add people, text, new artworks or decorative objects. No cropping the artist or original image content. Output one landscape 4:3 photograph, ideally 1440x1080.

Monochrome (edit target: new colour version; reference: original monochrome photo):

> Image 1 is the edit target: the landscape 4:3 colour photo. Image 2 is a reference for the black-and-white tones of the original portrait. Create a black-and-white version of image 1 with the tonal style of image 2. Preserve image 1's exact framing, dimensions, person identity, pose, face, clothing, artworks and gallery. Change only colour to neutral monochrome. No new elements, no crop, no text. Output one landscape 4:3 photo matching image 1.

## Validation

Production build and targeted lint checks passed. All four configured assets exist and pass the settings schema validation; unsupported choices are rejected. Both original uploaded photos were verified byte-identical to their source files.
