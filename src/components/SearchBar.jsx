import { useEffect, useState } from 'react'

function SearchBar({ query, categories, onSearch }) {
  const [text, setText] = useState(query)

  // Si la búsqueda cambia desde afuera (categorías o limpiar filtros), se refleja en el input.
  useEffect(() => {
    setText(query)
  }, [query])

  function handleSubmit(event) {
    event.preventDefault()
    const value = text.trim()
    if (value !== '') {
      onSearch(value)
    }
  }

  return (
    <section className="controls">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Buscar en la NASA: saturn, apollo 11, black hole..."
          aria-label="Buscar imágenes de la NASA"
        />
        <button className="btn btn-primary" type="submit">
          Buscar
        </button>
      </form>

      {/* Botones de categorías: cada uno hace una búsqueda */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.query}
            type="button"
            className={category.query === query ? 'chip chip-active' : 'chip'}
            onClick={() => onSearch(category.query)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default SearchBar
