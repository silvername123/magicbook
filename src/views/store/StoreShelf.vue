<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll class="store-shelf-scroll-wrapper" @onScroll="onScroll" :top="0" :bottom="50" ref="scroll">
      <shelf-search></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
    <select-menu></select-menu>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars,import/no-duplicates
import SelectMenu from '@/components/home/SelectMenu'
import ShelfTitle from '@/components/shelf/ShelfTitle'
import ShelfList from '@/components/shelf/ShelfList'
import Scroll from '@/components/common/Scroll'
import ShelfSearch from '@/components/shelf/ShelfSearch'
import { storeShelfMixin } from '@/utils/mixin'
import ShelfFooter from '@/components/shelf/ShelfFooter'
// import ShelfItem from '@/components/shelf/ShelfItem'
export default {
// name: "StoreShelf"
  mixins: [storeShelfMixin],
  components: {
    ShelfFooter,
    ShelfSearch,
    Scroll,
    // ShelfItem,
    ShelfList,
    ShelfTitle,
    SelectMenu
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    }
  },
  mounted () {
    this.getShelfList()
    this.setShelfCategory([])
    this.setCurrentType(1)
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .store-shelf {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    .store-shelf-scroll-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
      background: white;
    }
  }
</style>
