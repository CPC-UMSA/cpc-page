import { useState } from 'react';

export function PhotoGallery({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  function open(src: string, idx: number) {
    setLightbox(src);
    setLightboxIdx(idx);
  }

  function prev(e: React.MouseEvent) {
    e.stopPropagation();
    const idx = (lightboxIdx - 1 + photos.length) % photos.length;
    setLightboxIdx(idx);
    setLightbox(photos[idx]);
  }

  function next(e: React.MouseEvent) {
    e.stopPropagation();
    const idx = (lightboxIdx + 1) % photos.length;
    setLightboxIdx(idx);
    setLightbox(photos[idx]);
  }

  return (
    <>
      <div className="photos-grid">
        {photos.map((src, idx) => (
          <button key={src} className="photo-thumb" onClick={() => open(src, idx)}>
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="photo-lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-nav lightbox-prev" onClick={prev}>
            &#8249;
          </button>
          <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-nav lightbox-next" onClick={next}>
            &#8250;
          </button>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            &#x2715;
          </button>
        </div>
      )}
    </>
  );
}
