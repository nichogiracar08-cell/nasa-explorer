function CategoryFilter({ categories, activeQuery, onSelect }) {
  return (
    <div className="categories" aria-label="Categorías">
      {categories.map((category) => (
        <button
          key={category.query}
          type="button"
          className={
            category.query === activeQuery.toLowerCase()
              ? 'chip chip-active'
              : 'chip'
          }
          onClick={() => onSelect(category.query)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
