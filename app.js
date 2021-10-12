window.addEventListener("load", init);

function init() {
  

    const width = window.innerWidth;
    const height = window.innerHeight;

    const cloudParticles = [];
  

    const scene = new THREE.Scene();
  

    const renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    document.body.appendChild(renderer.domElement);


    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;


    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffeedd);
    directional.position.set(0,0,1);
    scene.add(directional);


    const point = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
    point.position.set(200,300,100);
    scene.add(point);
  

    const loader = new THREE.TextureLoader();
    loader.load("https://i.postimg.cc/TYvjnH2F/smoke-1.png", function(texture){

      const cloudGeometry = new THREE.PlaneBufferGeometry(500,500);

      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      for(let i = 0; i < 25; i++) {

        const cloud = new THREE.Mesh(cloudGeometry,cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 360;
        cloud.material.opacity = 0.6;
        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    });


    const rainGeometry = new THREE.Geometry();

    const rainCount = 15000;
    for(let i = 0;i < rainCount; i++) {
      rainDrop = new THREE.Vector3(
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
      rainDrop.velocity = {};
      rainDrop.velocity = 0;
      rainGeometry.vertices.push(rainDrop);
    }

    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true
    });

    const rain = new THREE.Points(rainGeometry,rainMaterial);
    scene.add(rain);
  
    function render() {
      cloudParticles.forEach(i => {
        i.rotation.z -= 0.002;
      });
      rainGeometry.vertices.forEach(i => {
        i.velocity -= 0.1 + Math.random() * 0.1;
        i.y += i.velocity;
        if (i.y < -200) {
          i.y = 200;
          i.velocity = 0;
        }
      });
      rainGeometry.verticesNeedUpdate = true;
      rain.rotation.y += 0.002;
      if(Math.random() > 0.93 || point.power > 100) {
        if(point.power < 100) 
          point.position.set(
            Math.random() * 400,
            300 + Math.random() *200,
            100
          );
        point.power = 50 + Math.random() * 500;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  
    render();
  
    window.addEventListener("resize", onResize);


    function onResize() {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    onResize();
}