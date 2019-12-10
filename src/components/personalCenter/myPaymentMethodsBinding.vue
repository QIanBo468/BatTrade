<template>
<div class="root">
  <van-nav-bar :title="'绑定' + title" left-arrow class="nav-top" @click-left="back" />

  <div class="main">
    <template v-if="type !== 0">
      <div>




        <div class="label">账户名称</div>
        <van-field
          class="input"
          v-model="realName"
          placeholder="账户名称和实名信息一致（真实姓名）"
          clearable
        />
      </div>
      <div>
        <div class="label">
          {{ title }}
          <!-- 支付宝账号 -->
          </div>
        <van-field
          class="input"
          v-model="account"
          :placeholder="'请输入' + title"
          clearable
        />
      </div>

      <div>
        <div class="label">
          输入交易密码
          <!-- 支付宝账号 -->
        </div>
        <van-field
          class="input"
          type="password"
          v-model="safeword"
          :placeholder="'请输入交易密码'"
          clearable
        />
      </div>

      <div>
        <div class="label">收款二维码</div>
        <van-uploader
          v-model="qrCodeFileList"
          :max-count="1"
          :after-read="upload"
          @delete="deleteQrCode"
          class="uploading"
          />
      </div>
    </template>

    <template v-else>
      <div>
        <div class="label">持卡人</div>
        <van-field
          class="input"
          v-model="realName"
          placeholder="请输入持卡人姓名"
          clearable
        />
      </div>
      <div>
        <div class="label">卡号</div>
        <van-field
          class="input"
          v-model="account"
          type="number"
          placeholder="请输入银行卡号"
          @blur="enterAccount"
          clearable
        />
      </div>
      <div>
        <div class="label">
        开户行
        <span v-if="bankName">（{{ bankName }}）</span>
        </div>
        <van-field
          class="input"
          v-model="bankAddress"
          placeholder="请输入开户行"
          clearable
        />
      </div>
      <div>
        <div class="label">
          输入交易密码
          <!-- 支付宝账号 -->
        </div>
        <van-field
          class="input"
          type="password"
          v-model="safeword"
          :placeholder="'请输入交易密码'"
          clearable
        />
      </div>

    </template>

    <!-- <div class="sms">
      <div class="label">验证码</div>
      <van-field
        class="input"
        v-model="captcha"
        placeholder="请输入验证码"
        maxlength="6"
        type="number"
        clearable
      >
        <template #button>
          <van-button
            v-if="counter > 0"
            type="small"
            disabled
            class="sms-button"
            @click="clickSms"
          >
            <span class="counter">{{counter}}</span>秒
          </van-button>
          <van-button
            v-else
            type="small"
            class="sms-button"
            @click="clickSms"
          >
            获取验证码
          </van-button>
        </template>
      </van-field>
    </div> -->

    <div class="empty"></div>

    <van-button :disabled="cannotBind" class="bind-btn" @click="bind">立即绑定</van-button>
  </div>

</div>
</template>

<script>
import BIN from "./bank"

