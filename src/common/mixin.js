import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin={
    mounted(){
        const refresh=debounce(this.$refs.scroll.refresh,500)
        //监听item中的图片加载完成
        this.itemImgListener=()=>{
         // console.log('---fdfd')
         // this.$refs.scroll.refresh();
         refresh()
       }
       this.$bus.$on('itemImgLoad',this.itemImgListener)
    //    console.log('我是混入中的内容')
    }
}

export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop:false
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0);
         },
         listenShowBackTop(position){
            this.isShowBackTop=(-position.y)>1000
         }
    }
}