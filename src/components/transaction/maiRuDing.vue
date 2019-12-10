<template>
  <div id="marketxinxi">
    <!-- <trannav title="交易详情" :leftj="true" v-if="title == 0"></trannav> -->
    <!-- <trannav title="付款" :leftj="true" v-if="title == 1"></trannav> -->
    <div class="marketmod markettop" v-if="bothdata">
      <!-- v-if='bothdata'-->
      <div class="list_model first_div">
        <div>单号：{{bothdata.orderNo}}</div>
        <div>{{bothdata.offerChinese}}</div>
      </div>
      <div class="list_model">
        <div>交易数量</div>
        <div>{{bothdata.amount}}BAT</div>
        <!-- v-if="!$route.query.mairu" -->
        <!-- <div v-else style="float:right; justify-content: end;  text-align: right;">  <input style="width:40%; background:transparent;border:none; text-align: right; border-bottom: 1px solid #eeeeee;" type="text" v-model="bothdata.amount"> &nbsp;&nbsp; &nbsp;BAT</div> -->
      </div>

      <div class="list_model">
        <div>单价</div>
        <div>{{bothdata.unitPrice}}</div>
      </div>
      <div class="list_model">
        <div>单价</div>
        <div>{{bothdata.unitPrice}}</div>
      </div>
      <div class="list_model maijia">
        <div>售价</div>
        <div>{{bothdata.price}}</div>
      </div>
    </div>
    <!-- 卖家信息 -->
    <!-- v-if="bothdata.seller" -->
    <div class="marketmod">
      <div class="list_model">
        <div>卖家昵称</div>
        <div>{{bothdata.seller.nickname}}</div>
      </div>

      <div class="list_model">
        <div>卖家手机号</div>
        <div>{{bothdata.seller.mobile}}</div>
      </div>
    </div>
    <!-- <div class="marketmod" v-if='$route.query.type && bothdata.buyer'>
            <div class="list_model">
                <div>买家昵称</div>
                <div>{{bothdata.buyer.nickname}}</div>
            </div>

            <div class="list_model">
                <div>买家手机号</div>
                <div>{{bothdata.buyer.mobile}}</div>
            </div>
    </div>-->
    <!-- 卖家账号 -->
    <div class="marketmod lastdiv">
      <!-- v-if='!$route.query.type   v-if='!$route.query.type && bothdata.account '' -->
      <div class="maihome">卖家账号</div>
      <!-- <div class="xincont" v-if="islooks == true? index<3:true" v-for="(item,index) in bothdata.account" :key="index">
              <div class="contimg"><img :src="item.type == 1? fubao:item.type == 2? wx:yh " alt=""></div>
              <div class="cont_ent">
                <div>账号名称：{{item.realName}}</div>
                <div>账号：{{item.account}}</div>
                <div>账号类型：{{item.typeName}}</div>
                <div v-if="item.type == 0">账号类型：{{item.bankName}}</div>
                <div @click="$emit('imgshow',item.qrCode)" v-if="title == 1&& item.qrCode !=null" class="zfphoto"><img :src="item.qrCode" alt=""></div>
              </div>
      </div>-->

      <div class="xincont" v-if="Object.keys(bothdata.account.wechat).length > 0">
        <div class="contimg">
          <img :src="wx" alt />
        </div>
        <div class="cont_ent">
          <div>账号名称：{{bothdata.account.wechat.realName}}</div>
          <div>账号：{{bothdata.account.wechat.account}}</div>
          <div>账号类型：微信支付</div>
          <div
            @click="$emit('imgshow',bothdata.account.wechat.qrCode)"
            v-if="title == 1&& bothdata.account.wechat.qrCode !=null"
            class="zfphoto"
          >
            <img :src="bothdata.account.wechat.qrCode" alt />
          </div>
        </div>
      </div>

      <div class="xincont" v-if="Object.keys(bothdata.account.alipay).length > 0">
        <div class="contimg">
          <img :src="fubao" alt />
        </div>
        <div class="cont_ent">
          <div>账号名称：{{bothdata.account.alipay.realName}}</div>
          <div>账号：{{bothdata.account.alipay.account}}</div>
          <div>账号类型：支付宝支付</div>
          <div
            @click="$emit('imgshow',bothdata.account.alipay.qrCode)"
            v-if="title == 1&& bothdata.account.wechat.qrCode !=null"
            class="zfphoto"
          >
            <img :src="bothdata.account.alipay.qrCode" alt />
          </div>
        </div>
      </div>
      <div class="xincont" v-if="Object.keys(bothdata.account.bankCard).length > 0">
        <div class="contimg">
          <img :src="yh" alt />
        </div>
        <div class="cont_ent">
          <div>账号名称：{{bothdata.account.bankCard.realName}}</div>
          <div>账号：{{bothdata.account.bankCard.account}}</div>
          <div>账号类型：{{bothdata.account.bankCard.bankName}}</div>
        </div>
      </div>

      <div class="lookmore" v-if="islook" @click="qiehuanlook">查看更多</div>
      <!-- <div class="buyin" v-if="title == 0">买入</div> -->
    </div>
    <!-- 买家信息 -->
    <!-- <div class="marketmod"  v-if="title == 1&& bothdata.buyer">
                <div class="list_model">
                    <div>买家昵称</div>
                    <div>{{bothdata.buyer.nickname}}</div>
                </div>

                <div class="list_model">
                    <div>买家手机号</div>
                    <div>{{bothdata.buyer.mobile}}</div>
                </div>
    </div>-->
    <!-- 上传支付凭证 -->
    <div class="uploadpz">
      <!--v-if="title == 1 && ($route.query.tabstate != 1) "-->
      <div>上传支付凭证</div>
      <div v-if="state && bothdata.type==1 && bothdata.status!=3 && bothdata.status!=2">
        <van-uploader
          v-model="fileList"
          multiple
          preview-size="100"
          :max-count="1"
          :after-read="afterRead"
        />
      </div>
      <div v-if="chuan.voucher!=''&&state!=true">
        <img :src="chuan.voucher" alt />
      </div>
      <div v-if="bothdata.voucher&&bothdata.status!=1" @click="$emit('imgshow',bothdata.voucher)">
        <img :src="bothdata.voucher" alt />
      </div>
    </div>
    <!-- <div class="transmm" v-if="$route.query.type && bothdata.status!=2">
            <div>卖出数量</div>
            <input  v-model="bothdatas.amount" placeholder="请输入所需数量" />
    </div>-->
    <!-- 交易密码 -->
    <div class="transmm">
      <div>交易密码</div>
      <input type="password" v-model=" chuan.safeword" placeholder="请输入交易密码" />
    </div>
    <!-- <div class="transmm" v-if="$route.query.type && bothdata.status!=2">
            <div>交易密码</div>
            <input type="password" v-model="chuan.safeword" placeholder="请输入交易密码" />
    </div>-->

    <!-- <van-overlay  :show="show" />
        <div class="share" v-if="show">
            <van-loading class="quzhong" color="#fff" size="50" />
        </div> 
        <div class="buyin" v-if='$route.query.type' @click='sell'>出售</div>
    <div class="buyin" v-if='$route.query.type == 2' @click='sell'>买入</div>-->
  </div>
