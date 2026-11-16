import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import Toolbar from './components/Toolbar.jsx'
import ImageCard from './components/ImageCard.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

// API de la NASA (NASA Image and Video Library)
const API_URL = 'https://images-api.nasa.gov/search'

// Las categorías son palabras que se le mandan a la API como búsqueda
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

function App() {
  const [items, setItems] = useState([]) // imágenes que devuelve la API
  const [total, setTotal] = useState(0) // total de resultados que tiene la API
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('galaxy') // lo que se está buscando
  const [sortOrder, setSortOrder] = useState('relevance')

  // Trae los datos de la API. Se ejecuta al abrir la página
  // y otra vez cada que cambia la búsqueda (query).
  useEffect(() => {
    async function loadImages() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          API_URL + '?q=' + query + '&media_type=image&page_size=24'
        )
        const data = await response.json()

        // algunos resultados llegan sin imagen, esos no se muestran
        const withImage = data.collection.items.filter((item) => item.links)

        setItems(withImage)
        setTotal(data.collection.metadata.total_hits)
      } catch (err) {
        setError('No se pudo cargar la información de la NASA.')
        setItems([])
      }

      setLoading(false)
    }

    loadImages()
  }, [query])

  // Se ordena una copia para no modificar el estado directamente
  const sortedItems = [...items]

  if (sortOrder === 'newest') {
    sortedItems.sort(
      (a, b) => new Date(b.data[0].date_created) - new Date(a.data[0].date_created)
    )
  }
  if (sortOrder === 'oldest') {
    sortedItems.sort(
      (a, b) => new Date(a.data[0].date_created) - new Date(b.data[0].date_created)
    )
  }
  if (sortOrder === 'title') {
    sortedItems.sort((a, b) => a.data[0].title.localeCompare(b.data[0].title))
  }

  const hasFilters = query !== 'galaxy' || sortOrder !== 'relevance'

  function clearFilters() {
    setQuery('galaxy')
    setSortOrder('relevance')
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        <SearchBar query={query} categories={CATEGORIES} onSearch={setQuery} />

        <Toolbar
          query={query}
          shown={sortedItems.length}
          total={total}
          loading={loading}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          hasFilters={hasFilters}
          onClear={clearFilters}
        />

        {loading && (
          <div className="loader">
            <div className="loader-orbit">
              <span className="loader-planet"></span>
            </div>
            <p>Cargando información de la NASA...</p>
          </div>
        )}

        {!loading && error !== '' && (
          <div className="message message-error">
            <p>{error}</p>
            <p className="message-detail">Revisa tu conexión e intenta de nuevo.</p>
          </div>
        )}

        {!loading && error === '' && sortedItems.length === 0 && (
          <div className="message">
            <p>No se encontraron imágenes para “{query}”.</p>
            <button className="btn" onClick={clearFilters}>
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Galería: una tarjeta por cada imagen que devolvió la API */}
        {!loading && (
          <section className="gallery">
            {sortedItems.map((item) => (
              <ImageCard
                key={item.data[0].nasa_id}
                title={item.data[0].title}
                image={item.links[0].href}
                date={item.data[0].date_created}
                center={item.data[0].center}
                description={item.data[0].description}
                creator={item.data[0].photographer || item.data[0].secondary_creator}
                keywords={item.data[0].keywords || []}
                nasaId={item.data[0].nasa_id}
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
