<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
       <!-- <img v-for="item in banners" :src="item.image" :key="item.link" alt=""> -->
       <home-swiper :banners="banners"/>
       <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import {getHomeMultidata} from 'network/home'
export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      result: null
    }
  },
  created() {
    //请求多个数据
    getHomeMultidata().then(res => {
      console.log(res)
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
      //this.result=res
    })
  }
}
</script>

<style>
.home-nav{
  background-color: var(--color-tint);
}
</style>