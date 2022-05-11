<template>
  <div>
  <transition name="slide-up">
    <div class="menu-wrapper" :class="{'hide-box-shadow':!menuVisible || settingVisible >= 0 }" v-show="menuVisible">
      <div class="icon-wrapper">
        <span class="icon-menu" @click="showSetting(3)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-progress " @click="showSetting(2)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-bright" @click="showSetting(1)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-shake" @click="showSetting(0)"></span>
      </div>
    </div>
  </transition>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-slide-bar></ebook-slide-bar>
  </div>
</template>

<script>
import EbookSettingTheme from '@/components/ebook/EbookSettingTheme'
import EbookSettingProgress from '@/components/ebook/EbookSettingProgress'
import EbookSettingFont from '@/components/ebook/EbookSettingFont'
import EbookSlideBar from '@/components/ebook/EbookSlideBar'
import { ebookMixin } from '@/utils/mixin'

export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingProgress,
    EbookSettingFont,
    EbookSlideBar,
    EbookSettingTheme
  },
  name: 'EbookMenu.vue',
  methods: {
    showSetting(key) {
        this.setSettingVisible(key)
        console.log('key' + key)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
  font-size: px2rem(20);
    &.hide-box-shadow {
    box-shadow: none;
  }
}
.icon-wrapper {
  flex: 1;
  @include center;
  .icon-progress {
    font-size: px2rem(28);
  }
  .icon-bright {
    font-size: px2rem(24);
  }
  .icon-shake {
    font-size: px2rem(24);
  }
}

</style>
