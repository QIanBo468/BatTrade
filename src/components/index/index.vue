<template>

    <div id="index">
        <div class="indexbox">
        <nav>行情</nav>
          <van-list @load="onLoad" v-model="loading" :finished="finished">

        <div class="indexlist"   v-for="(item, index) of list" :key="index" >
            <div class="listtitle" style="width: 25%;">
                <div class="listname">
                    <h3>{{item.name}}/</h3><span>{{item.quote}}</span>
                </div>
                <span  style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 80%">交易量: {{item.amount}}</span>
            </div>
            <div class="jiage">
                <h3 style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 90%">{{item.close}}</h3>
                <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 70%">≈￥{{item.closeCNY}}</span>
            </div>
            <div class="amount" v-if="item.floatRate >0">
                <div class="amount-btn">{{item.floatRate}}</div>
            </div>
          <div class="amount" v-else="item.floatRate<0">
            <div class="amount-btn btn-low">{{item.floatRate}}</div>
          </div>
        </div>
          </van-list>
        </div>
    </div>



</template>
<script>
import Barrage from 'barrage-ui';
import example from 'barrage-ui/example.json';

import { Loading } from 'vant';
import { Toast } from 'vant';
import text from '../text'
export default {
    data () {
        return {
            active: 0,
            text: '',
          loading: false,
          finished: false,
            list: [
            ],
            userList: [
                {
                    to: '/earnings',
                    icon: './static/images/index/earnings.png',
                    title: '我的收益'
                },
                {
                    to: '/wallet',
                    icon: './static/images/index/wallet.png',
                    title: '我的钱包'
                },
                {
                    to: '/inviteFriends',
                    icon: './static/images/index/invite.png',
                    title: '邀请好友'
                },
                {
                    to: '/contactUs',
                    icon: './static/images/index/connection.png',
                    title: '联系我们'
                }
            ]
            ,
            classList: [],
            rateObj: {},
        }
    },
    component: {
        text
    },
    mounted() {
    },
    created () {
      console.log(this.$cookies.get('accessToken'));
    },
    methods : {

      onLoad (){

          this.$axios.fetchPost('/portal/Digiccy',
            {
              source: "web",
              version: "v1",
              module: "Market",
              interface: "1000",
              data: {}
            }).then(res => {
                console.log(res)
            if (res.success) {
              let text = []
              this.list = res.data.list;
              this.finished = true
              console.log(this.list)
              //this.createDM ()
            }
            else {
              this.finished = true
            }
            this.loading = false
          })

      },

        message (obj) {
            if(obj.to){
                let  status = this.$cookies.get('status')
                if(status == -1){
                    this.$dialog.confirm({
                        title: '提示',
                        message: '未通过实名认证'
                    }).then(() => {
                        this.$router.push('/authentication')
                    }).catch(() => {

                    })
                    return
                }else if(status == -2){
                    this.$dialog.confirm({
                        title: '提示',
                        message: '未认证'
                    }).then(() => {
                        this.$router.push('/authentication')
                    }).catch(() => {
                        
                    })
                    return 
                }else if(status ==  0) {
                    Toast('认证已提交，后台审核中')
                    return
                }
                this.$router.push(obj.to)
            }else{
                Toast('正在开发中，敬请期待')
            }
        },
        deal(to) {
            let  status = this.$cookies.get('status')
            if(status == -1){
                this.$dialog.confirm({
                    title: '提示',
                    message: '未通过实名认证'
                }).then(() => {
                    this.$router.push('/authentication')
                }).catch(() => {

                })
                return
            }else if(status == -2){
                this.$dialog.confirm({
                    title: '提示',
                    message: '未认证'
                }).then(() => {
                    this.$router.push('/authentication')
                }).catch(() => {
                    
                })
                return 
            }else if(status ==  0) {
                Toast('认证已提交，后台审核中')
                return
            }
            this.$router.push(to)
        },
        createDM () {
            var that = this
            const barrage = new Barrage({
            container: document.getElementById('box'), // 父级容器
            data: that.classList, // 弹幕数据
            config: {
                // 全局配置项
                duration: 15000, // 弹幕循环周期(单位：毫秒)
                defaultColor: '#e6e6e6', // 弹幕默认颜色
                fontSize: 14,
            },
            avoidOverlap: false,
            });

            // 播放弹幕
            barrage.play();
        }
    }
}
</script>
<style lang="less">
    .tabBox{
        .van-grid-item__content{
            padding: 5px 6px;
        }
    }
    .connected .van-grid-item__content{
        padding: 0;
    }
</style>
<style lang="less" scoped>
#index{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #0B0C21;
    color: #fff;

    nav{
        font-size: 18px;
        margin-top: 15px;
        margin-bottom: 19px;
    }
    .indexbox{
        height: 100%;
        // padding: 0 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .indexlist{
      text-align: center;
        width: 95%;
        height: 80px;
        background: #191B4B;
        border-radius: 6px;
        margin-left: 2%;
        margin-bottom: 10px;
        padding: 12px 14px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;
        box-sizing: border-box;
        .listtitle{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .listname{
                
                display: flex;
                align-items: center;
                box-sizing: border-box;
                h3{
                    color: #ffffff;
                    font-size: 18px;
                    margin: 0;
                    margin-bottom: 12px;
                }
                span{
                    color: #E3E3E9;
                    font-size: 11px;
                    margin-bottom: 11px;
                }
            }

        }
        .jiage{
            flex: 1;
             display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
                h3{
                    color: #ffffff;
                    font-size: 18px;
                    margin: 0;
                    margin-bottom: 12px;
                }
                span{
                    color: #E3E3E9;
                    font-size: 11px;
                }
        }
        .amount{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .amount-btn{
                width: 80px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                background: linear-gradient(90deg ,#494EFE 0%, #0900F8 100%);
                border-radius: 18px;
            }
        }
        .btn-low{
          background: linear-gradient(90deg ,#f00 0%, #ee609c 100%)!important;
        }
    }
}

.van-list{
    box-sizing: border-box !important;
    width: 100%;
}








.hold{
    background: #f8f8f8;
    height: 10px;
}
.banner{
    width: 100%;
    height: 200px;
    background: url('../../../static/images/index/banner.png');
    background-size: 100% 100%;
    .bannerTitle{
        padding-top: 29px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        color: #fff;
        font-size: 18px;
    }
}
.imgIcon{
    width:22px;
    height: 22px;
}
.tabBox{
    margin: 20px 0 29px;
}
.present{
    height: 154px;
    padding: 5px 16px;
    box-sizing: border-box;
    .title{
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #eee;
        font-size: 18px;
    }
    .box_sm{
        .list{
            height: 22px;
            display: flex;
            align-items: center;
            font-size: 15px;
            padding: 15px 0;
            img{
                height: 22px;
                width: 22px;
                margin-right: 10px;
            }
            .red{
                color: #FB4B48;
                margin-left: 6px;
            }
        }
    }
}
.connected{
    // width: 343px;
    // padding: 18px 16px;
    margin: 10px 0;
}
</style>
