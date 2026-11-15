import { useState } from 'react'

function formatDate(date) {
  if (!date) return 'Fecha desconocida'
  return new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ImageCard({
  title,
  image,
  date,
  center,
  description,
  creator,
  keywords,
  nasaId,
}) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <article className="card">
      <div className="card-image-wrapper">
        <img className="card-image" src={image} alt={title} loading="lazy" />
        {center && <span className="card-center">{center}</span>}
      </div>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-date">📅 {formatDate(date)}</p>

        {showDetails && (
          <div className="card-details">
            <p className="card-description">
              {description || 'Sin descripción disponible.'}
            </p>
            {creator && (
              <p className="card-meta">
                <strong>Créditos:</strong> {creator}
              </p>
            )}
            <p className="card-meta">
              <strong>ID NASA:</strong> {nasaId}
            </p>
            {keywords.length > 0 && (
              <ul className="card-keywords">
                {keywords.slice(0, 6).map((keyword) => (
                  <li key={keyword} className="keyword">
                    {keyword}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          className="btn card-button"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
        >
          {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
        </button>
      </div>
    </article>
  )
}

export default ImageCard
