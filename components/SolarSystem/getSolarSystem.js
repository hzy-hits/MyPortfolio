import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Box } from '@chakra-ui/react'
import getSun from './getSun'
import getPlanet from './getPlanet'
import getElipticLines from './getElipticLine'
import getStarfield from './getStarField'
import getNebula from './getNebula'

const SolarSystem = ({ style, className = '' }) => {
  const mountRef = useRef(null)
  const rendererRef = useRef()
  const sceneRef = useRef(new THREE.Scene())
  const cameraRef = useRef()
  const controlsRef = useRef()
  //const useAnimatedCamera = true

  useEffect(() => {
    initializeScene()
    window.addEventListener('resize', handleResize)
    return () => {
      cleanUpScene()

      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const initializeScene = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    cameraRef.current = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    cameraRef.current.position.set(0, 3, 7)

    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    rendererRef.current.setSize(w, h)
    mountRef.current.appendChild(rendererRef.current.domElement)

    controlsRef.current = new OrbitControls(
      cameraRef.current,
      rendererRef.current.domElement
    )
    controlsRef.current.enableDamping = true
    controlsRef.current.dampingFactor = 0.35
    controlsRef.current.enableZoom = true
    controlsRef.current.screenSpacePanning = false
    controlsRef.current.enableRotate = true

    setupScene() // Pass the flat list of meshes to the setup function
  }

  const setupScene = () => {
    const solarSystem = new THREE.Group()
    solarSystem.userData.update = t => {
      solarSystem.children.forEach(child => {
        child.userData.update?.(t)
      })
    }
    sceneRef.current.add(solarSystem)
    solarSystem.add(getSun())

    const mercury = getPlanet({ size: 0.1, distance: 1.5, img: 'mercury.png' })
    solarSystem.add(mercury)

    const venus = getPlanet({ size: 0.2, distance: 2.0, img: 'venus.png' })
    solarSystem.add(venus)

    const moon = getPlanet({ size: 0.075, distance: 0.4, img: 'moon.png' })
    const earth = getPlanet({
      children: [moon],
      size: 0.225,
      distance: 2.4,
      img: 'earth.png'
    })
    solarSystem.add(earth)

    const mars = getPlanet({ size: 0.15, distance: 2.8, img: 'mars.png' })
    solarSystem.add(mars)

    const jupiter = getPlanet({ size: 0.4, distance: 4, img: 'jupiter.png' })
    solarSystem.add(jupiter)

    const sRingGeo = new THREE.TorusGeometry(0.6, 0.15, 8, 64)
    const sRingMat = new THREE.MeshStandardMaterial()
    const saturnRing = new THREE.Mesh(sRingGeo, sRingMat)
    saturnRing.scale.z = 0.1
    saturnRing.rotation.x = Math.PI * 0.5
    const saturn = getPlanet({
      children: [saturnRing],
      size: 0.35,
      distance: 5.5,
      img: 'saturn.png'
    })
    solarSystem.add(saturn)

    const uRingGeo = new THREE.TorusGeometry(0.5, 0.05, 8, 64)
    const uRingMat = new THREE.MeshStandardMaterial()
    const uranusRing = new THREE.Mesh(uRingGeo, uRingMat)
    uranusRing.scale.z = 0.1
    const uranus = getPlanet({
      children: [uranusRing],
      size: 0.3,
      distance: 6.5,
      img: 'uranus.png'
    })
    solarSystem.add(uranus)

    const elipticLines = getElipticLines()
    solarSystem.add(elipticLines)

    const starfield = getStarfield({ numStars: 500, size: 0.35 })
    sceneRef.current.add(starfield)

    const dirLight = new THREE.DirectionalLight(0x0099ff, 1)
    dirLight.position.set(0, 1, 0)
    sceneRef.current.add(dirLight)

    const nebula = getNebula({
      hue: 0.6,
      numSprites: 10,
      opacity: 0.2,
      radius: 40,
      size: 80,
      z: -50.5
    })
    sceneRef.current.add(nebula)

    const anotherNebula = getNebula({
      hue: 0.0,
      numSprites: 10,
      opacity: 0.2,
      radius: 40,
      size: 80,
      z: 50.5
    })
    sceneRef.current.add(anotherNebula)

    function animate(_t = 0) {
      requestAnimationFrame(animate)

      const time = Date.now() * 0.0002
      solarSystem.children.forEach(child => {
        if (child.userData.update) {
          child.userData.update(time)
        }
      })

      controlsRef.current.update()
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
    animate()
  }

  const handleResize = () => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }
  }

  const cleanUpScene = () => {
    if (
      mountRef.current &&
      rendererRef.current &&
      rendererRef.current.domElement
    ) {
      mountRef.current.removeChild(rendererRef.current.domElement)
    }
    sceneRef.current.traverse(object => {
      if (object.geometry) object.geometry.dispose()
      if (object.material) {
        if (object.material.length) {
          for (const material of object.material) {
            material.dispose()
          }
        } else {
          object.material.dispose()
        }
      }
      if (object.texture) object.texture.dispose()
    })
    if (controlsRef.current) {
      controlsRef.current.dispose()
    }
  }

  return (
    <Box
      ref={mountRef}
      w="100%"
      h="100%"
      className={className}
      style={style}
    ></Box>
  )
}

export default SolarSystem