</template>

<script>
export default {
  name: "marketxinxi",
  props: {
    title: 0, //0 交易详情 1 付款
    state: true, //true  需要输入交易密码
    islook: false, //true显示，false不显示
    bothdata: {},

    islook: true
  },

  data() {
    return {
      wx: ".../../static/images/icon/weixin.png",
      fubao: ".../../static/images/icon/zhifubao.png",
      yh: ".../../static/images/icon/yinhangka.png",
      fileList: [],
      chuan: {
        id: "",
        voucher: "",
        amount: "",
        safeword: ""
      },
      bothdatas: {},
      islooks: true,
      show: false
    };
  },
  created() {
    this.bothdatas = this.bothdata;
    console.log(this.$route.query.type);
  },
  mounted() {},
  destroyed() {
    Object.assign(this.$data.chuan, this.$options.data().chuan);
  },
  methods: {
    // 切换look
    qiehuanlook() {
      this.islooks = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file);
      let cont = new FormData();
      cont.append("file", file.file);
      this.show = true;
      var _this = this;

      _this.$axios.fetchPost("/upload", cont).then(res => {
        console.log("图片上传", res);
        if (res.code == 0) {
          let ss = {
            url: res.data.file
          };
          _this.chuan.voucher = res.data.file;
          _this.chuan.id = _this.bothdata.id;
          _this.chuan.amount = _this.bothdata.amount;
          _this.show = false;
        } else {
          _this.$dialog
            .confirm({
              title: "",
              showCancelButton: false,
              message: "上传失败，请重新上传"
            })
            .then(() => {
              // on confirm
              _this.fileList = [];
              _this.show = false;
            });
          _this.$toast(res.message);
        }
      });
    },
    sell() {
      let data = {
        id: this.$route.query.id,
        safeword: this.chuan.safeword,
        amount: this.bothdatas.amount
      };
      // if(data.safeword == ''){
      //     this.$toast('请输入支付密码');
      //     return false;
      // }else if(data.safeword.length != 6){
      //     this.$toast('安全密码必须由 6 位数字组成');
      //     return false
      // }
      // console.log(data)
      this.$axios
        .fetchPost("/portal/C2C", {
          interface: "3000",
          module: "Market",
          source: "web",
          version: "v1",
          data: data
        })
        .then(res => {
          console.log("出售", res);
          if (res.code == 0) {
            this.$toast("出售成功");
            setTimeout(() => {
              // this.show = !this.show;
              // this.page= 1,
              // this.lastId= 0,
              // this.bodylist = [];
              this.$router.push("transaction");
              // this.getrecord();
            }, 1000);
          } else if (res.code >= 4800 && res.code < 4900) {
            this.$toast(res.message);
          }
        });
    },
    // 有投诉的确认
    // tousuque(){
    //     var _this = this;
    //     if(_this.bothdata.onOffer == 3){
    //         if(_this.chuan.voucher == ''){
    //             _this.$toast('请上传支付凭证');
    //             return false;
    //         }
    //     }
    //     _this.$axios.fetchPost('/portal',{
    //         interface: "1005",
    //         module: "Attachment",
    //         source: "web",
    //         version: "v1",
    //         data:{
    //             id:_this.chuan.id
    //         }
    //     })
    //     .then(res=>{
    //         if(res.code == 0){
    //             this.$dialog.alert({
    //                 message: res.message
    //             }).then(() => {});
    //         }else if(res.code == 4800 ){
    //             _this.$toast(res.message)
    //         }
    //     })
    // },
    // 需提交的 方法
    upqd() {
      var _this = this;
      if (_this.chuan.voucher == "") {
        _this.$toast("请上传支付凭证");
        return false;
      } else if (_this.chuan.safeword == "") {
        _this.$toast("请输入支付密码");
        return false;
      } else if (_this.chuan.safeword.length != 6) {
        this.$toast("安全密码必须由 6 位数字组成");
        return false;
      }
      _this.$axios
        .fetchPost("/portal/C2C", {
          interface: "2000",
          module: "Trade",
          source: "web",
          version: "v1",
          data: _this.chuan
        })
        .then(res => {
          console.log("提交的方法", res);
          if (res.code == 0) {
            _this.$toast(res.message);
            setTimeout(() => {
              _this.$parent.changefuk();
            }, 1200);
          } else if (res.code >= 4800 && res.code < 4900) {
            _this.$toast(res.message);
          }
        });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.first_div[data-v-7c382fe0] {
  border: none;
}

#marketxinxi {
  width: 100%;
  height: 100%;
  background: #0b0c21;
  /*padding-bottom: 50px;*/
}
.bothse {
  height: 100vh;
  background: #0b0c21;
}
.marketmod {
  margin: 10px 0 0;
  background: #1d1c3b;

  padding: 0 16px;
}

.list_model {
  height: 40px;
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.first_div {
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #253786;
  div:first-child {
    color: rgba(216, 216, 216, 1);
  }
  div:last-child {
    color: #f00;
  }
}
// .maijia{
//     color:rgba(248,77,77,1);
// }
.lastdiv {
  padding: 20px 16px 36px;
  background: #1d1c3b;
}
.maihome {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 10px;
  color: rgba(255, 255, 255, 1);
}
.xincont {
  margin: 0 0 20px;
  display: flex;

  .contimg {
    width: 44px;
    height: 44px;
    margin-right: 20px;
    img {
      width: 44px;
      height: 44px;
    }
  }
  .cont_ent {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
  }
}
.lookmore {
  padding: 0 60px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(216, 216, 216, 1);
}
.buyin {
  margin: 52px 16px 30px;
  line-height: 44px;
  border-radius: 8px;
  background: linear-gradient(180deg, #494efe 0%, #0900f8 100%);
  // opacity:0.79;
  text-align: center;
  color: #fff;
  font-size: 17px;
}
.zfphoto {
  width: 100px;
  height: 158px;
  margin: 10px 0 0 0;
  background: #999;
  img {
    /* width: 100px;*/
    height: 158px;
    display: block;
  }
}
.uploadpz {
  margin-top: 10px;
  background: #1d1c3b;
  padding: 20px 16px;
  div {
    &:first-child {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    &:last-child {
      width: 100px;
      height: 100px;
      // background:#999;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
.transmm {
  margin-top: 10px;
  padding: 0 16px;
  height: 44px;
  align-items: center;
  display: flex;
  background: #1d1c3b;

  div {
    &:first-child {
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-right: 20px;
    }
  }
  input {
    border: none;
    background: #1d1c3b;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }
}
.share {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  // background:rgba(0,0,0,0.5);
}
.quzhong {
  position: fixed;
  top: 45%;
  left: 45%;
}
</style>
<style>
#marketxinxi .van-uploader__upload {
  background: #1d1c3b !important;
}
</style>
