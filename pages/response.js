const input = '{"result":"\nTender steak so fine\nGm F C Dsus4 Dsus2\nTastes like sweet red wine\nA7 Dsus4 Dsus2 Bm\nMouth-watering divine! Gm F C Dsus4 Dsus2"}';

// Extract the string of lyrics and chords from the input object
const data = JSON.parse(input);
const songData = data.result.trim();

// Split the string into individual lines
const lines = songData.split('\n');

// Iterate over each line and split it into lyrics and chords
const song = lines.map(line => {
  const [lyrics, chords] = line.split(/(?<=\S)\s+/);
  return { lyrics, chords };
});

console.log(song);
