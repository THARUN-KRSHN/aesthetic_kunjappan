const ROASTS = [
  "Ningak ethoke colour a vende makkale",
  "Eath mood pwoli mood.",
  "Designinu nalla polish venam, ithu oru panchayath notice pole undu.",
  "Corporate look? I added kathakali because culture.",
  "Logo valiyaakkiyittundu, ippo perfect.",
  "Minimal venda, Pooram pol design venam.",
  "Corporate? I gave culture.",
];

export function getRandomRoast() {
  return ROASTS[Math.floor(Math.random() * ROASTS.length)];
}

export default ROASTS; 