import ImageCard from './ImageCard.jsx'

function Gallery({ items }) {
  return (
    <section className="gallery">
      {items.map((item) => {
        // La API guarda la información en data[0] y la imagen en links[0]
        const info = item.data[0]

        return (
          <ImageCard
            key={info.nasa_id}
            title={info.title}
            image={item.links[0].href}
            date={info.date_created}
            center={info.center}
            description={info.description}
            creator={info.photographer || info.secondary_creator}
            keywords={info.keywords || []}
            nasaId={info.nasa_id}
          />
        )
      })}
    </section>
  )
}

export default Gallery
