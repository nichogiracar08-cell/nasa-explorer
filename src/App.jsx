import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import Toolbar from './components/Toolbar.jsx'
import Gallery from './components/Gallery.jsx'
import Loader from './components/Loader.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

// API asignada: NASA (https://api.nasa.gov/) -> NASA Image and Video Library
const API_URL = 'https://images-api.nasa.gov/search'
const DEFAULT_QUERY = 'galaxy'

// Categorías: solo son términos de búsqueda que se envían a la API.
const CATEGORIES = [
  { label: 'Galaxias', query: 'galaxy' },
  { label: 'Nebulosas', query: 'nebula' },
  { label: 'Marte', query: 'mars' },
  { label: 'Luna', query: 'moon' },
  { label: 'Tierra', query: 'earth' },
  { label: 'Apolo', query: 'apollo' },
  { label: 'Astronautas', query: 'astronaut' },
  { label: 'Hubble', query: 'hubble' },
]

// Convierte cada elemento de la respuesta en un objeto más cómodo para las props.
function formatItem(item) {
  const info = item.data?.[0] ?? {}
  const links = item.links ?? []
  const image =
    links.find((link) => link.rel === 'preview') ??
    links.find((link) => link.render === 'image')

  return {
    id: info.nasa_id,
    title: info.title,
    description: info.description,
    date: info.date_created,
    center: info.center,
    creator: info.photographer ?? info.secondary_creator,
    keywords: info.keywords ?? [],
    image: image?.href,
  }
}

function App() {
  const [items, setItems] = useState([])
  const [totalHits, setTotalHits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [sortOrder, setSortOrder] = useState('relevance')
  const [retry, setRetry] = useState(0)

  // Petición a la API: se ejecuta al cargar y cada vez que cambia la búsqueda.
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const url = `${API_URL}?q=${encodeURIComponent(query)}&media_type=image&page_size=24`

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`La API respondió con el código ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        const results = data.collection.items
          .map(formatItem)
          .filter((item) => item.id && item.image)
        setItems(results)
        setTotalHits(data.collection.metadata?.total_hits ?? results.length)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setItems([])
        setLoading(false)
      })

    return () => controller.abort()
  }, [query, retry])

  // Ordenar resultados (sin modificar el estado original).
  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date)
    if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date)
    if (sortOrder === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  const hasFilters = query !== DEFAULT_QUERY || sortOrder !== 'relevance'

  function clearFilters() {
    setQuery(DEFAULT_QUERY)
    setSortOrder('relevance')
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="controls">
          <SearchBar query={query} onSearch={setQuery} />
          <CategoryFilter
            categories={CATEGORIES}
            activeQuery={query}
            onSelect={setQuery}
          />
        </section>

        <Toolbar
          query={query}
          shown={sortedItems.length}
          total={totalHits}
          loading={loading}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          hasFilters={hasFilters}
          onClear={clearFilters}
        />

        {loading && <Loader />}

        {!loading && error && (
          <div className="message message-error">
            <p>No se pudo cargar la información de la NASA.</p>
            <p className="message-detail">{error}</p>
            <button className="btn" onClick={() => setRetry(retry + 1)}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && sortedItems.length === 0 && (
          <div className="message">
            <p>No se encontraron imágenes para “{query}”.</p>
            <button className="btn" onClick={clearFilters}>
              Limpiar filtros
            </button>
          </div>
        )}

        {!loading && !error && sortedItems.length > 0 && (
          <Gallery items={sortedItems} />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
