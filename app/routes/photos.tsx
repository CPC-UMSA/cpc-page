import { useState } from 'react';

export async function loader() {
  return null;
}

const PHOTOS_2024 = [
  '4E571DCD-1BEC-486B-A6F2-96150939A107_4_5005_c.jpeg',
  '02AB3672-90FF-406D-9F2D-119CF3365D47_4_5005_c.jpeg',
  '3A834A24-60F0-4707-A6C7-82C73429041B_4_5005_c.jpeg',
  '3974A83F-1058-45D1-8ECB-6919D1318492_4_5005_c.jpeg',
  'E26C35C8-7095-40EF-8902-4BFF90D4DE6D_4_5005_c.jpeg',
  '08B5E295-5500-4C19-B92D-62CE108EE869_4_5005_c.jpeg',
  '2EB1A7CF-2196-4EDE-9849-5157F45D2D23_4_5005_c.jpeg',
  'C63EBDDB-CC1E-487A-9E55-6AAC6FE13547_4_5005_c.jpeg',
  'F2806820-6BCC-41DD-B5D8-9450BBCF7A9E_4_5005_c.jpeg',
  '747F7726-D0C9-4A31-A2A6-26E35082FFAA_4_5005_c.jpeg',
  'D9E5584A-C96F-4E50-B95A-9F284FA48DEE_4_5005_c.jpeg',
  'F7766AF9-0F13-49BD-B8D8-7F636CCF476E_4_5005_c.jpeg',
  '458D6B20-9D59-4F7A-9113-B15DF1F97CAA_4_5005_c.jpeg',
  '54425A37-66B8-4333-BF03-648B9A5AD20A_4_5005_c.jpeg',
  'A5EB9011-4C6D-464B-AD4E-8DED8A0E9F52_4_5005_c.jpeg',
  '7C00CC96-F432-4F66-9F96-355B153D33F2_4_5005_c.jpeg',
  '3B601201-CB70-4072-893E-720FAB13979B_4_5005_c.jpeg',
  'F240CE63-FA1E-49FC-91EF-4CDDDC44C342_4_5005_c.jpeg',
  '14E48A42-B121-4DDC-A623-D734D897CB17_4_5005_c.jpeg',
  'C3EEF0BB-6268-409E-A2B8-43F5574A3659_4_5005_c.jpeg',
  '58725700-671B-49C5-B6DA-D21F207FE447_4_5005_c.jpeg',
  'D3BF01EA-F6FF-4925-8155-D647AD1E40CD_4_5005_c.jpeg',
  '17BDC0F2-585D-437F-97E2-BBABD121656D_4_5005_c.jpeg',
  'AB492F56-AED8-4138-A538-751CC82A20EB_4_5005_c.jpeg',
  '8FDA6304-DE1D-4E15-BAB1-2A902FD906F7_4_5005_c.jpeg',
  'D0CDA2A4-0ADB-4356-BC88-59F50FD81DDF_4_5005_c.jpeg',
  '8F6FBE5B-1B32-462C-8C07-2338A9E6E9FC_4_5005_c.jpeg',
  '781BC3BA-0C45-43D6-849C-2944E3601EA5_4_5005_c.jpeg',
  'ECEAAE1F-EA65-474E-AA5D-3F86F5627930_4_5005_c.jpeg',
  '943FC133-1685-4EAF-B684-817DC5C13694_4_5005_c.jpeg',
  'DB7E5CD5-6EF2-4A64-82E6-C22AD48D3D1A_4_5005_c.jpeg',
  '432A848A-8646-4BC9-ABFA-593B2A854773_4_5005_c.jpeg',
  '4EDF4018-24C3-462C-8E54-FC683D575480_1_102_o.jpeg',
  '8C91D03C-C38D-470D-B36E-B36561526398_1_102_o.jpeg',
  '7360CF0C-047B-4ED3-AADB-D30499F2649B_1_102_o.jpeg',
  '439D3567-CC5D-44FD-89AD-47C3CD86B531_1_102_o.jpeg',
  '94812DDB-E358-4CBC-A827-10ED6141E770_1_102_o.jpeg',
  'E60DCF50-52DB-4368-93E0-E890A632FE3D_1_102_o.jpeg',
  '51888b51-81e5-4dcd-9e85-8f89dc7aae16.jpg',
  '5078025703798189328.jpg',
  '5078025703798189327.jpg',
  '5078025703798189326.jpg',
  '5078025703798189325.jpg',
  '5078025703798189324.jpg',
  '5078025703798189323.jpg',
  '5078025703798189322.jpg',
  '5078025703798189321.jpg',
  '5078025703798189320.jpg',
  '5078025703798189319.jpg',
  '5078025703798189318.jpg',
  '5078025703798189317.jpg',
].map((f) => `/2024-div1-div2/${f}`);

const TABS = [{ label: '2024', photos: PHOTOS_2024 }];

export default function Photos() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const photos = TABS[activeTab].photos;

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
    <div className="photos-page">
      <div className="photos-hero">
        <h1 className="photos-hero-title cr-we">Fotos</h1>
        <p className="photos-hero-sub">Momentos del club</p>
      </div>

      <div className="photos-body">
        <div className="photos-tabs">
          {TABS.map((tab, i) => (
            <button key={tab.label} className={`photos-tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="photos-tabs-mobile">
          <select className="year-select" value={activeTab} onChange={(e) => setActiveTab(Number(e.target.value))}>
            {TABS.map((tab, i) => (
              <option key={tab.label} value={i}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        <div className="photos-grid">
          {photos.map((src, idx) => (
            <button key={src} className="photo-thumb" onClick={() => open(src, idx)}>
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="photo-lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-nav lightbox-prev" onClick={prev}>&#8249;</button>
          <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-nav lightbox-next" onClick={next}>&#8250;</button>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>&#x2715;</button>
        </div>
      )}
    </div>
  );
}