<template>
  <div id="home">
     <nav-bar>
       <div slot="center">购物街</div>
     </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
export default {
  components: {
    NavBar
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

</style>