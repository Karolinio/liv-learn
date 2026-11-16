import { Link, useNavigate, useParams } from 'react-router-dom';
import { fortschritt, slug, trackSchema } from '@liv-learn/karten-kern';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Seite } from '../components/ui/Seite';
import { themenBildUrl } from '../lib/bilder';
import { useApp, useInhalt } from '../lib/zustand';

/** /thema/:track/:slug: ein Roadmap-Thema mit Bild, Fortschritt, Start. */
export function Thema() {
  const params = useParams();
  const track = trackSchema.catch('begriffe').parse(params.track);
  const inhalt = useInhalt();
  const { staende } = useApp();
  const navigate = useNavigate();
  const t = inhalt.roadmaps[track]?.themen.find((x) => slug(x.thema) === params.slug);
  if (!t) return <Seite titel="Thema" zurueck={`/roadmap/${track}`} kinder={<p className="karte hinweistext">Dieses Thema gibt es hier nicht.</p>} />;

  const f = fortschritt(inhalt.karten.filter((k) => k.track === track && k.thema === t.thema), staende);
  const bild = themenBildUrl(t);
  const prozent = (n: number) => `${f.gesamt ? (n / f.gesamt) * 100 : 0}%`;

  return (
    <Seite titel={t.thema} untertitel={t.gruppe} zurueck={`/roadmap/${track}`} klasse="themenseite" kinder={
      <div className="stapelung" data-track={track}>
        {bild ? (
          <figure className="themenbild karte">
            <img src={bild} width={960} height={720} alt="" decoding="async" loading="eager" fetchPriority="high" />
          </figure>
        ) : null}
        <section className="karte themenblatt" aria-label="Worum es geht">
          <p className="themenblatt__text">{t.text}</p>
          <div className="dreibalken dreibalken--gross" role="img" aria-label={`${f.kann} kann ich, ${f.lerne} lerne ich, ${f.offen} offen`}>
            <span className="dreibalken__kann" style={{ width: prozent(f.kann) }} />
            <span className="dreibalken__lerne" style={{ width: prozent(f.lerne) }} />
          </div>
          <p className="themenblatt__zahlen"><b>{f.kann}</b> kann ich · <b>{f.lerne}</b> lerne ich · <b>{f.offen}</b> offen</p>
          <Button gross icon="stapel" disabled={!f.gesamt} onClick={() => navigate(`/stapel/${track}?thema=${encodeURIComponent(t.thema)}`)}>
            Dieses Thema lernen
          </Button>
        </section>
      </div>
    } />
  );
}
