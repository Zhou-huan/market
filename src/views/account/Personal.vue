<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>管理员信息</h3>
      </div>
      <div>
        <div>
          <span>管理员ID: {{accountInfo.id }}</span>
          <el-divider></el-divider>
          <span>账号： {{accountInfo.username }}</span>
          <el-divider></el-divider>
          <span>用户组： {{accountInfo.role }}</span>
          <el-divider></el-divider>
          <span>创建时间： {{accountInfo.inputtime | filterTime }}</span>
          <el-divider></el-divider>
          <div class="avatar-wrap" style="height: 100px;">
            <span>用户头像：</span>
            <div style="margin-top: 20px;" class="avatar">
              <!-- 用户头像 -->
              <!-- 
                action: 上传地址
                show-file-list: 是否显示文件列表
                on-success:   上传成功后的回调
                before-upload:上传发送请求前的回调
              -->
              <el-upload
                class="avatar-uploader"
                :action="uploadApi"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <!-- <img v-if="imageUrl" :src="uploadAvatarDirimageUrl" class="avatar"> -->
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>

            <el-button
              @click="editAvatar"
              style="margin-left: 30px; margin-top: 15px;"
              size="small"
              type="primary"
            >修改头像</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  loadPersonalInfo,
  uploadApi,
  uploadAvatarDir,
  editAvatarImg
} from "@/api/";
import moment from "moment";
export default {
  data() {
    return {
      //把接口放入data，供upload组件使用
      uploadApi,
      // uploadAvatarDir,
      accountInfo: {
        //把接口放入data，供upload组件使用
        id: 1, //id
        username: "", //账号
        role: "", //用户组
        inputtime: "", //时间
        avatar: "" //图片地址
      }
    };
  },
  methods: {
    editAvatar() {
      const vm = this;
      //获取参数
      const avatarParams = this.accountInfo.avatar;
      //保存修改后的图片数据库
      editAvatarImg(avatarParams).then(data => {
        if (data.success) {
          vm.$message({
            type: "success",
            message: data.message,
            showClose: true,
            duration: 500,
            onClose: () => {
              //提示成功界面关闭时
              //全局头像的更新
              vm.$bus.$emit('avatarChange',vm.imageUrl)//imageUrl是计算属性（是完整的地址发给头部），但也是属性，可以直接调用
           /*    //获取用户个人信息
              loadPersonalInfo().then(({ accountInfo }) => {
                // this.accountInfo=data.accountInfo;//赋值渲染
                Object.assign(this.accountInfo, accountInfo); //浅拷贝
              }); */
            }
          });
        } else {
          // 如果不合法
          this.$message.error(data.message);
        }
      });
    },
    //上传成功的回调
    handleAvatarSuccess(data) {
      if (data.success) {
        //把回显的数据，放入data
        this.accountInfo.avatar = data.fileName;
      }
    }
  },
  created() {
    //获取用户个人信息
    loadPersonalInfo().then(({ accountInfo }) => {
      // this.accountInfo=data.accountInfo;//赋值渲染
      Object.assign(this.accountInfo, accountInfo); //浅拷贝
    });
  },
  computed: {
    imageUrl() {
      //有头像显示头像
      if (this.accountInfo.avatar) {
        return uploadAvatarDir + this.accountInfo.avatar;
      } else {
        //没有头像，显示加号字体图标
        return "";
      }
    }
  },
  filters: {
    //过滤时间
    filterTime(v) {
      return moment(v).format("YYYY-MM-DD HH:MM:SS");
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
}
</style>