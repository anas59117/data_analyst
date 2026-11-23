interface TeamInfo {
  abbr: string
  color: string
  color2: string
}

const teams: Record<string, TeamInfo> = {
  'Paris Saint-Germain':     { abbr: 'PSG', color: '#004170', color2: '#DA291C' },
  'PSG':                     { abbr: 'PSG', color: '#004170', color2: '#DA291C' },
  'Olympique de Marseille':  { abbr: 'OM',  color: '#2FAEE0', color2: '#FFFFFF' },
  'Marseille':               { abbr: 'OM',  color: '#2FAEE0', color2: '#FFFFFF' },
  'AS Monaco':               { abbr: 'ASM', color: '#E2001A', color2: '#FFFFFF' },
  'Monaco':                  { abbr: 'ASM', color: '#E2001A', color2: '#FFFFFF' },
  'LOSC Lille':              { abbr: 'LOSC', color: '#E42B2B', color2: '#00285E' },
  'Lille':                   { abbr: 'LOSC', color: '#E42B2B', color2: '#00285E' },
  'OGC Nice':                { abbr: 'OGCN', color: '#CC0000', color2: '#000000' },
  'Nice':                    { abbr: 'OGCN', color: '#CC0000', color2: '#000000' },
  'Olympique Lyonnais':      { abbr: 'OL',  color: '#1B4F9B', color2: '#ED1C24' },
  'Lyon':                    { abbr: 'OL',  color: '#1B4F9B', color2: '#ED1C24' },
  'RC Lens':                 { abbr: 'RCL', color: '#FFD700', color2: '#E42B2B' },
  'Lens':                    { abbr: 'RCL', color: '#FFD700', color2: '#E42B2B' },
  'Stade Rennais':           { abbr: 'SRFC', color: '#CC0000', color2: '#000000' },
  'Rennes':                  { abbr: 'SRFC', color: '#CC0000', color2: '#000000' },
  'RC Strasbourg':           { abbr: 'RCSA', color: '#0055A4', color2: '#FFFFFF' },
  'Strasbourg':              { abbr: 'RCSA', color: '#0055A4', color2: '#FFFFFF' },
  'Montpellier HSC':         { abbr: 'MHSC', color: '#FF6600', color2: '#003DA5' },
  'Montpellier':             { abbr: 'MHSC', color: '#FF6600', color2: '#003DA5' },
  'Toulouse FC':             { abbr: 'TFC', color: '#6A1B9A', color2: '#FFFFFF' },
  'Toulouse':                { abbr: 'TFC', color: '#6A1B9A', color2: '#FFFFFF' },
  'Stade de Reims':          { abbr: 'SDR', color: '#E42B2B', color2: '#FFFFFF' },
  'Reims':                   { abbr: 'SDR', color: '#E42B2B', color2: '#FFFFFF' },
  'FC Nantes':               { abbr: 'FCN', color: '#1D8B45', color2: '#FFD700' },
  'Nantes':                  { abbr: 'FCN', color: '#1D8B45', color2: '#FFD700' },
  'Le Havre AC':             { abbr: 'HAC', color: '#00A3E0', color2: '#003DA5' },
  'Le Havre':                { abbr: 'HAC', color: '#00A3E0', color2: '#003DA5' },
  'Stade Brestois':          { abbr: 'SB29', color: '#E42B2B', color2: '#FFFFFF' },
  'Brest':                   { abbr: 'SB29', color: '#E42B2B', color2: '#FFFFFF' },
  'AJ Auxerre':              { abbr: 'AJA', color: '#003DA5', color2: '#FFFFFF' },
  'Auxerre':                 { abbr: 'AJA', color: '#003DA5', color2: '#FFFFFF' },
  'Angers SCO':              { abbr: 'SCO', color: '#000000', color2: '#FFFFFF' },
  'Angers':                  { abbr: 'SCO', color: '#000000', color2: '#FFFFFF' },
  'AS Saint-Étienne':        { abbr: 'ASSE', color: '#00843D', color2: '#FFFFFF' },
  'Saint-Étienne':           { abbr: 'ASSE', color: '#00843D', color2: '#FFFFFF' },
  'FC Lorient':              { abbr: 'FCL', color: '#FF6600', color2: '#000000' },
  'Lorient':                 { abbr: 'FCL', color: '#FF6600', color2: '#000000' },
  'Clermont Foot':           { abbr: 'CF63', color: '#8B1A1A', color2: '#003DA5' },
  'Clermont':                { abbr: 'CF63', color: '#8B1A1A', color2: '#003DA5' },
  'FC Metz':                 { abbr: 'FCM', color: '#8B1A1A', color2: '#FFFFFF' },
  'Metz':                    { abbr: 'FCM', color: '#8B1A1A', color2: '#FFFFFF' },
  'RC Deportivo':            { abbr: 'DEP', color: '#003DA5', color2: '#FFFFFF' },
  'Levante':                 { abbr: 'LEV', color: '#004170', color2: '#E42B2B' },
  'Athletic Club':           { abbr: 'ATH', color: '#E42B2B', color2: '#FFFFFF' },
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
