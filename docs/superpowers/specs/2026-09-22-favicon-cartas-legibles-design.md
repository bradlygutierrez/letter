# Diseño: Favicon romántico y cartas legibles

## Objetivo

Agregar un favicon coherente con la página y reformatear el arreglo `letters` para que el contenido de cada carta sea fácil de leer y editar directamente en `script.js`.

## Favicon

- Crear `favicon.svg` como archivo independiente.
- Representar un sobre crema/rosado con un sello de corazón color vino.
- Mantener formas simples y contraste alto para que sea reconocible en tamaños pequeños.
- Enlazarlo desde `index.html` con `rel="icon"` y `type="image/svg+xml"`.

## Contenido de las cartas

- Mantener el arreglo `letters` en `script.js`.
- Dar a cada objeto una estructura multilínea consistente.
- Colocar `theme`, `title`, `images`, `fallback`, `paragraphs` y `signature` en líneas separadas.
- Mostrar cada imagen y cada párrafo en su propia línea dentro de sus arreglos.
- No modificar textos, rutas, firmas ni comportamiento.

## Verificación

- Confirmar que `index.html` enlaza `favicon.svg`.
- Validar que el SVG tiene estructura correcta y no depende de recursos externos.
- Comprobar que siguen existiendo tres objetos de carta, dos imágenes y dos párrafos por carta.
- Ejecutar la prueba existente y verificar la sintaxis de `script.js`.
