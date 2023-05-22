import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'
import { namesArr,generateRandomYears } from './utils'

//RANDOM NAMES ARRAY
const names = await namesArr() //generated random names using faker api

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

const graveColorTexture = textureLoader.load('/textures/grave/graveColor.jpg')
const graveRoughnessTexture = textureLoader.load('/textures/grave/graveRoughness.jpg')
const graveNormalTexture = textureLoader.load('/textures/grave/graveNormal.png')

//Fog
const fog = new THREE.Fog('#262837',1,15)
scene.fog = fog
/**
 * House
 */
const house = new THREE.Group()
scene.add(house)


//building
const building = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ 
        map:bricksColorTexture,
        aoMap:bricksAmbientOcclusionTexture,
        normalMap:bricksNormalTexture,
        roughnessMap:bricksRoughnessTexture
    })
)
building.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(building.geometry.attributes.uv.array, 2))
building.position.y = 2.5 / 2
house.add(building)

//ROOF
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2,100,100),
    new THREE.MeshStandardMaterial({ 
        map:doorColorTexture,
        transparent:true,
        alphaMap:doorAlphaTexture,
        aoMap:doorAmbientOcclusionTexture,
        normalMap:doorNormalTexture,
        displacementMap:doorHeightTexture,
        displacementScale:0.2,
        metalnessMap:doorMetalnessTexture,
        roughnessMap:doorRoughnessTexture
        
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

//Graves
const graves = new THREE.Group()

scene.add(graves)
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    normalMap: graveNormalTexture,
    roughnessMap:graveRoughnessTexture 
})

//Font Loader
const fontLoader = new FontLoader();
//Text Material
const textMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });

for(let i = 0; i < 50; i++){
    const angle = Math.random() * (Math.PI * 2)
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const y = 0.1 + Math.random() * 0.3

    const grave = new THREE.Mesh(graveGeometry,graveMaterial)
    grave.castShadow = true

    grave.position.set(x,y,z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    //Text
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
        addTextToGrave(font);
    });

    function addTextToGrave(font) {
        // Create the text geometry
        const textGeometry = new TextGeometry(names[i], {
        font: font,
        size: 0.05,
        height: 0.05,
        });
        textGeometry.center()
        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        const yearGeometry = new TextGeometry(generateRandomYears(), {
          font: font,
          size: 0.03,
          height: 0.03,
        });
        yearGeometry.center();
        
        const yearMesh = new THREE.Mesh(yearGeometry, textMaterial);
    
        // Position the text mesh on the grave
        textMesh.position.set(grave.position.x, grave.position.y + 0.3, grave.position.z + 0.1);
        textMesh.rotation.y = grave.rotation.y
        textMesh.rotation.z = grave.rotation.z

        // Position the year text mesh below the name
        yearMesh.position.set(grave.position.x, grave.position.y + 0.22, grave.position.z + 0.1);
        yearMesh.rotation.y = grave.rotation.y;
        yearMesh.rotation.z = grave.rotation.z;

        // Add the text mesh to the scene
        graves.add(textMesh);
        graves.add(yearMesh)
    }

    graves.add(grave)
}



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map:grassColorTexture, 
        aoMap:grassAmbientOcclusionTexture,
        normalMap:grassNormalTexture,
        roughnessMap:grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/** */
//WALLS
const wallGeometry = new THREE.PlaneGeometry(20, 2)
const wallMaterial =  new THREE.MeshStandardMaterial({ color: 'gray' })
const wall = new THREE.Mesh(
    wallGeometry,
    wallMaterial
)
wall.rotation.y = Math.PI * 0.5
wall.position.x = -10
wall.position.y = 1
scene.add(wall)

const wall1 = new THREE.Mesh(
    wallGeometry,
    wallMaterial
)
wall1.position.z = -10
wall1.position.y = 1
scene.add(wall1)

const wall2 = new THREE.Mesh(
    wallGeometry,
    new THREE.MeshStandardMaterial({ color: 'gray',side: THREE.BackSide })
)
wall2.position.y = 1
wall2.rotation.y = Math.PI * 0.5
wall2.position.x = 10
scene.add(wall2)
/** */

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.2)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.13)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//Door
const doorLight = new THREE.PointLight('#ff7d46',1,7)
doorLight.position.set(0,2.2,2.7)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')


//** */
// SHADOWS
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

house.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush3.castShadow = true

floor.receiveShadow = true

moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()