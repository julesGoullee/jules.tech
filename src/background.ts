import * as THREE from 'three'

export class Background {
  container: HTMLElement
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  mouseX = 0
  mouseY = 0
  windowHalfX = 0
  windowHalfY = 0
  constructor(container: Element) {
    this.container = container as HTMLElement
    this.windowHalfX = document.body.offsetWidth / 2
    this.windowHalfY = document.body.offsetHeight / 2
    this.init()
    this.animate()
  }
  init() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      document.body.offsetWidth / document.body.offsetHeight,
      5,
      2000
    )
    this.camera.position.z = 500

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x0000ff, 0.001)

    const geometryGroups = [
      new THREE.BufferGeometry(),
      new THREE.BufferGeometry(),
      new THREE.BufferGeometry(),
    ]
    const size = 2000

    const colors = ['#45e645', '#39b7bf', '#4555e6']
    const materialGroups = colors.map(
      (color) =>
        new THREE.PointsMaterial({
          size: 2,
          color,
        })
    )
    const verticesGroups = [[], [], []]
    for (let i = 0; i < 20000; i++) {
      const x = (Math.random() * size + Math.random() * size) / 2 - size / 2
      const y = (Math.random() * size + Math.random() * size) / 2 - size / 2
      const z = (Math.random() * size + Math.random() * size) / 2 - size / 2
      verticesGroups[Math.floor(Math.random() * verticesGroups.length)].push(
        x,
        y,
        z
      )
    }
    geometryGroups.forEach((geometry, i) =>
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(verticesGroups[i], 3)
      )
    )

    const particlesGroups = geometryGroups.map(
      (geometry, i) => new THREE.Points(geometry, materialGroups[i])
    )
    particlesGroups.forEach((particles) => this.scene.add(particles))

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight)
    this.renderer.setClearColor('#212121', 0)
    this.container.appendChild(this.renderer.domElement)
    this.container.style.touchAction = 'none'
    window.addEventListener('pointermove', this.onPointerMove.bind(this))
    window.addEventListener('touchmove', this.onPointerMove.bind(this))
    window.addEventListener('resize', this.onWindowResize.bind(this))
    window.addEventListener('scroll', this.onWindowResize.bind(this))
  }
  onWindowResize() {
    this.windowHalfX = document.body.offsetWidth / 2
    this.windowHalfY = document.body.offsetHeight / 2

    this.camera.aspect = document.body.offsetWidth / document.body.offsetHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight)
  }
  onPointerMove(event) {
    if (
      (event.clientX || (event.touches && event.touches[0].clientX)) &&
      (event.clientY || (event.touches && event.touches[0].clientY))
    ) {
      this.mouseX =
        (event.clientX || event.touches[0].clientX) - this.windowHalfX
      this.mouseY =
        (event.clientY || event.touches[0].clientY) - this.windowHalfY
    }
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
