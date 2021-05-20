<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <swiper>
         <swiper-item v-for="item in banners" :key="item.title">
           <a :href="item.link">
             <img :src="item.image" alt="">
           </a>
         </swiper-item>
       </swiper>
       <!-- <img v-for="item in banners" :src="item.image" :key="item.link" alt=""> -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  components: {
    NavBar,
    Swiper,
    SwiperItem
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