<template>
  <div class="ebook-slide-contents">
    <div class="current-page">
      <div class="time">{{getReadTimeText()}}</div>
      <span class="current-page-list">第{{bookcfi + 1}}页</span>
    </div>
    <scroll class="slide-contents-list" :top="156" :bottom="48" ref="scroll" >
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span class="slide-contents-item-label" @click="displaycfi(index)">{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/Scroll'
// import {getBookmark} from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  methods: {
    displaycfi (target, cb) {
      this.setBookcfi(target)
      this.display(target)
      // console.log(target)
    }
  }
// name: "EbookSlideContent"
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
  .ebook-slide-contents{
      width: 100%;
      font-size: 0;
     .current-page{
        display: flex;
       .time{
         width: 50%;
         height: px2rem(20);
         margin: px2rem(20) 0 px2rem(10) 0;
         font-size: px2rem(20);
         @include center
       }
       .current-page-list{
         width: 50%;
         height: px2rem(20);
         margin: px2rem(20) 0 px2rem(10) 0;
         font-size: px2rem(20);
         @include center
       }
     }
     .slide-contents-list {
       margin-top: px2rem(20);
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-item {
        display: flex;
        padding: px2rem(20) 0;
        box-sizing: border-box;
        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          margin-left:px2rem(14);
          line-height: px2rem(16);
          @include ellipsis;
        }
        .slide-contents-item-page {
          flex: 0 0 px2rem(30);
          font-size: px2rem(10);
          @include right;
        }
      }
    }
  }
</style>
