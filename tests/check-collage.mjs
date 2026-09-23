import { existsSync, readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const cssUrl = new URL("../styles.css", import.meta.url);
const scriptUrl = new URL("../script.js", import.meta.url);
const faviconUrl = new URL("../favicon.svg", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(existsSync(cssUrl), "falta styles.css");
assert(existsSync(scriptUrl), "falta script.js");
assert(existsSync(faviconUrl), "falta favicon.svg");

const css = readFileSync(cssUrl, "utf8");
const script = readFileSync(scriptUrl, "utf8");
const favicon = readFileSync(faviconUrl, "utf8");

assert(html.includes('<link rel="stylesheet" href="styles.css" />'), "index.html debe enlazar styles.css");
assert(html.includes('<script src="script.js"></script>'), "index.html debe enlazar script.js");
assert(html.includes('<link rel="icon" type="image/svg+xml" href="favicon.svg" />'), "index.html debe enlazar favicon.svg");
assert(!/<style>[\s\S]*<\/style>/.test(html), "index.html no debe contener CSS inline");
assert(!/<script>([\s\S]*)<\/script>/.test(html), "index.html no debe contener JavaScript inline");
assert(css.includes(".photo-collage"), "styles.css debe contener los estilos de la portada");
assert(script.includes("const letters = ["), "script.js debe contener los datos de las cartas");
assert(favicon.includes('aria-label="Sobre romántico"'), "el favicon debe identificar el sobre romántico");
assert((html.match(/class="photo-collage"/g) ?? []).length === 1, "falta el collage de portada");
assert((html.match(/Fotos%20Daiara%20Bebe/g) ?? []).length === 6, "el collage debe tener seis fotos de bebé");
assert(html.includes('id="letterImageOne"'), "falta la primera imagen de carta");
assert(html.includes('id="letterImageTwo"'), "falta la segunda imagen de carta");
assert((script.match(/images:\s*\[/g) ?? []).length === 3, "cada carta debe declarar su par de imágenes");
assert(!html.includes("images/carta-"), "quedó una ruta antigua de imagen");
assert(/\.photo-fallback\[hidden\]\s*\{\s*display:\s*none/.test(css), "el fallback oculto no debe cubrir las fotos");
assert(/\.landing-view\[hidden\]\s*\{\s*display:\s*none/.test(css), "la portada oculta no debe reservar una pantalla vacía");
assert(script.includes("landingView.hidden = true"), "la portada debe salir del flujo al abrir una carta");
assert(script.includes("landingView.hidden = false"), "la portada debe volver al flujo al cerrar una carta");
assert((script.match(/^\s{4}theme:/gm) ?? []).length === 3, "cada carta debe mostrar theme en su propia línea");
assert((script.match(/^\s{4}title:/gm) ?? []).length === 3, "cada carta debe mostrar title en su propia línea");
assert((script.match(/^\s{4}signature:/gm) ?? []).length === 3, "cada carta debe mostrar signature en su propia línea");
assert((script.match(/images\/Fotos Nosotros Juntos/g) ?? []).length === 6, "deben conservarse las seis referencias de fotos");
assert(!script.includes("\\\\nTu tito"), "las firmas no deben escapar dos veces el salto de línea");

console.log("check-collage: OK");
