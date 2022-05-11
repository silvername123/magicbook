<template>
  <div>
  <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
    <transition name="title-move">
    <div class="search-bar-title-wrapper" v-show="titleVisible">
      <div class="title-text-wrapper">
        <span class="title-text title">{{$t('home.title')}}</span>
      </div>
      <div class="title-icon-shake-wrapper" @click="showFlapCard">
        <span class="icon-shake icon"></span>
      </div>
    </div>
    </transition>
    <div class="title-icon-back-wrapper" :class="{'hide-title':!titleVisible}" @click="hideHotSearch">
      <span class="icon-back icon"></span>
    </div>
    <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title':!titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input class="input" type="text" :placeholder="$t('home.hint')"
          v-model="searchText"
          @click="showHotSearch"
          @keyup.13.exact="search">
        </div>
    </div>
  </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
import { storeHomeMixin } from '@/utils/mixin'
// eslint-disable-next-line no-unused-vars
import HotSearch from '@/components/home/HotSearch'
import HotSearchList from '@/components/home/HotSearchList'
export default {
  mixins: [storeHomeMixin],
  components: {
    HotSearchList
    // HotSearch
  },
  data() {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: false,
      hotSearchVisible: false
    }
  },
  watch: {
    // 监听移动时的偏移量offsetY
    offsetY(offsetY) {
      if (offsetY > 0){
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    // 监听搜索页面的偏移量
    hotSearchOffsetY(offsetY) {
      if (offsetY > 0){
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  },
  methods: {
    search() {
      console.log('1')
      this.$router.push({
        path: '/store/list',
        query: {
          keyword: this.searchText
        }
      })
    },
    showFlapCard(){
      this.setFlapCardVisible(true)
    },
    back(){
      if (this.offsetY > 0){
        this.showShadow()
      } else {
        this.hideShadow()
      }
      this.hideHotSearch()
    },
    hideHotSearch(){
      console.log(this.offsetY)
      this.hotSearchVisible = false
      if (this.offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    showHotSearch() {
      this.hideTitle()
      this.hideShadow()
      this.hotSearchVisible = true
      this.$nextTick(() => {
        this.$refs.hotSearch.reset()
      })
    },
    hideTitle(){
      this.titleVisible = false
    },
    showTitle() {
      this.titleVisible = true
    },
    hideShadow(){
      this.shadowVisible = false
    },
    showShadow() {
      this.shadowVisible = true
    }
    // searchText
  }
// name: "SearchBar"
}
</script>

<style  lang="scss"  rel="stylesheet/scss" scoped>
    @import "../../assets/styles/global";
    .search-bar {
      z-index: 150;
      position: relative;
      width: 100%;
      height: px2rem(94);
      box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
      &.hide-title {
        height: px2rem(52);
      }
      &.hide-shadow {
        box-shadow: none;
      }
      .search-bar-title-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: px2rem(42);
        .title-text-wrapper {
          width: 100%;
          height: px2rem(42);
          @include center;
        }
        .title-icon-shake-wrapper {
          position: absolute;
          right: px2rem(15);
          top:0;
          height: px2rem(42);
        }
      }
      .title-icon-back-wrapper {
        visibility: hidden;
        position: absolute;
        left: px2rem(15);
        top: 0;
        z-index: 200;
        height: px2rem(42);
        transition: height $animationTime $animationType;
        @include center;
        &.hide-title {
          height: px2rem(52);
          visibility: visible;
        }
      }
      .search-bar-input-wrapper {
        position: absolute;
        left: 0;
        top:px2rem(42);
        width: 100%;
        display: flex;
        height: px2rem(52);
        padding: px2rem(10);
        box-sizing: border-box;
        transition: all $animationTime $animationType;
        &.hide-title {
          top: 0;
        }
        .search-bar-blank {
          flex: 0 0 0;
          width: 0;
          transition: all $animationTime $animationType;
          &.hide-title {
            flex: 0 0 px2rem(31);
            width: px2rem(31);
          }
        }
        .search-bar-input{
          flex: 1;
          width: 100%;
          background: #f4f4f4;
          border-radius: px2rem(20);
          padding: px2rem(5) px2rem(15);
          box-sizing: border-box;
          border: px2rem(1) solid #eee;
          @include left;
          .icon-search{
            color: #999;
          }
          .input{
            padding-left: px2rem(10) ;
            width: 100%;
            height: px2rem(22);
            // 边框消失
            border: none;
            // 背景透明
            background: transparent;
            &:focus {
              outline: none;
            }
          }
        }
      }
    }
</style>
