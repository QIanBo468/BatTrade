<template>
  <div class="myIndex">
    <div class="my_header">
      <van-nav-bar title="我的">
        <!-- <van-icon name="setting-o" size="20" slot="right" @click="onClickRight" /> -->
      </van-nav-bar>
      <div class="top">
        <img :src="avatar" alt class="headpic" />

        <div class="headtext">
          <p>账号：{{info.account}}</p>
          <!-- <p>ID：{{info.id}}</p> -->
          <p>级别：{{info.level}}</p>
        </div>
      </div>
    </div>
    <div class="listbat">
      <router-link to="/usdt">
        <img src="../../../static/images/index/yitai@3x.png" width="50px" height="50px" alt />
        <div class="num">
          <div>BAT钱包</div>
          <div>{{money}}</div>
        </div>
        <img src="../../../static/images/index/in@3x(2).png" width="19px" height="19px" alt />
      </router-link>
    </div>
    <div class="my_list">
      <router-link class="list" to="authentication">
        <div class="my_first">
          <img src="../../../static/images/index/shiming.png" alt />
          <p>实名认证</p>
        </div>
        <img width="22px" height="22px" src="../../../static/images/index/in@3x.png" alt />
      </router-link>
      <router-link class="list" to="/mytrans">
        <div class="my_first">
          <img src="../../../static/images/index/jiaoyi.png" alt />
          <p>我的交易</p>
        </div>
        <img width="22px" height="22px" src="../../../static/images/index/in@3x.png" alt />
      </router-link>

      <router-link class="list" to="myPaymentMethods">
        <div class="my_first">
          <img src="../../../static/images/index/shoukuan@3x.png" alt />
          <p>我的收款方式</p>
        </div>
        <img width="22px" height="22px" src="../../../static/images/index/in@3x.png" alt />
      </router-link>
      <!-- <router-link class="list" to="my_recommend">
        <div class="my_first">
          <img src="../../assets/img/wodetuijian.png" alt />
          <p>我的推荐</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>-->
      <!-- <router-link class="list" to="my_team">
        <div class="my_first">
          <img src="../../assets/img/wodetuandui.png" alt />
          <p>我的团队</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>-->
      <router-link class="list" to="my_Address">
        <div class="my_first">
          <img src="../../../static/images/index/dizhi.png" alt />
          <p>地址本</p>
        </div>
        <img width="22px" height="22px" src="../../../static/images/index/in@3x.png" alt />
      </router-link>
      <!-- <router-link class="list" to="safeCenter">
        <div class="my_first">
          <img src="../../assets/img/zhanghuyuanquan.png" alt />
          <p>账户与安全</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>-->
      <router-link class="list" to="feedbackNew">
        <div class="my_first">
          <img src="../../../static/images/index/zhanhu@3x.png" alt />
          <p>问题反馈</p>
        </div>
        <img width="22px" height="22px" src="../../../static/images/index/in@3x.png" alt />
      </router-link>
      <div class="list" @click="Login">
        <div class="my_first">
          <img src="../../../static/images/index/tuichu@3x.png" alt />
          <p>安全退出</p>
        </div>
        <img
          width="22px"
          height="22px"
          class="arrow"
          src="../../../static/images/index/in@3x.png"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
      avatar: "",
      money: 0.0
    };
  },
  computed: {},
  methods: {
    onClickRight() {
      this.$router.push("setting");
    },
    Login() {
      console.log("1111");
      sessionStorage.setItem("accessToken", "");
      this.$router.push("Login");
    }
  },
  created() {
    this.$axios
      .fetchPost("/portal", {
        interface: "1000",
        module: "User",
        source: "web",
        version: "v1",
        data: {}
      })
      .then(res => {
        console.log("个人信息", res);
        // this.goodsList = res.data.list;
        this.info = res.data;
        this.avatar = res.data.avatar;
      });

    this.$axios
      .fetchPost("/portal", {
        interface: "1000",
        module: "Finance",
        source: "web",
        version: "v1",
        data: {}
      })
      .then(res => {
        console.log("钱包信息", res.data.credit_2);
        // this.goodsList = res.data.list;
        this.money = res.data.credit_2.value;
      });
  }
};
</script>
<style scoped>
.myIndex {
  overflow-y: auto;
  background: #0b0c21;
}
.my_header {
  background: url(../../../static/images/index/bg@3x.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 160px;
}
.van-nav-bar {
  background: none;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.van-nav-bar .van-icon {
  color: #ffffff !important;
}
.van-nav-bar__title {
  color: #ffffff;
}

.headpic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  margin-top: 5px;
}
.top {
  margin-top: 27px;
  padding-left: 27px;
  display: flex;
}
.headtext > p {
  margin: 0;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.headtext > p:nth-child(1) {
  font-size: 16px;
  font-weight: 500;
}
.headtext > p:nth-child(2) {
  font-size: 13px;
  font-weight: 400;
  margin-top: 8px;
}
.headtext > p:nth-child(3) {
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
}
.my_list {
  padding: 20px;
  border-radius: 6px;
}
.list {
  background: #1d1c3b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #707070;

  padding: 0 10px;
}
.my_first {
  display: flex;
  align-items: center;
}
.my_first > img {
  width: 24px;
  height: 24px;
}
.my_first > p {
  /* width: 100%; */
  font-size: 14px;
  color: #fff;
  margin-left: 10px;
}
/* .list:first-child{
  border: none;
} */
.list:last-child {
  border: none;
}

.listbat a {
  background: linear-gradient(90deg, #4a66fa 0%, #7482fc 100%);
  width: 343px;
  margin: 15px auto 0;
  height: 100px;
  border-radius: 6px;
  padding: 22px 20px 22px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.listbat a .num {
  flex: 1;
  overflow: hidden;
  color: #fff;
  margin-left: 10px;
}
.listbat a .num div {
  height: 22px;
  line-height: 22px;
  font-size: 16px;
}
.listbat a .num div:last-child {
  height: 32px;
  line-height: 32px;
  font-size: 23px;
}

/* img{
          width: 20px;
      } */
</style>
