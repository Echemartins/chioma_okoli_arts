// Extend the existing logo with a deterministic SVG colour treatment.
// The embedded source, lettering, geometry and alpha are unchanged.
const fs=require("node:fs");
const sharp=require("sharp");
async function main(){
  const source=fs.readFileSync("public/chioma-okoli-logo.png");
  const {width,height}=await sharp(source).metadata();
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><title>Chioma Okoli — Olive and Sage</title><defs><filter id="olive" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.342 0 0 0 0.145  0.382 0 0 0 0.196  0.263 0 0 0 0.122  0 0 0 1 0"/></filter></defs><image width="${width}" height="${height}" xlink:href="data:image/png;base64,${source.toString("base64")}" filter="url(#olive)"/></svg>`;
  fs.writeFileSync("public/branding/chioma-okoli-olive.svg",svg);
  await sharp(Buffer.from(svg)).png().toFile("public/branding/chioma-okoli-olive.png");
  console.log("Created olive/sage SVG and PNG variants. Original logo preserved.");
}
main().catch(()=>{console.error("Could not render logo variant");process.exitCode=1});
