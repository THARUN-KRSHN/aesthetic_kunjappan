export const roastLines = [
  "Enthokkeyo color kittiyal poyi.",
  "Festival mode always ON.",
  "Minimal is for paavam people.",
  "Corporate look? I added kathakali because culture.",
  "Logo valiyaakkiyittundu, ippo perfect.",
  "Minimal venda, Pooram pol design venam.",
  "Corporate? I gave culture.",
];

export function randomRoast() {
  return roastLines[Math.floor(Math.random() * roastLines.length)];
}

export default roastLines; 