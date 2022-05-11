<template>
    <div class="shelf-search-wrapper" :class="{'search-top': ifInputClicked}">
      <div class="shelf-search" :class="{'search-top': ifInputClicked}">
        <div class="search-wrapper">
          <div class="icon-search-wrapper">
            <span class="icon-search icon"></span>
          </div>
          <div class="search-input-wrapper">
            <input class="search-input" type="text" :placeholder="$t('shelf.search')"
                   @click="onSearchClick" v-model="searchText" ref="searchInput">
          </div>
          <div class="icon-clear-wrapper" @click="clearSearchText"  v-show="searchText.length> 0">
            <span class="icon-close-circle-fill"></span>
          </div>
        </div>
        <div class="icon-clock-wrapper" style="visibility:hidden" v-if="!ifInputClicked">
          <span class="icon-cn icon"></span>
          <span class="icon-en icon"></span>
        </div>
        <div class="cancel-btn-wrapper" @click="onCancelClick" v-else  >
          <span class="cancel-btn">{{$t('shelf.cancel')}}</span>
        </div>
      </div>
      <div class="shelf-search-tab-wrapper"></div>
    </div>
</template>

<script>
import { setLocalStorage } from '@/utils/localStorage'
import { storeShelfMixin } from '@/utils/mixin'

export default {
  mixins: [storeShelfMixin],
  computed: {
    lang() {
      // console.log(this.$i18n.locale)
      return true
    }
  },
  data() {
    return {
      searchText: '',
      ifInputClicked: false
    }
  },
  methods: {
    clearSearchText() {
      this.searchText = ''
    },
    switchLocale() {
      if (this.lang === 'en'){
        this.$i18n.locale = 'cn'
      } else {
        this.$i18n.locale = 'en'
      }
      // eslint-disable-next-line no-undef
      setLocalStorage('locale', this.$i18n.locale)
    },
    onSearchClick(){
      this.ifInputClicked = true
      this.setShelfTitleVisible(false)
    },
    onCancelClick() {
      this.ifInputClicked = false
      this.setShelfTitleVisible(true)
    }
  }
// name: "ShelfSearch"
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-search-wrapper {
  position: relative;
  z-index: 105;
  width: 100%;
  height: px2rem(48);
  font-size: px2rem(16);
  background: white;
  //box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
  &.search-top {
    position: fixed;
    top: 0;
    left: 0;
  }
  .shelf-search {
    position: absolute;
    top: px2rem(42);
    left: 0;
    z-index: 105;
    width: 100%;
    height: px2rem(52);
    display: flex;
    transition: all .4s linear;
    &.search-top {
      top: 0;
    }
      .search-wrapper {
        display: flex;
        flex: 1;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);

        .icon-search-wrapper {
          flex: 0 0 px2rem(22);
          @include right;
          .icon-search {
            font-size: px2rem(12);
          }
        }

        .search-input-wrapper {
          flex: 1;
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include center;

          .search-input {
            width: 100%;
            font-size: px2rem(14);
            border: none;
            color: #333;

            &:focus {
              outline: none;
            }

            &::-webkit-input-placeholder {
              font-size: px2rem(14);
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {
          flex: 0 0 px2rem(24);
          @include left;
          .icon-close-circle-fill {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .icon-clock-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
        .icon-cn, .icon-en {
          font-size: px2rem(22);
          color: #666;
        }
      }
      .cancel-btn-wrapper {
        flex: 0 0 px2rem(55);
        @include center;

        .cancel-btn {
          font-size: px2rem(14);
          color: $color-blue;
        }
      }

  }
}
</style>
