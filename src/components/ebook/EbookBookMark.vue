<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">
        {{text}}
      </div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" ref="bookmarktext" :style="isFixed  ? fixedStyle : {}">
<!--      <book-mark :width="15" :height="35" :color="color" ref="bookmark"></book-mark>-->
      <book-mark :width="15" :height="35" :color="color" ref="bookm" ></book-mark>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import BookMark from '@/components/ebook/BookMark'
import { realPx } from '@/utils/utils'
import { ebookMixin } from '@/utils/mixin'
// eslint-disable-next-line no-unused-vars
import { getLocation, saveBookmark, getBookmark } from '@/utils/localStorage'

// const BLUE = '#346cbc'
// const WHITE = '#FFF'
const RED = '#724040'
export default {
  mixins: [ebookMixin],
  components: { BookMark },
// name: "EbookBookMark"
  data() {
    return {
      text: this.$t('book.pulldownAddMark'),
      color: RED,
      isFixed: false
    }
  },
  computed: {
    height() {
      return realPx(35)
    },
    threshold() {
      return realPx(55)
    },
    fixedStyle() {
      return {
        position: 'fixed',
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`,
        top: 0
      }
    }
  },
  watch: {
    offsetY(v) {
      if (this.settingVisible >= 0 || this.menuVisible || !this.bookAvailable) {
        return
      }
      if (v >= this.height && v <= this.threshold){
        console.log('2')
        this.beforeMark(v)
      } else if (v >= this.threshold) {
        this.afterMark(v)
        console.log('3')
      } else if (v > 0 && v < this.height){
        this.beforeheight()
      } else if (v === 0){
        this.restore()
      }
    },
    isBookmark(isBookmark){
        if (isBookmark){
          this.isFixed = true
        } else {
          this.isFixed = false
        }
    }
  },
  methods: {
    addBookMark() {
      const cfi = getLocation(this.fileName)
      this.bookmark = getBookmark(this.fileName)
      if (!this.bookmark) {
        this.bookmark = []
      }
      this.bookmark.push({
        cfi: cfi
      })
      // console.log(cfi)
      saveBookmark(this.fileName, this.bookmark)
    },
    removeBookMark(){
      const cfi = getLocation(this.fileName)
      this.bookmark = getBookmark(this.fileName)
      if (this.bookmark) {
        saveBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== cfi))
        this.setIsBookmark(false)
      }
    },
    restore() {
      // 状态4: 归位
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.height}px`
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
      }, 200)
      // eslint-disable-next-line no-undef
      if (this.isFixed) {
        this.setIsBookmark(true)
        this.addBookMark()
      } else {
        this.removeBookMark()
        this.setIsBookmark(false)
      }
    },
    // 状态1 未超过书签高度
    beforeheight(){
      if (this.isBookmark){
        this.text = this.$t('book.pulldownDeleteMark')
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.isFixed = false
      }
    },
    // 状态2 未达到零界状态
    beforeMark(v){
      this.beforeheight()
      this.$refs.bookmark.style.top = `${-v}px`
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
    },
    // 状态3  超越零界状态
    afterMark(v) {
      if (this.isBookmark){
        this.text = this.$t('book.releaseDeleteMark')
        this.isFixed = false
      } else {
        this.text = this.$t('book.releaseAddMark')
        this.isFixed = true
      }
      this.$refs.bookmark.style.top = `${-v}px`
      this.color = RED
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
        iconDown.style.transform = 'rotate(180deg)'
      }
    }
  }
}
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(35);
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(14);
      transition: all .2s linear;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: px2rem(14);
      color: #346cbc;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(10);
  }
}
</style>
