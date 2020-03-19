<template>
  <div>
    <div id="three-container"></div>
    <app-footer :showPagination="false">
      <div slot="action-group">
        <a-menu mode="horizontal">
          <a-menu-item id="table">TABLE</a-menu-item>
          <a-menu-item id="sphere">SPHERE</a-menu-item>
          <a-menu-item id="helix">HELIX</a-menu-item>
          <a-menu-item id="grid">GRID</a-menu-item>
        </a-menu>
      </div>
    </app-footer>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as TWEEN from 'tween'
import TrackballControls from 'three-trackballcontrols'
import {
  CSS3DObject,
  CSS3DRenderer
} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { Menu } from 'ant-design-vue'

export default {
  name: 'three',
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item
  },
  data() {
    return {
      root: null,
      table: [], // 元素周期表
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      objects: [],
      targets: { table: [], sphere: [], helix: [], grid: [] }
    }
  },
  mounted() {
    this.getData().then(() => {
      this.init()
      this.animate()
    })
  },
  methods: {
    getData() {
      if (this.$env === 'mock') {
        return this.$http.get(this.$api.THREE_LIST).then(({ data }) => {
          this.table = data
        })
      } else {
        // from server
      }
    },
    init() {
      this.root = document.getElementById('three-container')

      this.camera = new THREE.PerspectiveCamera(
        40,
        this.root.clientWidth / this.root.clientHeight,
        1,
        10000
      )
      this.camera.position.z = 3000
      this.scene = new THREE.Scene()

      // table
      for (let i = 0; i < this.table.length; i += 5) {
        let element = document.createElement('div')
        element.className = 'element'
        element.style.backgroundColor =
          'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')'
        let number = document.createElement('div')
        number.className = 'number'
        number.textContent = i / 5 + 1
        element.appendChild(number)
        let symbol = document.createElement('div')
        symbol.className = 'symbol'
        symbol.textContent = this.table[i]
        element.appendChild(symbol)
        let details = document.createElement('div')
        details.className = 'details'
        details.innerHTML = this.table[i + 1] + '<br>' + this.table[i + 2]
        element.appendChild(details)
        let css3dobject = new CSS3DObject(element)
        css3dobject.position.x = Math.random() * 4000 - 2000
        css3dobject.position.y = Math.random() * 4000 - 2000
        css3dobject.position.z = Math.random() * 4000 - 2000
        this.scene.add(css3dobject)
        this.objects.push(css3dobject)
        //
        let object = new THREE.Object3D()
        object.position.x = this.table[i + 3] * 140 - 1330
        object.position.y = -(this.table[i + 4] * 180) + 990
        this.targets.table.push(object)
      }

      // sphere
      let vector = new THREE.Vector3()
      for (let i = 0, l = this.objects.length; i < l; i++) {
        let phi = Math.acos(-1 + (2 * i) / l)
        let theta = Math.sqrt(l * Math.PI) * phi
        let object = new THREE.Object3D()
        object.position.setFromSphericalCoords(800, phi, theta)
        vector.copy(object.position).multiplyScalar(2)
        object.lookAt(vector)
        this.targets.sphere.push(object)
      }

      // helix
      vector = new THREE.Vector3()
      for (let i = 0, l = this.objects.length; i < l; i++) {
        let theta = i * 0.175 + Math.PI
        let y = -(i * 8) + 450
        let object = new THREE.Object3D()
        object.position.setFromCylindricalCoords(900, theta, y)
        vector.x = object.position.x * 2
        vector.y = object.position.y
        vector.z = object.position.z * 2
        object.lookAt(vector)
        this.targets.helix.push(object)
      }

      // grid
      for (let i = 0; i < this.objects.length; i++) {
        let object = new THREE.Object3D()
        object.position.x = (i % 5) * 400 - 800
        object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800
        object.position.z = Math.floor(i / 25) * 1000 - 2000
        this.targets.grid.push(object)
      }

      //
      this.renderer = new CSS3DRenderer()
      this.renderer.setSize(this.root.clientWidth, this.root.clientHeight)
      this.root.appendChild(this.renderer.domElement)

      //
      this.controls = new TrackballControls(
        this.camera,
        this.renderer.domElement
      )
      this.controls.minDistance = 500
      this.controls.maxDistance = 6000
      this.controls.addEventListener('change', this.render)

      const $this = this
      const tableButton = document.getElementById('table')
      tableButton.addEventListener(
        'click',
        function() {
          $this.transform($this.targets.table, 2000)
        },
        false
      )
      const sphereButton = document.getElementById('sphere')
      sphereButton.addEventListener(
        'click',
        function() {
          $this.transform($this.targets.sphere, 2000)
        },
        false
      )
      const helixButton = document.getElementById('helix')
      helixButton.addEventListener(
        'click',
        function() {
          $this.transform($this.targets.helix, 2000)
        },
        false
      )
      const gridButton = document.getElementById('grid')
      gridButton.addEventListener(
        'click',
        function() {
          $this.transform($this.targets.grid, 2000)
        },
        false
      )
      this.transform(this.targets.table, 2000)
      //
      window.addEventListener('resize', this.onWindowResize, false)
    },
    transform(targets, duration) {
      TWEEN.removeAll()
      for (let i = 0; i < this.objects.length; i++) {
        let object = this.objects[i]
        let target = targets[i]
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
      }
      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
    },
    animate() {
      requestAnimationFrame(this.animate)
      TWEEN.update()
      this.controls.update()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize() {
      this.camera.aspect = this.root.clientWidth / this.root.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.root.clientWidth, this.root.clientHeight)
      this.render()
    }
  }
}
</script>

<style lang="scss">
#three-container {
  .element {
    width: 120px;
    height: 160px;
    box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
    border: 1px solid rgba(127, 255, 255, 0.25);
    font-family: Helvetica, sans-serif;
    text-align: center;
    line-height: normal;
    cursor: default;
  }
  .element:hover {
    box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
    border: 1px solid rgba(127, 255, 255, 0.75);
  }
  .element .number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(127, 255, 255, 0.75);
  }
  .element .symbol {
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    font-size: 60px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.75);
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
  }
  .element .details {
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    font-size: 12px;
    color: rgba(127, 255, 255, 0.75);
  }
}
</style>
<style lang="scss" scoped>
#three-container {
  height: calc(100% - 48px);
}
</style>