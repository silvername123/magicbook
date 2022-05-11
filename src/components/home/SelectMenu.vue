<template>
  <div>
    <transition name="slide-up">
      <div class="menu">
        <div class="icon-wrapper">
          <span class="icon-book"></span>
          <span class="title" @click="showSetting(0)">首页</span>
        </div>
<!--        <div class="icon-wrapper">-->
<!--          <span class="icon-book2"></span>-->
<!--          <span class="title" @click="showSetting(1)">分类</span>-->
<!--        </div>-->
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
          <span  class="title" @click="showSetting(2)">{{$t('shelf.title')}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'

export default {
  mixins: [ebookMixin],
  methods: {
    showSetting(key) {
      if (key === 2){
        // 变更路由
        this.$router.push('/store/shelf')
      } else if (key === 0) {
        this.$router.push('/store/home')
      } else {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.menu {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 102;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .01);
  font-size: px2rem(20);
  &.hide-box-shadow {
    box-shadow: none;
  }
}
.icon-wrapper {
  flex-direction: column;
  flex: 1;
  @include center;
  .title{
    font-size: px2rem(12);
  }
}

</style>
