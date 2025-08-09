const ROASTS = [
  "Enthokkeyo color kittiyal poyi.",
  "Festival mode always ON.",
  "Minimal is for paavam people.",
  "Corporate look? I added kathakali because culture.",
  "Logo valiyaakkiyittundu, ippo perfect.",
  "Minimal venda, Pooram pol design venam.",
  "Corporate? I gave culture.",
];

export function getRandomRoast() {
  return ROASTS[Math.floor(Math.random() * ROASTS.length)];
}

export default ROASTS; 