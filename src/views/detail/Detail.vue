<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar'
import {getDetail,Goods} from 'network/detail'
import DetailSwiper from './childcomps/DetailSwiper'

export default {
  name:"Detail",
  components: { DetailNavBar,DetailSwiper },
  data(){
      return{
          iid:null,
          topImages:[],
          goods:{}
      }
  },
  created(){
    //1.保存传入的iid
      this.iid=this.$route.params.iid
      console.log('-------'+ this.iid)
    //2.根据iid请求数据
       getDetail(this.iid).then(res=>{
         //1.获取顶部的图片轮播数据
        // console.log(res)
        const data=res.result;
        this.topImages = data.itemInfo.topImages;
        //2.获取商品信息
        this.goods=new Goods(data.itemInfo,data.coloums,data.shopInfo.services)
       })
  },
  methods:{
    update(){
      
    }
  }
  
}
</script>

<style scoped>

</style>