export default {
  data() {
    let type = this.$route.query.type
    let id = this.$route.query.id

    let title = ""
    switch (type) {
      case 1:
        title = "支付宝账号"
        break
      case 2:
        title = "微信账号"
        break
      case 0:
        title = "银行卡"
        break
    }

    return {
      type,
      id,

      cannotBind: false,
      bankName: "",
      safeword:'',
      title,
      captcha: "",
      counter: 0,

      realName: "",
      account: "",
      qrCodeFileList: [],

      bankAddress: "",
      idCard: "",
      mobile: "",
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

    enterAccount() {
      BIN.getBankBin(this.account).then((data) => {
        this.bankName = data.bankName || ""
      }).catch((err) => {
        this.bankName = ""
        console.log(err)
      })
    },

    clickSms() {
      
      this.$axios.fetchPost('/portal', {
        source: "web",
        version: "v1",
        module: "User",
        interface: "1000",
        data: {
        },
      }).then(res => {
        // console.log(res)
        if (res.code !== 0) {
          return
        }

        this.$axios.fetchPost('/portal', {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "1906",
          data: {
            account: res.data.account,
          },
        }).then(res => {
          // console.log(res)
          if (res.code !== 0) {
            this.$toast(res.message)
            return
          }
          if(res.success) {
            this.counter = 60
            let timer = setInterval(() => {
            if (this.counter === 0) {
              clearInterval(timer)
              return
            }
            this.counter--
          }, 1000)
          this.$toast("验证码发送成功")
          }
        })
      })
    },

    bind() {
      let param = {
        type: this.type,
        account: this.account,
        realName: this.realName,
        safeword:this.safeword
        //captcha: this.captcha,
      }

      if (param.type === 0) {
        param.bankAddress = this.bankAddress
        param.idCard = this.idCard
        param.mobile = this.mobile
      } else {
        param.qrCode = this.qrCode
      }

      let errmsg = this.checkParam(param)
      if (errmsg) {
        this.$toast(errmsg)
        return
      }

      let inter = "1001"
      if (this.id) {
        inter = "1003"
        param.id = this.id
      }

      this.cannotBind = true
      this.$axios.fetchPost('/portal/C2C', {
        source: "web",
        version: "v1",
        module: "Payment",
        interface: inter,
        data: param,
      }).then(res => {
        // console.log(res)
        if (res.code !== 0) {
          this.$toast(res.message)
          return
        }
        if (this.id) {
          this.$toast("修改支付方式成功")
        } else {
          this.$toast("绑定支付方式成功")
        }
        setTimeout(() => {
          this.back()
        }, 500)
      }).catch((err) => {
        this.cannotBind = false
      })
    },

    checkParam(param) {
      if (param.type !== 0) {
        if (!param.realName) {
          return "账户名称必填"
        }
        if (param.realName.length < 2) {
          return "账号名称最少两个字符"
        }
        if (!param.account) {
          return this.title + "必填"
        }
        if (param.safeword.length != 6) {
          return '交易密码必须由 6 位数字组成'
        }
        if (!param.qrCode) {
          return "收款二维码必传"
        }
      } else {
        if (!param.realName) {
          return "持卡人必填"
        }
        if (param.realName.length < 2) {
          return "持卡人姓名最少两个字符"
        }
        if (!param.account) {
          return "卡号必填"
        }
       /* if (!(/^([1-9]{1})(\d{14}|\d{18}|\d{16})$/.test(param.account))) {
          return "银行卡号有误"
        }*/
        if (!param.bankAddress) {
          return "开户行必填"
        }
        if (!param.idCard) {
          //return "身份证号必填"
        }
        if (!(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(param.idCard))) {
          //return "身份证号有误"
        }
        if (!param.mobile) {
         // return "银行预留手机号必填"
        }
        if (!(/^1[3456789]\d{9}$/.test(param.mobile))) {
         // return "手机号码有误"
        }
      }

      /*if (!param.captcha) {
        return "验证码必填"
      }
      if (param.captcha.length !== 6) {
        return "验证码为6位数字"
      }*/
      return ""
    },

    upload(file) {
      let form = new FormData()
      form.append("file", file.file)
      this.$axios.fetchPost("http://www.batchina.top/upload", form).then(res => {
        // console.log(res)
        this.qrCode = res.data.file
      }).catch(err => {
        console.log(err)
      })
    },
    deleteQrCode() {
      this.qrCode = ""
    },

    getData() {
      this.$axios.fetchPost('/portal/C2C', {
        source: "web",
        version: "v1",
        module: "Payment",
        interface: "1003",
        data: {
          id: this.id,
        },
      }).then(res => {
        // console.log(res)
        if (res.code !== 0) {
          return
        }

        let d = res.data
        this.realName = d.realName
        this.account = d.account
        this.bankAddress = d.bankAddress
        this.idCard = d.idCard
        this.mobile = d.mobile
        this.qrCode = d.qrCode
        this.qrCodeFileList = [
          {
            url: d.qrCode,
          }
        ]
      })
    },
  },

  created() {
    if (this.id) {
      this.getData()
    }
  },
}
</script>

<style lang="less" scoped>
.van-nav-bar{
  background: #0D0900;
}
/deep/.van-nav-bar__title{
  color: #fff;
}
[class*=van-hairline]::after{
  border: none;
}
.van-icon{
  color: #fff;
}
/deep/.van-field__control{
  color: #fff;
}
.root {
  background: #0B0C21;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-top {
  margin-bottom: 10px;
}

.main {
  flex-grow: 1;
  padding: 10px 16px 0;
  background: #0B0C21;
  display: flex;
  flex-direction: column;
}

.label {
  color: #fff;
  font-size: 14px;
  margin: 10px 0;
}

.input {
  // border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding-top: 5px;
  padding-bottom: 5px;
  background: #1D1C3B
}

.sms-button {
  color: rgba(248, 77, 77, 1);
  background: none;
  border: none;
  font-size: 14px;
  opacity: 1;
}

.empty {
  flex-grow: 1;
  min-height: 30px;
}

.bind-btn {
    width: 343px;
    height: 44px;
    background: red;
    margin: 0 auto;
    background:linear-gradient(90deg,#494EFE 0%,#0900F8 100%);
    border-radius: 6px;
    color: #fff;
    margin-bottom: 41px;
    border: none;
}
/deep/.van-uploader__upload{
  background: transparent;
}
</style>
