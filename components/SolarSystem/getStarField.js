import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/SolarSystem/circle.png')

export default function getStarfield({ numStars = 500, size = 0.2 } = {}) {
  const tempVec3 = new THREE.Vector3()
  const tempColor = new THREE.Color()

  const verts = new Float32Array(numStars * 3)
  const colors = new Float32Array(numStars * 3)

  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    tempVec3.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    )
    return {
      pos: tempVec3.clone(),
      hue: 0.6,
      minDist: radius
    }
  }

  for (let i = 0, j = 0; i < numStars; i++, j += 3) {
    let { pos, hue } = randomSpherePoint()
    tempColor.setHSL(hue, 0.2, Math.random())
    verts[j] = pos.x
    verts[j + 1] = pos.y
    verts[j + 2] = pos.z
    colors[j] = tempColor.r
    colors[j + 1] = tempColor.g
    colors[j + 2] = tempColor.b
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  const mat = new THREE.PointsMaterial({
    size,
    vertexColors: true,
    map: texture
  })

  const points = new THREE.Points(geo, mat)
  return points
}
