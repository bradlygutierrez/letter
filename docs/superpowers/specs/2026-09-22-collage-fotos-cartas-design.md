# Diseño: Collage de fotos y cabeceras para las cartas

## Objetivo

Actualizar la portada de `letter/index.html` para que la experiencia empiece con un collage cálido de fotos de bebé y usar dos fotos de la carpeta `Fotos Nosotros Juntos` como cabecera visual de cada carta. El resultado debe sentirse íntimo, cuidado y cómodo desde el primer viewport móvil.

## Dirección visual aprobada

- El collage de bebé aparecerá arriba del título, como marco visual del encabezado.
- Tendrá una composición editorial irregular: una foto principal y varias fotos secundarias superpuestas o escalonadas.
- Se usará una capa suave de papel/crema, bordes redondeados y pequeñas rotaciones para que parezca un álbum personal, sin tapar la lectura.
- El título y el texto introductorio permanecerán debajo del collage, centrados y con suficiente contraste.
- Las tres cartas conservarán el concepto de sobres, pero cada una tendrá una cabecera dividida en dos fotos de `Fotos Nosotros Juntos`.

## Mapeo de imágenes

- Collage de bebé: fotos disponibles en `images/Fotos Daiara Bebe/`.
- Carta 01: dos fotos de `images/Fotos Nosotros Juntos/`.
- Carta 02: dos fotos diferentes de la misma carpeta.
- Carta 03: la pareja restante o una combinación equilibrada si la cantidad de fotos no coincide exactamente.

Las rutas con espacios y paréntesis deben codificarse correctamente en HTML/JavaScript. Cada imagen tendrá un `alt` descriptivo y las cabeceras deben degradar a un fondo cálido si una foto no carga.

## Responsive mobile-first

- En móvil, el collage tendrá una altura contenida y no debe empujar las cartas fuera del primer vistazo.
- El título se reducirá de forma fluida y no generará wraps incómodos.
- Los sobres se mostrarán en una sola columna, con menor altura, padding consistente y un área táctil cómoda.
- En cada carta abierta, la cabecera de dos fotos mantendrá una relación visual estable, sin estirar imágenes verticales.
- En pantallas medianas y grandes, el collage puede crecer ligeramente y los sobres volverán a tres columnas.
- Se mantendrá el soporte para `prefers-reduced-motion`.

## Componentes y comportamiento

1. `photo-collage`: bloque semántico de portada con fotos de bebé decorativas y texto alternativo vacío para imágenes puramente visuales.
2. `envelope-card`: cada sobre mantiene su interacción actual y suma una textura visual derivada de las fotos solo en la vista interna, no en el botón de portada.
3. `letter-photo`: se transforma en una galería de dos imágenes lado a lado, con fallback individual o global ante errores.
4. `letters`: el arreglo de JavaScript incluirá dos rutas de imágenes por carta y renderizará ambas al abrirla.

## Accesibilidad y fallbacks

- Las fotos decorativas del collage usarán `alt=""` y no interferirán con la navegación por lector de pantalla.
- Las fotos de las cartas tendrán textos alternativos útiles.
- No se mostrarán iconos de imagen rota si falla una ruta.
- Se conservarán el foco visible, la navegación con teclado, Escape para volver y las áreas táctiles de mínimo 44 px.

## Verificación

- Confirmar que el collage usa exclusivamente fotos de bebé.
- Confirmar que cada carta muestra dos fotos de la carpeta de fotos juntos.
- Abrir las tres cartas y regresar a la portada sin perder el foco.
- Revisar móvil estrecho, móvil ancho y escritorio.
- Confirmar que fotos verticales no se deforman.
- Confirmar fallback y navegación con teclado.
