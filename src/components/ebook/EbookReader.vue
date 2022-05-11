<template>
  <div class="ebook-reader">

    <div class="ebook-reader-mask" @click="onClick"
    @touchmove="move"
    @touchend="moveEnd"></div>
    <div id="read"></div>
  </div>
</template>

<script>
  import { ebookMixin } from '@/utils/mixin'
  import { getFontSize, getLocation, getTheme, saveTheme } from '@/utils/localStorage'
  import { getLocalForage } from '@/utils/localForage'
  // eslint-disable-next-line no-unused-vars
  import Epub from 'epubjs'
  import { flatten } from '@/utils/bookMenuSetting'
  global.ePub = Epub
  export default {
    mixins: [ebookMixin],
    methods: {
      move(e){
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.changedTouches[0].clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.changedTouches[0].clientY
        }
        e.preventDefault()
        e.stopPropagation()
      },
      moveEnd(e){
        this.setOffsetY(0)
        this.firstOffsetY = null
      },
      onClick(e) {
        const offsetX = e.offsetX
        const width = window.innerWidth
        if (offsetX > 0 && offsetX < width * 0.3){
          this.prevPage()
        } else if (offsetX > 0 && offsetX > width * 0.7){
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
      },
      parseBook() {
        this.book.loaded.navigation.then(nav => {
          // console.log(nav)
          const navItem = flatten(nav.toc)
          // console.log(navItem)
          // function
          this.setNavigation(navItem)
        })
      },
      // 上一页
      prevPage() {
        if (this.rendition) {
          const cfi = this.currentBook.rendition.currentLocation().start.index - 1
          this.currentBook.rendition.display(cfi).then(() => {
            this.setBookcfi(cfi)
            this.resaveLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      // 下一页
      nextPage() {
        if (this.rendition) {
          const cfi = this.currentBook.rendition.currentLocation().start.index + 1
          this.currentBook.rendition.display(cfi).then(() => {
            this.setBookcfi(cfi)
            this.resaveLocation()
          })
          // this.addBookcfi()
          // console.log(this.fileName)
          // this.rendition.next().then(() => {
          //   const cfi = this.currentBook.rendition.currentLocation().start.index
          //   console.log(this.currentBook.rendition.currentLocation())
          //   this.setBookcfi(cfi)
          //   this.resaveLocation()
          //   // this.setProgress(((cfi + 1) / this.bookLength) * 100)
          // })
          this.hideTitleAndMenu()
        }
      },
      toggleTitleAndMenu() {
        this.setMenuVisible(!this.menuVisible)
        // 存在即消失
        if (this.menuVisible) {
          this.setSettingVisible(-1)
        }
        // this.$store.dispatch('setMenuVisible', !this.menuVisible)
        // console.log('title')
      },
      // 隐藏菜单栏
      hideTitleAndMenu() {
        this.setMenuVisible(false)
        this.setSettingVisible(-1)
        // this.$store.dispatch('setMenuVisible', false)
      },
      // 初始化字体
      initFontSize() {
        let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          // saveFonSize(this.fileName, this.defaultFontSize)
        } else {
          this.setDefaultFontSize(fontSize)
        }
      },
      // 手势
      initSign(){
        this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchStartX
          const time = event.timeStamp - this.touchStartTime
          if (time < 500 && offsetX > 40) {
            this.prevPage()
          } else if (time < 500 && offsetX < -40) {
            this.nextPage()
          } else {
            this.toggleTitleAndMenu()
          }
          // 打印rendition信息
          // console.log(this.rendition.currentLocation())
          // event.preventDefault()
          // event.stopPropagation()
          // console.log(offsetX, time)
        }, { passive: false })
      },
      initTheme(){
        let defaultTheme = getTheme(this.fileName)
        if (!defaultTheme) {
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme)
        }
        this.setDefaultTheme(defaultTheme)
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        // 通过默认名字来选择主题
        this.rendition.themes.select(defaultTheme)
      },
      // 获取book对象
      initRendition() {
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
          // flow:'scrolled'
        })
        // console.log(this.rendition)
        const location = getLocation(this.fileName)
        // console.log(location)
        if (location){
          this.setBookcfi(location)
        }
          this.display(location, () => {
            this.initFontSize()
            this.initTheme()
            this.initGlobalStyle()
            this.parseBook()
          })
      },
      // 获取电子书
      initEpub(url) {
        // 获取链接
        // const url = `${process.env.VUE_APP_RES_URL}` + '/ebook/' + this.fileName + '.epub'
        // console.log(url)
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.initSign()
        this.book.ready.then(() => {
          const length = this.book.navigation.length
          this.setBookLength(length)
          this.setBookAvailable(true)
        })
      }
    },
  mounted () {
    const books = this.$route.params.fileName.split('|')
    const bookfileName = books[1]
    getLocalForage(bookfileName, (err, blob) => {
        if (!err && blob){
          this.setFileName(books.join('/')).then(() => {
              this.initEpub(blob)
          })
        } else {
          this.setFileName(books.join('/')).then(() => {
            const url = process.env.VUE_APP_EPUB_URL + this.fileName + '.epub'
            this.initEpub(url)
          })
            // console.log('获取电子书')
        }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    z-index: 150;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
