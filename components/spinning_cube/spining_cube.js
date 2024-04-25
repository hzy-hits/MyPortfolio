import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Box, useColorModeValue } from '@chakra-ui/react'
const SpinningCube = () => {
  const mountRef = useRef(null)
  const composerRef = useRef(null)
  const requestRef = useRef(null)
  const bgColor = useColorModeValue('#f0e7db', '#202023')
  useEffect(() => {
    const container = mountRef.current
    const w = container.clientWidth
    const h = container.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.3, 1000)
    camera.position.z = 4.3

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(new THREE.Color(bgColor), 0)
    // renderer.setClearColor(0xffffff, 1)
    renderer.setSize(w, h)
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)
    mountRef.current.appendChild(renderer.domElement)

    const renderScene = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      1.5,
      0.4,
      0.85
    )
    bloomPass.threshold = 0
    bloomPass.strength = 1
    bloomPass.radius = 0
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
      }
    )
    const composer = new EffectComposer(renderer, renderTarget)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)
    composerRef.current = composer

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25
    controls.enableZoom = false
    controls.screenSpacePanning = false

    const boxGroup = new THREE.Group()
    scene.add(boxGroup)

    // Dynamically create boxes
    for (let i = 0; i < 18; i++) {
      let box = getBox(i, w, h)
      boxGroup.add(box)
    }

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate)
      boxGroup.children.forEach(box => {
        if (box.update) box.update()
      })
      controls.update()
      composer.render()
      renderer.setRenderTarget(null)
      renderer.clearDepth()
      renderer.render(scene, camera)
    }

    animate()

    function handleWindowResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
      mountRef.current.removeChild(renderer.domElement)
      renderer.dispose()
      composer.dispose()
      container.removeChild(renderer.domElement)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  const getBox = (index, w, h) => {
    const hue = 0.8 - index / 21
    const material = new LineMaterial({
      color: new THREE.Color().setHSL(hue, 0.95, 0.4),
      linewidth: 7,
      transparent: true,
      opacity: 0.3,
      blendMode: THREE.AdditiveBlending
    })
    material.resolution.set(w, h)

    const geometry = new LineGeometry()
    geometry.setPositions(getPositions())
    const mesh = new Line2(geometry, material)
    mesh.scale.setScalar(1.0 + index * 0.1)
    const rotationSpeed = 0.0005
    const offset = 1.0 - index * 0.03
    mesh.update = () => {
      mesh.rotation.x = Math.sin(offset + performance.now() * rotationSpeed) * 2
      mesh.rotation.y = Math.sin(offset + performance.now() * rotationSpeed) * 2
    }
    return mesh
  }

  const getPositions = () => {
    const points = []
    points.push(0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0) // face
    points.push(0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1) // face
    points.push(0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1) // the rest
    const arr = points.map(v => (v -= 0.5))
    return arr
  }

  return <Box ref={mountRef} bg={bgColor} w="100%" h="100%" />
}

export default SpinningCube
