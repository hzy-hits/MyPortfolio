import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const SpinningCube = () => {
    const mountRef = useRef(null)
    const composerRef = useRef(null)
    const requestRef = useRef(null)

    useEffect(() => {
        const w = window.innerWidth / 3.3
        const h = window.innerHeight / 3.3
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.3, 1000)
        camera.position.z = 4.3

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setClearColor(0x000000, 0)
        renderer.setSize(w, h)
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

        const composer = new EffectComposer(renderer)
        composer.addPass(renderScene)
        composer.addPass(bloomPass)
        composerRef.current = composer

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25
        controls.enableZoom = false;
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
        }

        animate()

        function handleWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
            mountRef.current.removeChild(renderer.domElement)
            renderer.dispose()
            composer.dispose()
            cancelAnimationFrame(requestRef.current)
        }
    }, [])

    const getBox = (index, w, h) => {
        const hue = 0.8 - index / 20
        const material = new LineMaterial({
            color: new THREE.Color().setHSL(hue, 0.85, 0.3),
            linewidth: 7,
            transparent: true,
            opacity: 0.20,
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

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}

export default SpinningCube
