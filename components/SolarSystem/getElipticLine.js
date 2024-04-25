import * as THREE from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'

const w = typeof window !== 'undefined' ? window.innerWidth : 0
const h = typeof window !== 'undefined' ? window.innerHeight : 0
function getCircleVertices(radius, segments = 128) {
  const vertices = new Float32Array(segments * 3)
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const idx = i * 3
    vertices[idx] = radius * Math.cos(angle)
    vertices[idx + 1] = radius * Math.sin(angle)
    vertices[idx + 2] = 0
  }
  return vertices
}

function getLine({ width }) {
  const points = new Float32Array(10 * 3)
  const colors = new Float32Array(10 * 3)
  const minRadius = 1.1 + Math.random() * 0.1
  const angle = Math.random() * Math.PI * 2
  for (let i = 0; i < 10; i++) {
    const hue = 0.25 - (i / 10) * 0.27
    let lightness = 0.5
    let color = new THREE.Color().setHSL(hue, 1.0, lightness)
    let radius = i / 8
    const idx = i * 3
    points[idx] = Math.cos(angle) * (minRadius + radius)
    points[idx + 1] = 0
    points[idx + 2] = Math.sin(angle) * (minRadius + radius)
    colors[idx] = color.r
    colors[idx + 1] = color.g
    colors[idx + 2] = color.b
  }
  const material = new LineMaterial({
    linewidth: width,
    vertexColors: true,
    resolution: new THREE.Vector2(w, h)
  })
  const lineGeo = new LineGeometry()
  lineGeo.setColors(colors)
  lineGeo.setPositions(points)
  const mesh = new Line2(lineGeo, material)
  mesh.computeLineDistances()
  return mesh
}

function getRing({ distance, hue = 0, lightness = 1.0, width = 2 }) {
  const color = new THREE.Color().setHSL(hue, 1, lightness)
  const ringMat = new LineMaterial({
    color,
    linewidth: width,
    resolution: new THREE.Vector2(w, h)
  })

  const vertices = getCircleVertices(distance)
  const lineGeo = new LineGeometry()
  lineGeo.setPositions(vertices)
  const orbitRing = new Line2(lineGeo, ringMat)
  orbitRing.rotation.x = Math.PI * 0.5
  orbitRing.computeLineDistances()
  return orbitRing
}

function getElipticLines() {
  const ringGroup = new THREE.Group()
  for (let i = 0; i < 20; i++) {
    const gap = 0.075 + Math.random() * 0.005
    const hue = 0.25 - (i / 20) * 0.27
    const lightness = 0.5 - (i / 20) * 0.5
    const width = 0.5 + Math.random() * 1
    const ring = getRing({ distance: 1.1 + i * gap, hue, lightness, width })
    ringGroup.add(ring)
  }
  for (let i = 0; i < 40; i++) {
    const width = 0.5 + Math.random() * 1
    const line = getLine({ width })
    ringGroup.add(line)
  }
  return ringGroup
}

export default getElipticLines
