# NASA Explorer 🚀

**Nombre del estudiante:** Nicholas Giraldo

**API asignada:** NASA API – imágenes e información espacial (https://api.nasa.gov/)

**Endpoint utilizado:**

```text
https://images-api.nasa.gov/search?q={búsqueda}&media_type=image&page_size=24
```

Corresponde al servicio **NASA Image and Video Library**, uno de los servicios publicados en https://api.nasa.gov/. No requiere `api_key`.

> Nota: el endpoint de ejemplo del enunciado (`/marsphotos/api/v1/rovers/curiosity/photos`) ya no está disponible (responde 404), por eso se usó otro servicio de la misma API de la NASA.

**Descripción de la aplicación:**

NASA Explorer es una galería espacial hecha con React + Vite. Consume en tiempo real el archivo fotográfico de la NASA y muestra tarjetas con imágenes de galaxias, nebulosas, planetas y misiones. El usuario puede buscar cualquier tema, cambiar entre categorías, ordenar los resultados y ver los detalles de cada imagen. El diseño usa una temática oscura de espacio con los colores de la NASA y se adapta a computador, tablet y celular.

**Componentes desarrollados:**

```text
App
│
├── Header          → título y presentación de la aplicación
├── SearchBar       → formulario de búsqueda
├── CategoryFilter  → botones de categorías (Galaxias, Marte, Luna...)
├── Toolbar         → contador de resultados, ordenamiento y limpiar filtros
├── Loader          → indicador de carga
├── Gallery         → recorre los datos con .map() y crea las tarjetas
│   └── ImageCard   → tarjeta de cada imagen (recibe los datos por props)
└── Footer          → créditos de la API
```

**Datos utilizados de la API:**

De cada elemento de `collection.items` se usa:

- `title` → título de la imagen
- `links[].href` → imagen
- `date_created` → fecha
- `center` → centro de la NASA que la publicó
- `description` → descripción
- `photographer` / `secondary_creator` → créditos
- `keywords` → palabras clave
- `nasa_id` → identificador
- `collection.metadata.total_hits` → total de resultados de la búsqueda

**Funcionalidad de búsqueda o filtro:**

- **Búsqueda:** el texto escrito en el buscador se envía a la API en el parámetro `q` y se hace una nueva petición con `fetch()`.
- **Categorías:** botones que cambian la búsqueda (Galaxias, Nebulosas, Marte, Luna, Tierra, Apolo, Astronautas, Hubble).

**Funcionalidad adicional implementada:**

- Ver detalles / Ocultar detalles en cada tarjeta (descripción, créditos, ID y palabras clave).
- Ordenar resultados (relevancia, más recientes, más antiguas, título A-Z).
- Contador de resultados (mostrados y total en la API).
- Botón para limpiar filtros.
- Estado de carga y mensaje de error si la API no responde.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Luego abrir la dirección que muestra la terminal (por defecto http://localhost:5173).
