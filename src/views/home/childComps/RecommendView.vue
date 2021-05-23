<template>
  <div class="recommend">
      <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
  props:{
      recommends:{
          type:Array,
           default(){
               return []
           }
      }
  }
}
</script>

<style>
.recommend{
    display: flex;
    text-align: center;
    width: 100%;
    font-size: 16px;
    margin-top: 15px;
    border-bottom: 8px solid #eee;
    padding-bottom: 30px;
}
.recommend-item{
    flex: 10;
}
.recommend-item img{
    width: 80px;
    height: 80px;
}
.recommend-item div{
    padding-top: 15px;
}
</style>