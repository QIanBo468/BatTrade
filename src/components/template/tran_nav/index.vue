<template>
    <div>
        <van-nav-bar class="nav" @click-left="goback"  :border="false">
            <van-icon slot="left" class="back" v-if="leftj"><img src="../../../../static/images/icon/leftback.png" alt=""></van-icon>
            <van-icon slot="title" class="title" >{{title}}</van-icon>
        </van-nav-bar>
    </div>
</template>



<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        leftj:{
            type:Boolean,
            default:false
        },
        teshu:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
        }
    },
    methods:{
        // 返回上一页面
        goback(){
            if(this.teshu == 1){
                this.$router.replace({path:'/transmarket',query:{lstate:1}})
            }else{
                this.$router.go(-1)
            }
            
        }
    },
    components:{

    }
}
</script>

<style lang="less" scoped>
.nav{
    background:#0B0C21;   
    position: fixed;
    top:0; 
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.title{
    color:#fff;
    font-weight:500;
    font-size: 18px;
}
.back{
    width:30px;
    height:30px;
    img{
        width: 30px;
        height:30px; 
    }
}
</style>