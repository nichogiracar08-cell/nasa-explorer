function Loader() {
  return (
    <div className="loader" role="status">
      <div className="loader-orbit">
        <span className="loader-planet"></span>
      </div>
      <p>Cargando información de la NASA...</p>
    </div>
  )
}

export default Loader
