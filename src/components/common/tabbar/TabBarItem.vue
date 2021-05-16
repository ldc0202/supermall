<template>
<div class="tab-bar-item" @click="itemClick">
     <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    
</div>
  <!-- <div class="tab-bar-item">
        <img src="../../assets/img/tabbar/home.svg" alt="">首页</div>
      <div class="tab-bar-item">
          <img src="../../assets/img/tabbar/category.svg" alt="">分类</div>
      <div class="tab-bar-item">
          <img src="../../assets/img/tabbar/che.svg" alt="">购物车</div>
      <div class="tab-bar-item">
          <img src="../../assets/img/tabbar/my.svg" alt="">我的</div> -->
</template>

<script>
export default {
  props: {
      path: String,
      activeColor:{
          type: String,
          default: '#ff0000'
      }
  },
  data(){
      return{
          //isActive:true
      }
  },
  computed: {
    isActive(){
        return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
        return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
      itemClick(){
        // console.log('itemClick')
        this.$router.replace(this.path)
        }
      }
}
</script>

<style>
.tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    margin-top: 3px;
  }

</style>