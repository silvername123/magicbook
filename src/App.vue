<template>
  <div id="app">
<!--    app-->
    <router-view/>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
  import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars

export default {
}
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fonSize = window.innerWidth / 10
    fonSize = fonSize > 50 ? 50 : fonSize
    html.style.fontSize = fonSize + 'px'
  })
</script>
<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
