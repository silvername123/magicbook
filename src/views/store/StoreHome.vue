<template>
<div class="store-home">
  <search-bar></search-bar>
  <flap-card :data="random"></flap-card>
  <scroll :top="scrollTop" :bottom="scrollBottom" @onScroll="onScroll" ref="scroll">
    <div class="banner-wrapper">
      <img class="banner-img" :src="banner">
    </div>
    <guess-you-like :data="guessYouLike"></guess-you-like>
    <recommend :data="recommend"></recommend>
    <featured :data="featured" :titleText="$t('home.featured')" :btn-text="$t('home.seeAll')"></featured>
    <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
      <category-book :data="item"></category-book>
    </div>
    <category class="categories" :data="categories"></category>
  </scroll>
  <select-menu></select-menu>
</div>
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
import SelectMenu from '@/components/home/SelectMenu'
import { home } from '@/api/store'
import Scroll from '@/components/common/Scroll'
import { storeHomeMixin } from '@/utils/mixin'
import FlapCard from '@/components/home/FlapCard'
import GuessYouLike from '@/components/home/GuessYouLike'
import Recommend from '@/components/home/Recommend'
import Featured from '@/components/home/Featured'
import CategoryBook from '@/components/home/CategoryBook'
import Category from '@/components/home/Category'

export default {
  mixins: [storeHomeMixin],
// name: "StoreHome"
  components: {
    Category,
    CategoryBook,
    Featured,
    Recommend,
    GuessYouLike,
    FlapCard,
    Scroll,
    SelectMenu,
    SearchBar
  },
  data() {
    return {
      scrollTop: 94,
      scrollBottom: 50,
      random: null,
      banner: '',
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null
    }
  },
  methods: {
    onScroll(offsetY){
      this.setOffsetY(offsetY)
      if (offsetY > 0){
        this.scrollTop = 52
      } else {
        this.scrollTop = 94
      }
      this.$refs.scroll.refresh()
    }
  },
  mounted() {
    home().then(response => {
      if (response && response.status === 200){
        const data = response.data
        const randomIndex = Math.floor(Math.random() * data.random.length)
        // console.log(randomIndex)
        this.random = data.random[randomIndex]
        // console.log(data)
        // console.log(this.random)
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .store-home {
    width: 100%;
    height: 100%;
    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: px2rem(150);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .recommend {
      margin-top: px2rem(20);
    }
    .featured {
      margin-top: px2rem(20);
    }
    .category-item-wrapper{
      margin-top: px2rem(20);
    }
    .categories {
      margin-top: px2rem(20);
    }
  }
</style>
