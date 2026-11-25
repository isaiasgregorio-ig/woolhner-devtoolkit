<p align="center">
  <img src="./public/brand/woolhner-logo.jpeg" alt="Woolhner logo" width="180">
</p>

<h1 align="center">Woolhner DevToolkit</h1>

<p align="center">
  Herramientas prácticas que funcionan en tu navegador, para desarrolladores,
  ingenieros web y profesionales de TI.
</p>

<p align="center">
  <a href="https://woolhner.com">woolhner.com</a>
</p>

## Qué es

Woolhner DevToolkit es una derivación de
[IT-Tools](https://github.com/CorentinTh/it-tools), el proyecto original de
[Corentin Thomasset](https://corentin.tech). Conserva las 89 herramientas
originales, añade tres utilidades reales para Cloudflare y reorganiza el
directorio en once categorías:

- Desarrollo
- Generadores
- Convertidores
- Web y API
- Redes
- Seguridad
- Texto y datos
- Matemáticas
- Imágenes y QR
- Medición
- Cloudflare

La interfaz está en español de forma predeterminada, con inglés como idioma de
respaldo. Todas las transformaciones se ejecutan localmente en el navegador: no
hay cuentas, bases de datos ni analítica. Las herramientas que consultan un
servicio externo (por ejemplo, la búsqueda de fabricantes por dirección MAC) lo
indican en su propia interfaz.

### Utilidades Cloudflare incluidas

- **Generador de configuración de Wrangler**: crea `wrangler.toml` para Workers
  con enlaces KV, D1, R2 y variables.
- **Validador de configuración de Wrangler**: comprueba `wrangler.toml` o
  `wrangler.jsonc` pegados y devuelve errores y advertencias accionables.
- **Ayudante de cron de Cloudflare**: valida expresiones cron de Workers, las
  explica en lenguaje natural y genera el bloque `[triggers]`.

Estas tres herramientas funcionan completamente en el cliente; sus pruebas
unitarias viven junto a los servicios en `src/tools/cloudflare/`.

## Desarrollo

Requiere Node.js 18+ y pnpm 9.11.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Comandos útiles

```sh
pnpm typecheck              # Comprobación de tipos con vue-tsc
pnpm lint                   # ESLint
pnpm test                   # Pruebas unitarias (Vitest, modo watch)
pnpm exec vitest run --environment jsdom  # Pruebas unitarias (una sola vez)
pnpm build                  # Compilación estática de producción
pnpm test:e2e               # Pruebas end-to-end (Playwright)
pnpm preview                # Vista previa de la compilación en el puerto 5050
```

Para generar la estructura de una herramienta nueva:

```sh
pnpm run script:create:tool nombre-de-la-herramienta
```

Después añade la herramienta a la categoría correspondiente en
`src/tools/index.ts` y crea sus textos en `locales/en.yml` y `locales/es.yml`.

## Despliegue

La salida de `pnpm build` es un sitio estático compatible con Cloudflare Pages.
Consulta [`DEPLOYMENT.md`](DEPLOYMENT.md) para el directorio de salida, las
variables de entorno, las redirecciones SPA y la configuración de PWA.

También puedes servir `dist/` con cualquier servidor de archivos estáticos que
redirija las rutas desconocidas a `index.html`.

## Marca y diseño

La identidad visual usa el logotipo real de Woolhner y una paleta monocroma
derivada de él: tinta negra, papel blanco y una escala neutra de grises. No se
ha inventado ningún color, tipografía ni logotipo «oficial». El sistema de
tokens, las decisiones documentadas y el origen de cada recurso están en
[`BRAND.md`](BRAND.md).

## Atribución y licencia

Este proyecto es una obra derivada de IT-Tools, creado por Corentin Thomasset y
distribuido originalmente bajo GNU GPL-3.0. Se conservan el autor, la licencia,
los avisos de terceros y el historial del repositorio original. Los cambios
realizados por Woolhner se enumeran en [`UPSTREAM.md`](UPSTREAM.md).

- Licencia: [GNU GPL-3.0](LICENSE)
- Proyecto original: [CorentinTh/it-tools](https://github.com/CorentinTh/it-tools)
- Autor original: [Corentin Thomasset](https://corentin.tech)
- Mantenedor de la derivación: [Woolhner](https://woolhner.com)

No se ha enviado nada al repositorio original; todo el trabajo de esta
derivación se realizó en una rama local.
