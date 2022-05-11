<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg" :class="{'animation': runFlapCardAnimation}" v-show="ifShowFlapCard">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex:item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')" ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')" ref="right"></div>
        </div>
      </div>
    </div>
    <div class="book-card" :class="{'animation': runBookCardAnimation}" v-if="ifShowBookCard">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" v-lazy="data.cover">
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data ? data.title :''}}</div>
          <div class="content-author sub-title-medium"></div>
          <div class="content-category"></div>
        </div>
        <div class="read-btn" @click.stop="AshowBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
import { storeHomeMixin } from '@/utils/mixin'
import { flapCardList, categoryText } from '@/utils/store'

export default {
  mixins: [storeHomeMixin],
  props: {
    data: Object
  },
  data() {
    return {
      flapCardList,
      front: 0,
      back: 1,
      IntervalTime: 25,
      ifShowBookCard: false,
      ifShowFlapCard: true,
      runFlapCardAnimation: false,
      runBookCardAnimation: false
    }
  },
  methods: {
    AshowBookDetail(data){
      this.setFlapCardVisible(false)
      this.showBookDetail(data)
    },
    categoryText() {
      categoryText(this.data, this)
    },
    close() {
      this.hideBookCard()
      this.setFlapCardVisible(false)
      if (this.task) {
        clearInterval(this.task)
      }
      if (this.timeout){
        clearTimeout(this.timeout)
      }
      // this.reset()
      // this.stopFlapCardAnimation()
    },
    hideBookCard() {
      this.ifShowBookCard = false
      this.ifShowFlapCard = true
      // this.runFlapCardAnimation = false
    },
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r} ,${item.g} ,${item.b})`,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight,
        backgroundSize: item.backgroundSize
      }
    },
    rotate(index, type){
      const item = this.flapCardList[index]
      let dom
      if (type === 'front') {
        dom = this.$refs.right[index]
      } else {
        dom = this.$refs.left[index]
      }
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`
      dom.style.backgroundColor = `rgb(${item.r} ,${item._g} ,${item.b})`
    },
    reset(){
      this.front = 0
      this.back = 1
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index
        item._g = item.g
        item.rotateDegree = 0
        this.rotate(index, 'front')
        this.rotate(index, 'back')
      })
      this.runBookCardAnimation = false
      this.runFlapCardAnimation = false
    },
    flapCardRotate() {
      const frontFlapCard = this.flapCardList[this.front]
      const backFlapCard = this.flapCardList[this.back]
      // const frontRightSemiCircle = this.$refs.right[this.front]
      // const backLeftSemiCircle = this.$refs.left[this.back]
      frontFlapCard.rotateDegree += 10
      backFlapCard.rotateDegree -= 10
      // if (frontFlapCard.rotateDegree < 90) {
      //   frontFlapCard._g -= 5
      // }
      if (backFlapCard.rotateDegree < 90) {
        backFlapCard._g += 5
      }
      if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90){
        backFlapCard.zIndex += 2
      }
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
        this.next()
      }
    },
    next(){
      const frontFlapCard = this.flapCardList[this.front]
      const backFlapCard = this.flapCardList[this.back]
      frontFlapCard.rotateDegree = 0
      backFlapCard.rotateDegree = 0
      frontFlapCard._g = frontFlapCard.g
      backFlapCard._g = backFlapCard.g
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      this.front++
      this.back++
      const len = this.flapCardList.length
      if (this.front >= len) {
        this.front = 0
      }
      if (this.back >= len) {
        this.back = 0
      }
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + len) % len)
      })
      this.prepare()
    },
    prepare() {
      const backFlapCard = this.flapCardList[this.back]
      backFlapCard.rotateDegree = 180
      backFlapCard._g = backFlapCard.g - 5 * 9
      this.rotate(this.back, 'back')
    },
    startFlapCardAnimation() {
      this.prepare()
      this.task = setInterval(() => {
        this.flapCardRotate()
      }, this.IntervalTime)
    },
    stopFlapCardAnimation() {
      if (this.task) {
        clearInterval(this.task)
      }
      this.reset()
    },
    stopAnimation() {
      this.timeout = setTimeout(() => {
        this.stopFlapCardAnimation()
        this.showBookCard()
      }, 2500)
    },
    showBookCard() {
      this.ifShowBookCard = true
      this.runBookCardAnimation = true
      this.ifShowFlapCard = false
    },
    startAnimation() {
      this.runFlapCardAnimation = true
      this.startFlapCardAnimation()
      this.stopAnimation()
    }
  },
  watch: {
    flapCardVisible(v) {
      if (v) {
        this.startAnimation()
      }
    }
  }
// name: "FlapCard"
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .flap-card-wrapper {
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba( 0,0, 0, .6);
    @include center;
    @include absCenter;
    .flap-card-bg {
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      background: white;
      border-radius: px2rem(5);
      //transform: scale(0);
      //opacity: 0;
      .flap-card {
        width: px2rem(48);
        height: px2rem(48);
        //background: orange;
        @include absCenter;
        .flap-card-circle {
          width: 100%;
          height: 100%;
          display: flex;
          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
          }
          .flap-card-semi-circle-left {
            //flex: 0 0 50%;
            //width: 50%;
            //height: 100%;
            //background-color: #ffc666;
            //background-repeat: no-repeat;
            background-position: center right;
            border-radius: px2rem(24) 0 0 px2rem(24);
            transform-origin: right;
            backface-visibility: hidden;
          }

          .flap-card-semi-circle-right {
            //background-repeat: no-repeat;
            background-position: center left;
            border-radius: 0 px2rem(24) px2rem(24) 0;
            transform-origin: left;
            backface-visibility: hidden;
          }
        }
      }
    }
    .book-card {
      position: relative;
      width: 65%;
      max-width: px2rem(400);
      // height: 70%;
      box-sizing: border-box;
      border-radius: px2rem(15);
      background: white;
      &.animation {
        animation: scale .3s ease-in both;
        @keyframes scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
      .book-card-wrapper {
        width: 100%;
        height: 100%;
        margin-bottom: px2rem(30);
        @include columnTop;
        .img-wrapper {
          width: 100%;
          margin-top: px2rem(20);
          @include center;
          .img {
            width: px2rem(90);
            height: px2rem(130);
          }
        }
        .content-wrapper {
          padding: 0 px2rem(20);
          margin-top: px2rem(20);
          .content-title {
            color: #333;
            font-weight: bold;
            font-size: px2rem(14);
            line-height: px2rem(20);
            max-height: px2rem(40);
            text-align: center;
            @include ellipsis2(10)
          }
          .content-author {
            margin-top: px2rem(10);
            text-align: center;
          }
          .content-category {
            color: #999;
            font-size: px2rem(14);
            margin-top: px2rem(10);
            text-align: center;
          }
        }
        .read-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1100;
          width: 100%;
          border-radius: 0 0 px2rem(15) px2rem(15);
          margin-top: px2rem(30);
          padding: px2rem(15) 0;
          text-align: center;
          color: white;
          font-size: px2rem(14);
          background: $color-blue;
        }
      }
    }
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: 5%;
      z-index: 1100;
      width: 100%;
      @include center;
      .icon-close {
        display: inline-block;
        width: px2rem(45);
        height: px2rem(45);
        font-size: px2rem(25);
        color: white;
        background: #333;
        border-radius: 50%;
        @include center;
      }
    }
  }
</style>
