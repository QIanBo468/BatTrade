<template>
    <div class="box">
        <div class="bothse">
            <trannav title="付款" :leftj="true" ></trannav>
            <marketxinxi :title='1' :state='state' :islook='islook'  ref="dianji" @imgshow='imgshow' :bothdata="bothdata"></marketxinxi>


            <div class="buyin" v-if="state && $route.query.tabstate != 1 && bothdata.status==1 && bothdata.type ==1"  @click="qdfu">确认付款</div>
            <div class="buyins" v-if="bothdata.type ==-1 && (bothdata.status ==2 ||bothdata.status ==1)  ">
                <div :class="{'stop-mark':isok===1}" @click="qued">确认</div>
                <div @click="tousu">投诉</div>
            </div>

          <div class="buyin" v-if="bothdata.type ==1 &&bothdata.status ==2">
            <div  :class="isok?stopMark:''"  @click="tousu">投诉</div>
          </div>
        </div>

        <van-popup v-model="show">
            <div class="tan"><img :src="tu" alt=""></div>
            <div class="quxiao" @click="show =false"><img src="../../../static/images/icon/quxiao.png" alt=""></div>
        </van-popup>
    </div>
</template>

<script>
import marketxinxi from '@/components/template/marketxinxi/marketxinxi';
export default {
    name:'payment',
    data(){
        return{
            state:true ,//状态
            show:false,//弹框显隐
            tu:'',//弹出显示的图片
            title:'',
            id:'',//传来的id
            bothdata:{},//详情里的数据
            islook:false,
            safepwd:'',
            isok:0
        }
    },
    created(){

        this.id = this.$route.query.id;
        console.log(this.id)
        // if( this.$route.query.states == true){
        //     this.state = true;
        //     this.getxq();
        // }else{
        //     this.state = false;
        //     this.getjyxq()
        // }   
        if( this.$route.query.states == false){
            this.state = false;
            this.getjyxq()   //交易详情
        }else{
            this.state = true;
            this.getxq();   //数据详情（买入里的）
        }

      
    },
    methods:{
        // 获取交易详情
        getjyxq(){
            var _this = this;
            _this.$axios.fetchPost('/portal/C2C',{
                interface: "1002",
                module: "Trade",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id
                }

            })
            .then(res=>{
                console.log('详情',res.data)
                console.log( _this.state)
                if(res.code == 0){  
                    _this.bothdata = res.data
                    if(res.data.account && res.data.account.length >3){
                        _this.islook=true;
                    }
                    console.log( _this.state)
                }else if(res.code == 4800){
                    _this.$toast(res.message)
                }
            })
        },
        //获取数据详情
        getxq(){
            var _this = this;
            _this.$axios.fetchPost('/portal/C2C',{
                interface: "1002",
                module: "Trade",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id
                }

            })
            .then(res=>{
                console.log('详情',res.data)
                if(res.code == 0){  
                    _this.bothdata = res.data
                    if(res.data.account && res.data.account.length >3){
                        _this.islook=true;
                    }
                    console.log( _this.state)
                }else if(res.code == 4800){
                    _this.$toast(res.message)
                }
            })
        },




        //查看图片
        imgshow(val){
            console.log(val);

            this.tu = val;
            this.show = true
        },
        // 确实付款
        qdfu(){
            this.$refs.dianji.upqd();
        },
        //确认付款后的确认
        changefuk(){
            if(this.bothdata.onOffer == 3){
                this.$router.go(-1)
            }else{
                this.state =!this.state;
            }
             
        },
        //点击确定
        qued(){
            var _this = this;
            _this.isok = 1;
            // _this.$refs.dianji.tousuque()
            _this.$axios.fetchPost('/portal/C2C',{
                interface: "2001",
                module: "Trade",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id
                }
            })
            .then(res=>{
                if(res.code == 0){
                  _this.isok = 0;
                    this.$dialog.alert({
                        message: res.message
                    });
                  this.$router.go(-1)
                }else if(res.code == 4800 ){
                    _this.$toast(res.message)
                }
            })
        },
        //点击投诉
        tousu(){
            this.$router.push({ path: '/tousu', query: {id:this.id}})
            // var _this = this;
            // _this.$axios.fetchPost('/portal',{
            //     interface: "1006",
            //     module: "Attachment",
            //     source: "web",
            //     version: "v1",
            //     data:{
            //         id:_this.id
            //     }
            // })
            // .then(res=>{
            //     console.log('点击投诉',res)
            //     if(res.code == 0){
            //         _this.$toast(res.message)
            //     }else if(res.code == 4800 ){
            //         _this.$toast(res.message)
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

  .stop-mark{
    background: #7d7e80!important;
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

.box{
    width: 100%;
    min-height: 100%;
    background:#1D1C3B;
}
.van-popup--center {
    background: #040A24;
    overflow: hidden;
}
.bothse{
    padding:40px 0 36px;
    border: 1px solid transparent;
    // min-height: 100%;
    box-sizing: border-box;
    
    a{
        display: block;
    }
}
.buyin{
    margin:35px 16px 0;
    line-height: 44px;
    border-radius:20px;
    /*background:linear-gradient(180deg,#44A5D8 0%,#276CD4 100%);*/
  background:linear-gradient(180deg,#494EFE 0%,#0900F8 100%);
    opacity:0.79;
    text-align: center;
    color:#fff;
        div {


          border-radius: 22px;
          background: linear-gradient(180deg, #44A5D8 0%, #276CD4 100%);
          opacity: 0.79;

        }



}
.buyins{

    margin:115px 16px 0;
    line-height: 44px;
    text-align: center;
    color:#fff;
    display: flex;
    justify-content: space-between;
    div{
        &:first-child{    
            width:162px;
            border-radius:22px;
            background:linear-gradient(180deg,#44A5D8 0%,#276CD4 100%);
            opacity:0.79;
        }
        &:last-child{
            width:162px;
            background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
            border-radius:22px;
            opacity:0.79;
        }    
    }
}
.tan{
    width:290px;
    /*height:386px;   */
    background: #fff;
    img{
        width:290px;
       /* height:386px; */
    }   
}
.quxiao{
    width: 36px;
    height: 36px;
    margin:16px auto 0;
    img{
        width: 36px;
        height:36px;
    }
}

</style>
