import * as THREE from 'three'

export class Background {
  container: Element
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  mouseX = 0
  mouseY = 0
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2
  constructor(container: Element) {
    this.container = container
    this.init()
    this.animate()
  }

  init() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      5,
      2000
    )
    this.camera.position.z = 500

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x0000ff, 0.001)

    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const size = 2000

    for (let i = 0; i < 20000; i++) {
      const x = (Math.random() * size + Math.random() * size) / 2 - size / 2
      const y = (Math.random() * size + Math.random() * size) / 2 - size / 2
      const z = (Math.random() * size + Math.random() * size) / 2 - size / 2

      vertices.push(x, y, z)
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )

    const material = new THREE.PointsMaterial({
      size: 2,
      color: 0xffffff,
    })

    const particles = new THREE.Points(geometry, material)
    this.scene.add(particles)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor('#212121', 1)
    this.container.appendChild(this.renderer.domElement)

    document.body.style.touchAction = 'none'
    document.body.addEventListener('pointermove', this.onPointerMove.bind(this))
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
  onPointerMove(event) {
    this.mouseX = event.clientX - this.windowHalfX
    this.mouseY = event.clientY - this.windowHalfY
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.render()
  }
  render() {
    this.camera.position.x += (this.mouseX * 2 - this.camera.position.x) * 0.02
    this.camera.position.y += (-this.mouseY * 2 - this.camera.position.y) * 0.02
    this.camera.lookAt(this.scene.position)
    this.renderer.render(this.scene, this.camera)
    this.scene.rotation.x += 0.001
    this.scene.rotation.y += 0.002
  }
}
