import ImageCard from './ImageCard.jsx'

function Gallery({ items }) {
  return (
    <section className="gallery">
      {items.map((item) => (
        <ImageCard
          key={item.id}
          title={item.title}
          image={item.image}
          date={item.date}
          center={item.center}
          description={item.description}
          creator={item.creator}
          keywords={item.keywords}
          nasaId={item.id}
        />
      ))}
    </section>
  )
}

export default Gallery
