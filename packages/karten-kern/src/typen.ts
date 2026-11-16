import { z } from 'zod';

export const TRACKS = ['begriffe', 'praktikum'] as const;
export type Track = (typeof TRACKS)[number];
export type Stufe = 1 | 2 | 3;
export type Lernstufe = 'kann' | 'lerne' | 'offen';

export const MAX_FRAGE = 160;
export const MAX_ANTWORT = 400;
export const MAX_ERKLAERHILFE = 300;

export const trackSchema = z.enum(TRACKS);

export const karteSchema = z.object({
  id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'id nur aus a–z, 0–9 und -'),
  track: trackSchema,
  thema: z.string().trim().min(1),
  stufe: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  frage: z.string().trim().min(1).max(MAX_FRAGE),
  antwort: z.string().trim().min(1).max(MAX_ANTWORT),
  quelle: z.string().trim().min(1),
  /** Bild, Vergleich oder Alltagsbeispiel, das die Antwort greifbar macht. */
  /** Name einer Abbildung in inhalt/bilder/karten/<name>.webp. */
  abbildung: z.string().regex(/^[a-z0-9-]+$/).optional(),
  /** Abbildung auf der Vorderseite (Erkennungsfrage) statt auf der Rückseite. */
  abbildungVorne: z.boolean().optional(),
  erklaerhilfe: z.string().trim().min(1).max(MAX_ERKLAERHILFE).optional(),
});
export type Karte = z.infer<typeof karteSchema>;

export const themenDateiSchema = z.object({
  track: trackSchema,
  thema: z.string().min(1),
  karten: z.array(z.unknown()),
});
export interface ThemenDatei { track: Track; thema: string; karten: Karte[] }

export const lernstandSchema = z.object({
  id: z.string().min(1),
  box: z.number().int().min(0).max(5),
  faellig: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  richtig: z.number().int().min(0),
  falsch: z.number().int().min(0),
  serie: z.number().int().min(0),
  zuletzt: z.string().optional(),
  gemeldet: z.boolean().optional(),
});
export type Lernstand = z.infer<typeof lernstandSchema>;

export const sessionSchema = z.object({
  id: z.string().min(1),
  track: trackSchema,
  start: z.string(),
  ende: z.string().optional(),
  karten: z.array(z.string()),
  antworten: z.array(z.object({ id: z.string(), gewusst: z.boolean(), ms: z.number().min(0) })),
});
export type Session = z.infer<typeof sessionSchema>;


export const roadmapThemaSchema = z.object({
  thema: z.string().min(1),
  gruppe: z.string().min(1),
  text: z.string().min(1).max(200),
  link: z.string().url().optional(),
  /** Relativer Pfad zum Themenbild, setzt nur index-bauen. */
  bild: z.string().regex(/^inhalt\/bilder\/[a-z0-9-]+\.webp$/).optional(),
});
export const roadmapSchema = z.object({
  track: trackSchema,
  titel: z.string(),
  themen: z.array(roadmapThemaSchema).min(1),
});
export type Roadmap = z.infer<typeof roadmapSchema>;
export type RoadmapThema = z.infer<typeof roadmapThemaSchema>;

export interface ThemenFortschritt { thema: string; gesamt: number; kann: number; lerne: number; offen: number }
export interface Fortschritt extends Omit<ThemenFortschritt, 'thema'> { anteil: number; jeThema: ThemenFortschritt[] }
