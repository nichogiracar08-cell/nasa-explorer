function Footer() {
  return (
    <footer className="footer">
      <p>
        Datos e imágenes obtenidos de la{' '}
        <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer">
          API de la NASA
        </a>{' '}
        (NASA Image and Video Library).
      </p>
      <p className="footer-small">Parcial de React + Vite · Consumo de APIs</p>
    </footer>
  )
}

export default Footer
