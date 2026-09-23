import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert((html.match(/class="photo-collage"/g) ?? []).length === 1, "falta el collage de portada");
assert((html.match(/Fotos%20Daiara%20Bebe/g) ?? []).length === 6, "el collage debe tener seis fotos de bebé");
assert(html.includes('id="letterImageOne"'), "falta la primera imagen de carta");
assert(html.includes('id="letterImageTwo"'), "falta la segunda imagen de carta");
assert((html.match(/images:\s*\[/g) ?? []).length === 3, "cada carta debe declarar su par de imágenes");
assert(!html.includes("images/carta-"), "quedó una ruta antigua de imagen");
assert(!html.match(/images:\s*\[[^\]]*Fotos%20Nosotros%20Juntos/), "las rutas dinámicas no deben codificar los espacios dos veces");

console.log("check-collage: OK");
