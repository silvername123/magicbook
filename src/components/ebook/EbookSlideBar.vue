<template>
  <transition name="fade" class="un">
    <div class="slide-content-wrapper" v-show=" menuVisible && settingVisible === 3" >
      <transition name="slide-right">
        <div class="content" v-if=" settingVisible === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab === 1 ? content:bookmark"></component>
            </div>
            <!--切换组件 -->
            <div class="content-page-tab">
              <div class="content-page-tab-item"
                   :class="{'selected': currentTab === 1}"
                    @click="changeTab(1)" >
                {{$t('book.navigation')}}
              </div>
              <div class="content-page-tab-item"
                    :class="{'selected': currentTab === 2}"
                   @click="changeTab(2)"> {{$t('book.bookmark')}}</div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hide()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookSlideContent from '@/components/ebook/EbookSlideContent'
import EbookLoading from '@/components/ebook/EbookLoading'
import EbookSlideBookmark from '@/components/ebook/EbookSlideBookmark'
// import EbookSlideBookmark from '@/components/ebook/EbookSlideBookmark'
export default {
  mixins: [ebookMixin],
  // 数据绑定
  data() {
    return {
      currentTab: 1, // 选择菜单
      content: EbookSlideContent,
      bookmark: EbookSlideBookmark
    }
  },
  components: {
    EbookLoading,
    // eslint-disable-next-line vue/no-unused-components
    EbookSlideContent,
    EbookSlideBookmark
  },
  methods: {
    changeTab(index){
      this.currentTab = index
    },
    hide() {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      // this.$store.dispatch('setMenuVisible', false)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
  .slide-content-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
    display: flex;
    width: 100%;
    height: 100%;
    //左边栏
    .content {
      flex: 0 0 80%;
      width: 80%;
      height: 100%;
      .content-page-wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        //  书签栏上方
        .content-page{
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        // 书签栏
        .content-page-tab{
          display: flex;
          flex: 0 0 px2rem(48);
          height: px2rem(48);
          .content-page-tab-item {
            color: #333333;
            //background-color: red;
            flex: 1;
            font-size: px2rem(12);
            @include center
          }
        }
      }
      .content-empty{
        width: 100%;
        height: 100%;
        @include center;
      }
    }
    //右边消除
    .content-bg {
      flex: 0 0 20%;
      width: 20%;
      height: 100%;
    }
  }
</style>
