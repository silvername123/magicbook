<template>
  <transition name="hot-search-move">
    <scroll class="hot-search-wrapper"
            :top="52"
            @onScroll="onScroll"
            ref="scroll">
      <hot-search :label="$t('home.hotSearch')"
                  :btn="$t('home.change')"
                  :hotSearch="searchList.hotSearch"></hot-search>
      <div class="line"></div>
      <hot-search :label="$t('home.historySearch')"
                  :btn="$t('home.clear')"
                  :hotSearch="searchList.historySearch"></hot-search>
    </scroll>
  </transition>
</template>

<script>
  import Scroll from '../common/Scroll'
  import HotSearch from './HotSearch'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    components: {
      Scroll,
      HotSearch
    },
    data() {
      return {
        searchList: {
          hotSearch: [
            {
              type: 1,
              text: 'one piece',
              num: '1.8万'
            },
            {
              type: 1,
              text: 'Monster 8',
              num: '1.1万'
            },
            {
              type: 1,
              text: 'Two happy things',
              num: '1.3万'
            },
            {
              type: 1,
              text: 'The power of wisdom',
              num: '1.0万'
            }
          ],
          historySearch: [
            {
              type: 2,
              text: 'one piece'
            },
            {
              type: 1,
              text: 'Monster 8'
            },
            {
              type: 2,
              text: 'Two happy things'
            },
            {
              type: 2,
              text: 'MY'
            },
            {
              type: 2,
              text: 'One'
            },
            {
              type: 2,
              text: 'two'
            },
            {
              type: 2,
              text: 'one'
            },
            {
              type: 2,
              text: 'hdfs'
            },
            {
              type: 2,
              text: 'js'
            },
            {
              type: 2,
              text: 'd'
            },
            {
              type: 2,
              text: 'Il'
            }
          ]
        }
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setHotSearchOffsetY(offsetY)
      },
      reset() {
        this.$refs.scroll.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .hot-search-wrapper {
    width: 100%;
    height: 100%;
    background: white;
    .line {
      width: 100%;
      height: 0;
      border-top: px2rem(1) solid #eee;
      margin: px2rem(10) 0;
    }
  }
</style>
