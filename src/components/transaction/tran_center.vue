<template>
<div class='tranBox'>
    <div class="bothse">
        <trannav :title="title" ></trannav>
        <!-- <div class="echarts">
            <chart style="width:100%;" ref="chart1" :options="orgOptions" ></chart>
        </div> -->

        <div class="centerbottom">
            <div class="todaybothdata">
                <div class="todaybothdata-num">今日总交易量
                     <div>{{cont}}</div>
                </div>
               
                 <div class="todaybothdata-num">今日价格
                     <div>{{pirce}}</div>
                </div>
            </div>

            <div class="flex_both">
                <a href='javascript:;' @click='deal("/hangon?gstate=0")' class="flex_model">
                    <div><img src="../../../static/images/icon/gmay.png" /></div>
                    <div>挂买</div>
                </a>
                <a href='javascript:;' @click='deal("/hangon?gstate=1")' to="/hangon?gstate=1" class="flex_model">
                    <div><img src="../../../static/images/icon/gmai.png" /></div>
                    <div>挂卖</div>
                </a>
            </div>

            <!-- 最后一行 -->
            <!-- <a @click='deal("/transmarket")'  class="last_view">
                <div><img src="../../../static/images/icon/trans_icon.png" alt=""></div>
                <div>交易市场</div>
            </a> -->
        </div>
            <transmarket></transmarket>
        </div>
    </div>
</template>



<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import transmarket from './tran_market'
export default {

    name:'transaction',
    data(){
        return{
            title:'交易市场',
            orgOptions:{},
            cont:'', //获取的数据
            yarr:[],
            xarr:[],
            newlist:[],
            pirce:'0'
        }
    },
        components: {
        
    },
    created(){
        // this.getzheimg();

      this.$axios
        .fetchPost('/portal/C2C', {
          interface: '1000',
          module: 'Market',
          source: 'web',
          version: 'v1',
          data: {}
        })
        .then(res => {
            console.log(res)
            this.pirce = res.data.price
          this.cont= res.data.today;
        })

    },
    methods:{
        deal(url){
            let  status = this.$cookies.get('status')
          //查询认证情况
          this.$axios
            .fetchPost('/portal', {
              interface: '3000',
              module: 'User',
              source: 'web',
              version: 'v1',
              data: {}
            })
            .then(res => {
              status = res.data.status;

              if(status == -1){
                this.$dialog.confirm({
                  title: '提示',
                  message: '未通过实名认证'
                }).then(() => {
                  this.$router.push('/authentication')
                }).catch(() => {

                })
                return
              }else if(status == 0){
                this.$dialog.confirm({
                  title: '提示',
                  message: '未认证'
                }).then(() => {
                  this.$router.push('/authentication')
                }).catch(() => {

                })
                return
              }else if(status ==  1) {
                this.$dialog.confirm({
                  title: '提示',
                  message: '认证审核中。。。'
                }).then(() => {
                  this.$router.push('/authentication')
                }).catch(() => {

                })
              }else{
                this.$router.push(url)
              }


            })


        },
    },
    components:{
        transmarket:transmarket
    }
}
</script>

<style lang="less" scoped>
/deep/.nav[data-v-1fe035a7]{
    background: #0B0C21;
}
.title{
    color:#fff;
    font-weight:500;
}
.tranBox{
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background:#0B0C21;
}
.bothse{
    height: 100%;
    // overflow: auto;
    padding:44px 0 0;
    box-sizing: border-box;
    // background:rgba(0,22,114,1);
}
.echarts{
    
    margin:10px auto 20px ;
    width: 355px;
    height:240px;
    background:rgba(255,255,255,0.05);
    color: #fff;
}
.centerbottom{
    margin:0 16px  19px 16px;
}
.todaybothdata{
    height:90px;
    background:linear-gradient(180deg,rgba(86,204,242,1) 0%,rgba(47,128,237,1) 100%);
    border-radius:6px;
    box-sizing: border-box;
    padding:18px 0 18px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .todaybothdata-num{
        color: #fff;
        font-size: 16px;
        margin-right: 1rem;
    }
    .todaybothdata-right{
        color: #fff;
        font-size: 16px;
    }
}
.flex_both{
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin:10px 0;
    .flex_model{
        width:166px;
        height:58px;
        border-radius:6px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding:0 20px;
        &:first-child{
          background:linear-gradient(180deg,rgba(255,202,49,1) 0%,rgba(247,107,28,1) 100%);
        }
        &:last-child{
            background:linear-gradient(360deg,rgba(216,42,103,1) 0%,rgba(238,96,156,1) 100%);
        }
        div{
            &:first-child{
                width: 23px;
                height: 23px;
                margin-right: 10px;
                img{
                    width: 23px;
                    height: 23px;  
                }
            }
             &:last-child{
                font-size:18px;
                font-weight:500;
                color:rgba(255,255,255,1);
             }
        }
    }
}
.last_view{
    height:78px;
    background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(244,45,61,1) 100%);
    border-radius:6px;
    display:flex;
    align-items:center;
    padding:0 0 0 40px;
    div{
        &:first-child{
            width: 78px;
            height:78px;
            margin-right:40px;
            img{
                width: 78px;
                height:78px;
            }
        }
        &:last-child{
            font-size:18px;
            font-weight:500;
            color:rgba(255,255,255,1);
        }
    }
     
}
</style>
