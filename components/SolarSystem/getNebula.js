import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const texture = loader.load('/SolarSystem/rad-grad.png')

function getSprite({ color, opacity, pos, size }) {
  const spriteMat = new THREE.SpriteMaterial({
    color,
    map: texture,
    transparent: true,
    opacity
  })
  spriteMat.color.offsetHSL(0, 0, Math.random() * 0.2 - 0.1)
  const sprite = new THREE.Sprite(spriteMat)
  sprite.position.set(pos.x, -pos.y, pos.z)
  size += Math.random() - 0.5
  sprite.scale.set(size, size, size)
  return sprite
}

function getNebula({
  hue = 0.0,
  numSprites = 10,
  opacity = 1,
  radius = 1,
  sat = 0.5,
  size = 1,
  z = 0
}) {
  const layerGroup = new THREE.Group()
  const color = new THREE.Color().setHSL(hue, 1, sat)

  const TWO_PI = Math.PI * 2

  for (let i = 0; i < numSprites; i += 1) {
    let angle = (i / numSprites) * TWO_PI
    const pos = new THREE.Vector3(
      Math.cos(angle) * Math.random() * radius,
      Math.sin(angle) * Math.random() * radius,
      z + Math.random()
    )
    let sizeVariation = size + Math.random() - 0.5
    const sprite = getSprite({ color, opacity, pos, size: sizeVariation })
    layerGroup.add(sprite)
  }
  return layerGroup
}
export default getNebula
