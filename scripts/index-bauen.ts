import { join } from 'node:path';
import { baueIndex } from './index-lib';
import { INHALT, WURZEL } from './lib';

const r = baueIndex({ inhalt: INHALT, ziel: join(WURZEL, 'apps/web/public/inhalt') });
process.stdout.write(`index-bauen: ${r.karten} Karten, ${r.roadmaps} Lernpfade, ${r.bilder} Bilder\n`);
