import { mapGetters, mapActions } from 'vuex'
import { addCss, themeLists, removeAllCss, getReadTimeAttribute } from '@/utils/bookMenuSetting'
import { getBookmark, getBookShelf, saveBookShelf, saveLocation } from '@/utils/localStorage'
// eslint-disable-next-line no-unused-vars
import book from '@/store/modules/book'
import { appendAddToShelf, computeId, gotoBookDetail, removeAddFromShelf } from '@/utils/store'
import { shelf } from '@/api/store'
export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'])
  },
  methods: {
      ...mapActions([
        'setIsEditMode',
        'setShelfList',
        'setShelfSelected',
        'setShelfTitleVisible',
        'setOffsetY',
        'setShelfCategory',
      'setCurrentType']),
    showBookDetail(book) {
      // console.log(book)
      gotoBookDetail(this, book)
    },
    getCategoryList(title){
        this.getShelfList().then(() => {
          // console.log(this.shelfList)
          const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
          // console.log(categoryList)
          this.setShelfCategory(categoryList)
        })
    },
    getShelfList() {
      let shelfList = getBookShelf()
      if (!shelfList) {
        shelf().then(response => {
          if (response.status === 200 && response.data && response.data.bookList){
            shelfList = appendAddToShelf(response.data.bookList)
            saveBookShelf(shelfList)
            this.setShelfList(shelfList)
          }
        })
      } else {
       return this.setShelfList(shelfList)
      }
    },
    moveOutGroup(f) {
        this.setShelfList(this.shelfList.map(book => {
            if (book.type === 2 && book.itemList) {
              book.itemList = book.itemList.filter(subBook => !subBook.selected)
            }
            return book
          })
        ).then(() => {
          let list = removeAddFromShelf(this.shelfList)
          list = [].concat(list, ...this.shelfSelected)
          list = appendAddToShelf(list)
          list = computeId(list)
          this.setShelfList(list).then(() => {
            this.simpleToast((this.$t('shelf.moveBookOutSuccess')))
            if (f) f()
          })
        })
      }
  }
}

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible']),
    showBookDetail(book) {
      // console.log(book)
        gotoBookDetail(this, book)
      }
  }
}
// 阅读器方法集成，可调用数据集成
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook', // 传book对象
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
      'bookcfi',
      'bookLength'
    ]),
    themeList() {
      // eslint-disable-next-line no-undef
      return themeLists(this)
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setFontFamilyVisible',
      'setDefaultFontFamily',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
      'setBookcfi',
      'addBookcfi',
      'setBookLength'
    ]),
    // 记录定位
    resaveLocation() {
      const cfi = this.bookcfi
      // console.log('bookcfi:' + cfi)
      const progress = Math.floor((cfi) / (this.bookLength - 1) * 100)
      this.setProgress(progress)
      this.setSection(cfi)
      // localStorage 保存页数
      // saveLocation(this.fileName, cfi)
      const bookmark = getBookmark(this.fileName)
      // console.log('bookmark')
      // console.log(bookmark)
      if (bookmark) {
          if (bookmark.some(item => item.cfi === cfi)){
            this.setIsBookmark(true)
          } else {
            this.setIsBookmark(false)
          }
      } else {
        this.setIsBookmark(false)
      }
      saveLocation(this.fileName, cfi)
    },
    // 展示
    display(target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.resaveLocation()
          // 调用回调函数
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.resaveLocation()
          if (cb) cb()
        })
      }
    },
    // 主题初始化
    initGlobalStyle (){
      removeAllCss()
      switch (this.defaultTheme){
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
      }
    },
    // 获取时间文本
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', getReadTimeAttribute(this.fileName))
    },
    getCfi() {
      // console.log(1)
    }
  }
}
