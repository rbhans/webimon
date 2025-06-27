export function calcWinner(aStrength: number, bStrength: number) {
  const total = aStrength + bStrength;
  const roll = Math.random() * total;
  return roll < aStrength ? 'a' : 'b';
}
