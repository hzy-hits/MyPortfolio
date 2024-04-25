import * as THREE from 'three'

function getInstanced({ distance, mesh, size }) {
  const numObjs = 25 + Math.floor(Math.random() * 25)
  const instaMesh = new THREE.InstancedMesh(
    mesh.geometry,
    mesh.material,
    numObjs
  )
  const matrix = new THREE.Matrix4()
  const position = new THREE.Vector3()
  const quaternion = new THREE.Quaternion()
  const scale = new THREE.Vector3()

  for (let i = 0; i < numObjs; i++) {
    const radius = distance + Math.random() * 0.1 - 0.05
    const angle = Math.random() * Math.PI * 2
    position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    quaternion.random()
    const currentSize = size + Math.random() * 0.05 - 0.025
    scale.setScalar(currentSize)
    matrix.compose(position, quaternion, scale)
    instaMesh.setMatrixAt(i, matrix)
  }
  instaMesh.instanceMatrix.needsUpdate = true

  return instaMesh
}

function getAsteroidBelt(objs) {
  const group = new THREE.Group()
  objs.forEach(obj => {
    const asteroids = getInstanced({ distance: 2.5, mesh: obj, size: 0.035 })
    group.add(asteroids)
  })
  return group
}

export default getAsteroidBelt
