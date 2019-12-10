<template>
  <div class="root">
  <van-nav-bar title="投诉" left-arrow class="nav-top" @click-left="back" />

  <div class="main">
    <van-field
      v-model="feedback"
      placeholder="请输入您要投诉的内容"
      type="textarea"
      clearable
      autosize
      rows="4"
      maxlength="200"
      class="feedback"
    />
    <van-uploader
      v-model="fileList"
      multiple
      :max-count="3"
      class="uploader"
      :after-read="upload"
      />
      <div class="wentibut">
    <van-button :disabled="cannotBind" class="submit-btn" @click="submit">提交</van-button>
      </div>
  </div>
</div>
</template>

<script>
export default {
 data() {
    return {
      feedback: "",
      fileList: [],
      id:'',
      cannotBind: false,
    }
  },
  created(){
    this.id = this.$route.query.id;
    console.log(this.id)
  },
  methods: {
    back() {
      this.$router.go(-1)
    },



    upload(file) {
      let list = []
      if (file.length) {
        for (let i = 0; i < file.length; i++) {
          list.push(file[i].file)
        }
      } else {
        list.push(file.file)
      }

      this.uploadOne(list, 0)
    },
    uploadOne(list, i) {
      let form = new FormData()
      form.append("file", list[i])
      this.$axios.fetchPost("http://www.batchina.top/upload", form).then(res => {
        // console.log(res)
        list[i]._url = res.data.file
        if (i + 1 < list.length) {
          this.uploadOne(list, i + 1)
        }
      }).catch(err => {
        this.$toast("错误" + err)
        console.log(err)
      })
    },

    submit() {
      if (!this.feedback) {
        this.$toast("投诉内容必填")
        return
      }

      let list = []
      for (let i = 0; i < this.fileList.length; i++) {
        list.push(this.fileList[i].file._url)
      }

      if(list.length == 0){
        this.$toast("投诉照片不能为空")
        return false;
      }
      this.cannotBind = true
      this.$axios.fetchPost('/portal/C2C', {
        source: "web",
        version: "v1",
        module: "Trade",
        interface: "2002",
        data: {
          id:this.id,
          content: this.feedback,
          images: list,
        }
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.$toast("新增投诉成功")
          setTimeout(() => {
            this.$router.push('/mytrans')
          }, 500)
        } else {
          this.$toast(res.message)
        }
      }).catch((err) => {
        this.cannotBind = false
      })
    },
  },
}
</script>

<style lang="less" scoped>
.root {
  background: #0D0900;
  height: 100vh;
}

.nav-top {
  margin-bottom: 10px;
}

.main {
  margin: 10px 16px 0;
  display: flex;
  flex-direction: column;
}

.feedback {
  border-radius: 4px;
}

.uploader {
  margin: 10px 0 40px;
}
.wentibut{
  width: 100%;
  // position: fixed;
  // bottom: 0;
  display: flex;
  justify-content: center;
}
.submit-btn {
  margin: 0;
  padding: 0;
  position: fixed;
  bottom: 15px;
  width: 90%;
  background-image: linear-gradient(90deg,#494efe, #0900F8);
  border: none;
  color: #fff;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border-width:0px 0px !important;
}
.van-cell:not(:last-child)::after{
  border: none;
}
.van-cell{
   color: #fff;
  background: #1D1C3B;
}
/deep/.van-field__control {
  color: #fff;
}
.van-cell__value{
            background: #f8f8f8;
        }
input{
  color: #f8f8f8 !important;
}
        .van-hairline--bottom::after{
            border: none;
        }
          .van-nav-bar{
            background: #0D0900;
        }
           .van-icon {
                color: #fff;
            }
            .van-nav-bar__title{
                color: #fff;
            }
            .van-nav-bar__text{
                color: #fff;
            }
            /deep/.van-uploader__upload{
              background: transparent;
            }
</style>
