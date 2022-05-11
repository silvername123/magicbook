<template>
  <transition name="fade">
  <div class="shelf-title" v-show="shelfTitleVisible">
    <div class="shelf-title-text-wrapper">
      <span class="shelf-title-text">{{title}}</span>
<!--      <span class="shelf-title-sub-text">选择书籍</span>-->
      <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showClear">
      <span class="shelf-title-btn-text " @click="clearCache">{{$t('shelf.clearCache')}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-right" v-if="showEdit">
      <span class="shelf-title-btn-text " @click="onEditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showBack">
      <span class="icon-back" @click="back"></span>
    </div>
    <div class="shelf-title-btn-wrapper" :class="{'shelf-title-left': changGroupLeft,'shelf-title-right': changGroupRight}"
         v-if="showChangeGroup"
          @click="changeGroup">
      <span class="shelf-title-btn-text" >{{$t('shelf.editGroup')}}</span>
    </div>
  </div>
  </transition>
</template>

<script>
import { storeShelfMixin } from '@/utils/mixin'
import { clearLocalStorage, saveBookShelf } from '@/utils/localStorage'
import { clearLocalForage } from '@/utils/localForage'

export default {
// name: "ShelfTitle"
  mixins: [storeShelfMixin],
  props: {
    title: String
  },
  computed: {
    emptyCategory() {
      return !this.shelfCategory || !this.shelfCategory.itemList ||
          this.shelfCategory.itemList.length === 0
    },
    showClear() { return this.currentType === 1 },
    showEdit() { return this.currentType === 1 || !this.emptyCategory },
    showBack() {
      return this.currentType === 2 && !this.isEditMode
    },
    showChangeGroup() {
      return this.currentType === 2 && (this.isEditMode || this.emptyCategory)
    },
    changGroupLeft() {
      return !this.emptyCategory
    },
    changGroupRight() {
      return this.emptyCategory
    },
    selectedText() {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
      return selectedNumber <= 0 ? this.$t('shelf.selectBook')
          : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber)
              : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
    },
    popupCancelBtn() {
      return this.createPopupBtn(this.$t('shelf.cancel'), () => {
        this.hidePopup()
      })
    }
  },
  data() {
    return {
      ifHideShadow: false
    }
  },
  methods: {
    onComplete() {
      this.hidePopup()
      this.setShelfList(this.shelfList.filter(book => book.id !== this.shelfCategory.id)).then(() => {
        saveBookShelf(this.shelfList)
        this.$router.go(-1)
        this.setIsEditMode(false)
      })
    },
    showDeleteGroup(){
      this.hidePopup()
      setTimeout(() => {
        this.popupMenu = this.popup({
        title: this.$t('shelf.deleteGroupTitle'),
        btn: [
            this.createPopupBtn(this.$t('shelf.confirm'), () => {
              this.deleteGroup()
            }, 'danger'),
            this.popupCancelBtn
        ]
        }).show()
      }, 200)
    },
    deleteGroup() {
      if (!this.emptyCategory) {
        this.setShelfSelected(this.shelfCategory.itemList)
        this.moveOutGroup(this.onComplete)
      } else {
        this.onComplete()
      }
    },
    changGroupName() {
      this.hidePopup()
      this.dialog({
        showNewGroup: true,
        groupName: this.shelfCategory.title
      }).show()
    },
    createPopupBtn(text, onClick, type = 'normal'){
      return {
        text: text,
        type: type,
        click: onClick
      }
    },
    changeGroup() {
      console.log('s')
      this.popupMenu = this.popup({
        btn: [
          this.createPopupBtn(this.$t('shelf.editGroupName'), () => {
              this.changGroupName()
            }),
          this.createPopupBtn(this.$t('shelf.deleteGroup'), () => {
            this.showDeleteGroup()
          }, 'danger'),
          this.popupCancelBtn
        ]
      }).show()
    },
    hidePopup () {
      this.popupMenu.hide()
    },
    back(){
      this.$router.go(-1)
      this.setIsEditMode(false)
    },
    onEditClick() {
      if (!this.isEditMode) {
        this.setShelfSelected([])
        this.shelfList.forEach(item => {
          item.selected = false
          console.log(item)
          if (item.itemList) {
            item.itemList.forEach(subItem => {
              subItem.selected = false
            })
          }
        })
      }
      this.setIsEditMode(!this.isEditMode)
    },
    clearCache() {
      clearLocalStorage()
      clearLocalForage()
      console.log('qing')
      this.setShelfList([])
      this.setShelfSelected([])
      this.getShelfList()
      this.simpleToast(this.$t('shelf.clearCacheSuccess'))
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
  .shelf-title {
    position: relative;
    z-index: 130;
    width: 100%;
    height: px2rem(42);
    background: white;
    .shelf-title-text-wrapper {
      position: absolute;
      top:0 ;
      left:0;
      width: 100%;
      height: px2rem(42);
      @include columnCenter;
      .shelf-title-text {
        font-size: px2rem(16);
        line-height: px2rem(20);
        font-weight: bold;
        color: #333;
      }
      .shelf-title-sub-text{
        font-size: px2rem(10);
        color: #333;
      }
    }
    .shelf-title-btn-wrapper{
      position: absolute;
      top:0;
      box-sizing: border-box;
      height: 100%;
      @include center;
      .shelf-title-btn-text{
        font-size:px2rem(12);
        color:#666;
      }
      .icon-back{
        font-size: px2rem(20);
      }
       &.shelf-title-left{
         left: 0;
         padding-left: px2rem(15);
       }
      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }
    }
  }
</style>
