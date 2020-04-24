<template>
  <div ref="lottie-web" class="lottie-web" @click="play"></div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => ''
    },
    path: {
      type: String,
      default: () => ''
    },
    color: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      lottie: ''
    }
  },
  mounted() {
    this.lottie = this.$lottie.loadAnimation({
      container: this.$refs['lottie-web'], // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/icons/cloudy-weather/cloudy-weather.json' // the path to the animation json
    })
    this.$emit('lottie', this.lottie)
  },
  methods: {
    play() {
      if (this.lottie.isPaused) {
        this.lottie.play()
      } else {
        this.lottie.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lottie-web {
  display: flex;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
</style>