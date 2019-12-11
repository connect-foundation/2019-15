import character1 from 'asset/character1.png';
import character2 from 'asset/character2.png';
import character3 from 'asset/character3.png';

function getCharacter(index) {
  switch (index) {
    case 0:
      return character1;

    case 1:
      return character2;

    case 2:
      return character3;

    default:
      throw new Error();
  }
}

export default getCharacter;
