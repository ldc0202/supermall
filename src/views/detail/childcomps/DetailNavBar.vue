<template>
  <div>
      <nav-bar>
          <div slot="left" @click="backHandler">
              <img class="icon" src="~assets/img/home/leftarrow.png" alt="">
          </div>
          <div slot="center" class="title" >
              <div v-for="(item,index) in titles" 
              :key="index" class="item-title"
              @click="itemClick(index)"
               :class="{active:index===currentIndex}">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar'
export default {
  components: { NavBar },
  data(){
      return{
          titles:['商品','参数','评论','推荐'],
          currentIndex:0
      }
  },
  methods:{
      itemClick(index){
         this.currentIndex=index;
         this.$emit('titleClick',index)
      },
      backHandler(){
          this.$router.back()
      }
  }
}
</script>

<style scoped>
.title{
    display:flex;
    font-size: 13px;
}
.item-title{
    flex: 1;
}
.active{
     color: red;
}
.icon{
    margin-top: 10px;
    width: 25xp;
    height: 25px;
}
</style>