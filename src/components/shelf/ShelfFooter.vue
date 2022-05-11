<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper" v-for="(item, index) in tabs" :key="index"
         @click="onTabClick(item)">
      <div class="shelf-footer-tab" :class="{'is-selected' : isSelected}">
        <div class="icon-download tab-icon" v-if="item.index === 1 && !isDownLoad"></div>
        <div class="icon-download-remove tab-icon" v-if="item.index === 1 && isDownLoad"></div>
        <div class="icon-move tab-icon" :class="{'is-selected' : isSelected}" v-if="item.index === 2"></div>
        <div class="icon-shelf tab-icon" v-if="item.index === 3"></div>
        <div class="tab-text" :class="{'remove-text' : item.index === 4}">{{label(item)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { download } from '@/api/store'
import { storeShelfMixin } from '@/utils/mixin'
import { removeLocalStorage, saveBookShelf } from '@/utils/localStorage'
import { removeLocalForage } from '@/utils/localForage'

export default {
  mixins: [storeShelfMixin],
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    isPrivate(){},
    isDownLoad() {
      if (!this.isSelected) {
        return false
      } else {
         return this.shelfSelected.every(item => item.cache)
      }
    },
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0
        // return true
      // if (this.data) {
      //   return this.data.some(item => item.selected)
      // } else {
      //   return false
      // }
    },
    tabs() {
      return [
        {
          label: this.$t('shelf.download'),
          label2: this.$t('shelf.delete'),
          index: 1
        },
        {
          label: this.$t('shelf.move'),
          index: 2
        },
        {
          label: this.$t('shelf.remove'),
          index: 3
        }
      ]
    }
  },
  data() {
    return {
      popupMenu: null
    }
  },
  methods: {
    removeSelectBook() {
      Promise.all(this.shelfSelected.map(book => this.removeBook(book)))
      .then(books => {
        books.map(books => {
          books.cache = false
        })
        saveBookShelf(this.shelfList)
        this.simpleToast(this.$t('shelf.removeDownloadSuccess'))
      })
    },
    removeBook(book) {
      // eslint-disable-next-line no-undef
      return new Promise((resolve, reject) => {
        removeLocalStorage(`${book.category}/${book.fileName}-info`)
        removeLocalForage(`${book.fileName}`)
        resolve(book)
      })
    },
    // isDownload: false,
    async downloadSelectedBook () {
      for (let i = 0; i < this.shelfSelected.length; i++){
        await this.downloadBook(this.shelfSelected[i])
        //     .then(book => {
        //   book.cache = true
        //   console.log(book)
        // })
      }
    },
    downloadBook(book){
      // console.log(book)
      let text = ''
      const toast = this.toast({
        text
      })
      toast.continueShow()
       return new Promise((resolve, reject) => {
         download(book, book => {
              book.cache = true
              toast.remove()
              resolve(book)
         }, reject, progressEvent => {
           // const progress = Math.floor(progressEvent.total)
           // console.log(progressEvent)
           // console.log(progress)
           text = '正在下载'
           toast.updateText(text)
         })
       })
    },
    onComplete() {
      this.hidePopup()
      this.setIsEditMode(false)
      saveBookShelf(this.shelfList)
    },
    async setDownLoad() {
      this.onComplete()
      if (this.isDownLoad) {
        this.removeSelectBook()
      } else {
        await this.downloadSelectedBook()
        this.simpleToast(this.$t('shelf.setDownloadSuccess'))
      }
    },
    hidePopup(){
      this.popupMenu.hide()
    },
    showDownLoad(){
      // eslint-disable-next-line no-unused-vars
      this.popupMenu = this.popup({
        title: this.isDownLoad ? this.$t('shelf.removeDownloadTitle') : this.$t('shelf.setDownloadTitle'),
        btn: [
          {
            text: this.isDownLoad ? this.$t('shelf.delete') : this.$t('shelf.open'),
            click: () => {
              this.setDownLoad()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              // this.removeSelectBook()
              this.hidePopup()
            }
          }
        ]
      }).show()
    },
    showRemove () {
      let title
      if (this.shelfSelected.length === 1) {
        title = this.$t('shelf.removeBookTitle').replace('$1', `${this.shelfSelected[0].title}`)
      } else {
        title = this.$t('shelf.removeBookTitle').replace('$1', this.$t('shelf.selectedBooks'))
      }
      this.popupMenu = this.popup({
        title: title,
        btn: [
          {
            text: this.$t('shelf.removeBook'),
            type: 'danger',
            click: () => {
              this.removeSelected()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              this.hidePopup()
            }
          }
        ]
      }).show()
      // console.log(title)
    },
    onTabClick(item){
      // console.log(this.isSelected)
      // 书架列表为空则返回
      if (!this.isSelected) {
        return
      }
      switch (item.index){
        case 1:
          // console.log('1')
          this.showDownLoad()
          break
        case 2:
          this.dialog().show()
          break
        case 3:
          this.showRemove()
          break
        default:
          break
      }
      // this.toast({ text: 'hello ' }).show()
    },
    label(item) {
      switch (item.index) {
        case 1:
          return this.isDownLoad ? item.label2 : item.label
        default:
          return item.label
      }
    },
    removeSelected () {
      this.shelfSelected.forEach(selected => {
        this.setShelfList(this.shelfList.filter(book => book !== selected))
      })
      this.setShelfSelected([])
      this.onComplete()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-footer{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);
  .shelf-footer-tab-wrapper{
    flex: 1;
    width: 25%;
    height: 100%;
    .shelf-footer-tab{
      width: 100%;
      height: 100%;
      opacity: .5;
      @include columnCenter;
      &.is-selected {
        opacity: 1;
      }
      .tab-icon {
        font-size: px2rem(20);
        color: #666;
        &.icon-shelf {
          color: $color-pink;
        }
        &.icon-download {
          font-size: px2rem(22);
        }
      }
      .tab-text {
        margin-top: px2rem(5);
        font-size: px2rem(12);
        color: #666;
        &.remove-text {
          color: $color-pink;
        }
      }
      .icon-shelf {
        color: $color-pink;
      }
    }
  }
}
</style>
