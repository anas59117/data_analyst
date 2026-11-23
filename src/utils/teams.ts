interface TeamInfo {
  abbr: string
  color: string
  color2: string
  logo?: string
}

const CREST = 'https://crests.football-data.org'

const teams: Record<string, TeamInfo> = {
  'Paris Saint-Germain':     { abbr: 'PSG',  color: '#004170', color2: '#DA291C', logo: `${CREST}/524.png` },
  'PSG':                     { abbr: 'PSG',  color: '#004170', color2: '#DA291C', logo: `${CREST}/524.png` },
  'Olympique de Marseille':  { abbr: 'OM',   color: '#2FAEE0', color2: '#FFFFFF', logo: `${CREST}/516.png` },
  'Marseille':               { abbr: 'OM',   color: '#2FAEE0', color2: '#FFFFFF', logo: `${CREST}/516.png` },
  'AS Monaco':               { abbr: 'ASM',  color: '#E2001A', color2: '#FFFFFF', logo: `${CREST}/548.png` },
  'Monaco':                  { abbr: 'ASM',  color: '#E2001A', color2: '#FFFFFF', logo: `${CREST}/548.png` },
  'LOSC Lille':              { abbr: 'LOSC', color: '#E42B2B', color2: '#00285E', logo: `${CREST}/521.png` },
  'Lille':                   { abbr: 'LOSC', color: '#E42B2B', color2: '#00285E', logo: `${CREST}/521.png` },
  'OGC Nice':                { abbr: 'OGCN', color: '#CC0000', color2: '#000000', logo: `${CREST}/522.png` },
  'Nice':                    { abbr: 'OGCN', color: '#CC0000', color2: '#000000', logo: `${CREST}/522.png` },
  'Olympique Lyonnais':      { abbr: 'OL',   color: '#1B4F9B', color2: '#ED1C24', logo: `${CREST}/523.png` },
  'Lyon':                    { abbr: 'OL',   color: '#1B4F9B', color2: '#ED1C24', logo: `${CREST}/523.png` },
  'RC Lens':                 { abbr: 'RCL',  color: '#FFD700', color2: '#E42B2B', logo: `${CREST}/546.png` },
  'Lens':                    { abbr: 'RCL',  color: '#FFD700', color2: '#E42B2B', logo: `${CREST}/546.png` },
  'Stade Rennais':           { abbr: 'SRFC', color: '#CC0000', color2: '#000000', logo: `${CREST}/529.png` },
  'Rennes':                  { abbr: 'SRFC', color: '#CC0000', color2: '#000000', logo: `${CREST}/529.png` },
  'RC Strasbourg':           { abbr: 'RCSA', color: '#0055A4', color2: '#FFFFFF', logo: `${CREST}/576.png` },
  'Strasbourg':              { abbr: 'RCSA', color: '#0055A4', color2: '#FFFFFF', logo: `${CREST}/576.png` },
  'Montpellier HSC':         { abbr: 'MHSC', color: '#FF6600', color2: '#003DA5', logo: `${CREST}/518.png` },
  'Montpellier':             { abbr: 'MHSC', color: '#FF6600', color2: '#003DA5', logo: `${CREST}/518.png` },
  'Toulouse FC':             { abbr: 'TFC',  color: '#6A1B9A', color2: '#FFFFFF', logo: `${CREST}/511.png` },
  'Toulouse':                { abbr: 'TFC',  color: '#6A1B9A', color2: '#FFFFFF', logo: `${CREST}/511.png` },
  'Stade de Reims':          { abbr: 'SDR',  color: '#E42B2B', color2: '#FFFFFF', logo: `${CREST}/547.png` },
  'Reims':                   { abbr: 'SDR',  color: '#E42B2B', color2: '#FFFFFF', logo: `${CREST}/547.png` },
  'FC Nantes':               { abbr: 'FCN',  color: '#1D8B45', color2: '#FFD700', logo: `${CREST}/543.png` },
  'Nantes':                  { abbr: 'FCN',  color: '#1D8B45', color2: '#FFD700', logo: `${CREST}/543.png` },
  'Le Havre AC':             { abbr: 'HAC',  color: '#00A3E0', color2: '#003DA5', logo: `${CREST}/541.png` },
  'Le Havre':                { abbr: 'HAC',  color: '#00A3E0', color2: '#003DA5', logo: `${CREST}/541.png` },
  'Stade Brestois':          { abbr: 'SB29', color: '#E42B2B', color2: '#FFFFFF', logo: `${CREST}/512.png` },
  'Brest':                   { abbr: 'SB29', color: '#E42B2B', color2: '#FFFFFF', logo: `${CREST}/512.png` },
  'AJ Auxerre':              { abbr: 'AJA',  color: '#003DA5', color2: '#FFFFFF', logo: `${CREST}/519.png` },
  'Auxerre':                 { abbr: 'AJA',  color: '#003DA5', color2: '#FFFFFF', logo: `${CREST}/519.png` },
  'Angers SCO':              { abbr: 'SCO',  color: '#000000', color2: '#FFFFFF', logo: `${CREST}/532.png` },
  'Angers':                  { abbr: 'SCO',  color: '#000000', color2: '#FFFFFF', logo: `${CREST}/532.png` },
  'AS Saint-Étienne':        { abbr: 'ASSE', color: '#00843D', color2: '#FFFFFF', logo: `${CREST}/527.png` },
  'Saint-Étienne':           { abbr: 'ASSE', color: '#00843D', color2: '#FFFFFF', logo: `${CREST}/527.png` },
  'FC Lorient':              { abbr: 'FCL',  color: '#FF6600', color2: '#000000', logo: `${CREST}/525.png` },
  'Lorient':                 { abbr: 'FCL',  color: '#FF6600', color2: '#000000', logo: `${CREST}/525.png` },
  'Clermont Foot':           { abbr: 'CF63', color: '#8B1A1A', color2: '#003DA5', logo: `${CREST}/541.png` },
  'Clermont':                { abbr: 'CF63', color: '#8B1A1A', color2: '#003DA5' },
  'FC Metz':                 { abbr: 'FCM',  color: '#8B1A1A', color2: '#FFFFFF' },
  'Metz':                    { abbr: 'FCM',  color: '#8B1A1A', color2: '#FFFFFF' },
}

export function getTeamInfo(name: string): TeamInfo {
  if (teams[name]) return teams[name]
  for (const [key, val] of Object.entries(teams)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return val
    }
  }
  const words = name.split(/\s+/)
  const abbr = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : name.slice(0, 3).toUpperCase()
  return { abbr, color: '#6B7280', color2: '#FFFFFF' }
}
