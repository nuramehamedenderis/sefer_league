/* =========================
   SEFER LEAGUE 3D FOOTBALL
   script.js
   ========================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


/* CAMERA */

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


/* RENDERER */

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

document
  .getElementById("game")
  .appendChild(renderer.domElement);


/* LIGHT */

const sun = new THREE.DirectionalLight(
  0xffffff,
  1.4
);

sun.position.set(20, 40, 20);

scene.add(sun);

scene.add(
  new THREE.HemisphereLight(
    0xffffff,
    0x555555,
    1
  )
);


/* FIELD */

const field = new THREE.Mesh(
  new THREE.BoxGeometry(42, 0.2, 70),
  new THREE.MeshStandardMaterial({
    color: 0x178a35
  })
);

field.position.y = -0.1;

scene.add(field);


/* FIELD LINES */

function fieldLine(x, z, w, d) {

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.03, d),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  );

  mesh.position.set(x, 0.02, z);

  scene.add(mesh);
}

fieldLine(0, -35, 42, 0.2);
fieldLine(0, 35, 42, 0.2);
fieldLine(-21, 0, 0.2, 70);
fieldLine(21, 0, 0.2, 70);
fieldLine(0, 0, 42, 0.12);


/* CENTER CIRCLE */

const centerCircle = new THREE.Mesh(
  new THREE.RingGeometry(5.9, 6.1, 64),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  })
);

centerCircle.rotation.x = -Math.PI / 2;
centerCircle.position.y = 0.04;

scene.add(centerCircle);


/* GOALS */

function createGoal(z) {

  const material =
    new THREE.MeshStandardMaterial({
      color: 0xffffff
    });

  const bar = new THREE.Mesh(
    new THREE.BoxGeometry(7, 0.35, 0.35),
    material
  );

  bar.position.set(0, 4, z);

  const leftPost = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 4, 0.35),
    material
  );

  leftPost.position.set(-3.5, 2, z);

  const rightPost = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 4, 0.35),
    material
  );

  rightPost.position.set(3.5, 2, z);

  scene.add(
    bar,
    leftPost,
    rightPost
  );
}

createGoal(-35);
createGoal(35);


/* PLAYER */

function createPlayer(color) {

  const player = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.7,
      0.85,
      1.6,
      16
    ),
    new THREE.MeshStandardMaterial({
      color: color
    })
  );

  body.position.y = 1.3;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(
      0.48,
      16,
      16
    ),
    new THREE.MeshStandardMaterial({
      color: 0xc6865b
    })
  );

  head.position.y = 2.45;

  player.add(
    body,
    head
  );

  scene.add(player);

  return player;
}


const player =
  createPlayer(0x1e4fff);

player.position.set(
  0,
  0,
  15
);


/* ENEMIES */

const enemies = [];

for (let i = 0; i < 4; i++) {

  const enemy =
    createPlayer(0xff2222);

  enemy.position.set(
    (Math.random() - 0.5) * 16,
    0,
    -5 - i * 6
  );

  enemies.push(enemy);
}


/* BALL */

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(
    0.55,
    20,
    20
  ),
  new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
);

ball.position.set(
  0,
  0.55,
  10
);

scene.add(ball);


/* BALL SHADOW */

const ballShadow = new THREE.Mesh(
  new THREE.CircleGeometry(
    0.6,
    20
  ),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.3
  })
);

ballShadow.rotation.x =
  -Math.PI / 2;

ballShadow.position.y = 0.02;

scene.add(ballShadow);


/* GAME VARIABLES */

let scoreHome = 0;
let scoreAway =
