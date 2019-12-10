<template>
    <div class="htmlBox">
        <div>
            <van-nav-bar
            title="交易详情"
            left-arrow
            @click-left="onClickLeft"
            ></van-nav-bar>
        <!-- <trannav title="交易详情" :leftj="true" :teshu='1'></trannav> -->
        <div class="bothse">
            <marketxinxi ref='child' :title='0' :islook='islook' :bothdata="bothdata"></marketxinxi>
            <div class="transmm" v-if="!$route.query.type">
            <div>买入数量</div>
            <input  v-model="amount" placeholder="请输入所需数量" />
        </div>
            <div class="buyin" v-if='!$route.query.type' @click='submit'>买入</div>
            <!-- <div class="buyin" v-if='$route.query.type' @click='sell'>出售</div> -->
            <!-- <router-link :to="'/payment?id='+id" ></router-link> -->
        </div>
        </div>
    </div>
</template>

<script>
import marketxinxi from '@/components/template/marketxinxi/marketxinxi';
export default {
    name:'marketxq',
    data(){
        return {
            id:'',//传来的id
            bothdata:{},//详情里的数据
            islook:false,
            title:0,
            amount:''
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.title = this.$route.query.title
        this.getxq();
    },
    methods:{
        //获取数据详情
        getxq(){
            var _this = this;
            _this.$axios.fetchPost('/portal/C2C',{
                interface: "1003",
                module: "Market",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id,
                }

            })
            .then(res=>{
                // console.log('详情',res.data)
                if(res.code == 0){  
                    _this.bothdata = res.data
                    console.log( _this.bothdata)
                }else if(res.code == 4800){
                    _this.$toast(res.message)
                }
            })
        },
        onClickLeft() {
            this.$router.push({path: '/transaction'})
        },
        submit() {
            console.log(this.$refs.child.chuan.safeword)
            var _this = this;
            _this.$axios.fetchPost('/portal/C2C',{
                interface: "3001",
                module: "Market",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id,
                    amount:_this.amount,
                    safeword: this.$refs.child.chuan.safeword
                }
            }).then(res => {
                console.log('新id',res)
              if(res.code == 0){
                _this.$router.push({path:'/payment',query:{id: res.data.tradeId,states:false,jiao:true}})
              }else{
                this.$toast(res.message)
              }


            })
        },
        sell () {
            this.$refs.child.handleParentClick("ssss");
            console.log(this.chuan.safeword)
            // let data={
            //     id:this.id,
            //     safeword:this.safeword
            // };
            // if(data.safeword == ''){
            //     this.$toast('请输入支付密码');
            //     return false;
            // }else if(data.safeword.length != 6){
            //     this.$toast('安全密码必须由 6 位数字组成');
            //     return false
            // }
            
            // this.$axios.fetchPost('/portal',{
            //     interface: "1007",
            //     module: "Attachment",
            //     source: "web",
            //     version: "v1",
            //     data:data
            // })
            // .then(res=>{
            //     console.log('出售',res)
            //     if(res.code == 0){
            //         this.$toast('出售成功');
            //         setTimeout(()=>{
            //             this.show = !this.show;
            //             this.page= 1, //页数
            //             this.lastId= 0, //lastid
            //             this.bodylist = [];
            //             this.getrecord();
            //         },1300)
            //     }else if(res.code >= 4800 && res.code < 4900){
            //         this.$toast(res.message)
            //     }
            // })
        }
    },
    components:{
        marketxinxi
    }   
}
</script>

<style lang="less" scoped>
.van-nav-bar{
    background: #0B0C21;
    color: #fff;
}
.van-nav-bar__title{
    color: #fff;
}
.van-icon{
    color: #fff;
}
[class*=van-hairline]::after{
    border: none;
}
.htmlBox{
    // border:1px solid red;
    height: 100%;
    background:#0B0C21 ;
    // margin-bottom: 50px;
}
.bothse{
    // height: 100vh;
    box-sizing: border-box;
    // padding:40px 0 36px;
    // border: 1px solid transparent;
    background:#0B0C21;
    a{
        display: block;
    }
}
.transmm{
    margin-top:10px;
    padding:0 16px;
    height:44px;
    align-items:center;
    display: flex;
    background:#1D1C3B;

    div{
        &:first-child{
            font-size:14px;
            font-weight:400;
            color:rgba(255,255,255,1);
            margin-right:20px;
        }
        
    }
    input{
        border:none;
        background:#1D1C3B;
        font-size:14px;
        font-weight:400;
        color:#fff;
    }
}
.buyin{
  margin:52px 16px 30px;
  line-height: 44px;
  border-radius:8px;
  background:linear-gradient(180deg,#494EFE 0%,#0900F8 100%);
// opacity:0.79;
  text-align: center;
  color:#fff;
  font-size: 17px;
}
</style>
