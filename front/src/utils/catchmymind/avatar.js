import character1 from 'asset/character1.png';
import character2 from 'asset/character2.png';
import character3 from 'asset/character3.png';

export const avatar = {
  '0': character1,
  '1': character2,
  '2': character3,
};
export function getAvatar(index) {
  if (!avatar[index]) throw new Error('aba');
  return avatar[index];
}
