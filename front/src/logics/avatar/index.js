import character1 from 'asset/character1.png';
import character2 from 'asset/character2.png';
import character3 from 'asset/character3.png';

// import avatar1 from 'asset/character/lion.json';
// import avatar2 from 'asset/character/gaonasi.json';
// import avatar3 from 'asset/character/kerbi.json';

export function getAvatar(index) {
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

// export function getAvatarJSON(index) {
//   switch (index) {
//     case 0:
//       return avatar1;
//     case 1:
//       return avatar2;
//     case 2:
//       return avatar3;
//     default:
//       throw new Error();
//   }
// }

// export function makeScene(ref, index) {
//   const avatar = getAvatarJSON(index);
//   // 장면 생성
//   const scene = new THREE.Scene();

//   // 카메라 관점 생성
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000,
//   );

//   // WebGL 렌더러 생성
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(80, 80);
//   ref.current.appendChild(renderer.domElement);

//   camera.position.z = 7;
//   camera.position.y = 5;

//   const loader = new THREE.ObjectLoader();

//   // Alternatively, to parse a previously loaded JSON structure
//   const object = loader.parse(avatar);

//   scene.add(object);

//   const animate = () => {
//     requestAnimationFrame(animate);

//     renderer.render(scene, camera);
//   };
//   animate();
// }
