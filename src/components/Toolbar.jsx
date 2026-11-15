function Toolbar({
  query,
  shown,
  total,
  loading,
  sortOrder,
  onSortChange,
  hasFilters,
  onClear,
}) {
  return (
    <div className="toolbar">
      <p className="toolbar-count">
        {loading ? (
          'Buscando...'
        ) : (
          <>
            Mostrando <strong>{shown}</strong> de{' '}
            <strong>{total.toLocaleString('es-CO')}</strong> resultados para “
            {query}”
          </>
        )}
      </p>

      <div className="toolbar-actions">
        <label className="sort-label">
          Ordenar:
          <select
            className="sort-select"
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="relevance">Relevancia</option>
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguas</option>
            <option value="title">Título (A-Z)</option>
          </select>
        </label>

        <button className="btn" onClick={onClear} disabled={!hasFilters}>
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}

export default Toolbar
