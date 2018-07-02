<template>
<div>
  <navbar></navbar>
  <div class="row center-align container">
    <div class="row" style="margin-top: 30px"></div>
    <div class="row">
      <div class="card-panel white-text text grey darken-2 " style="vertical-align: center; padding-top: 8px;padding-bottom: 8px;font-size: 17px">基本信息</div>
      <div class="input-field col s5">
        <i class="medium material-icons prefix">account_circle</i>
        <input id="name" type="text" class="validate"  v-model="name"/>
        <label for="name">机构名</label>
      </div>
      <div class="input-field col s6 offset-l1">
        <i class="medium material-icons prefix">email</i>
        <input id="email" type="email" class="validate"  v-model="email"/>
        <label for="email">邮箱</label>
      </div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">add_location</i>
        <input id="location" type="text" class="validate"  v-model="location"/>
        <label for="location">地址</label>
      </div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">local_phone</i>
        <input id="phone" type="text" class="validate"  v-model="phone"/>
        <label for="phone">联系电话</label>
      </div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">subject</i>
        <textarea id="introduction" class="materialize-textarea"  v-model="introduction"/>
        <label for="introduction">介绍</label>
      </div>
    </div>
    <div class="row">
      <div class="card-panel white-text text grey darken-2 " style="vertical-align: center; padding-top: 8px;padding-bottom: 8px; margin-bottom:25px;font-size: 17px">上传照片</div>
      <div class="file-field input-field input-field">
        <div class="btn col s2" @change="getImg($event)">
          <span>上传照片</span>
          <input type="file">
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card-panel white-text text grey darken-2 " style="vertical-align: center; padding-top: 8px;padding-bottom: 8px; margin-bottom:25px;font-size: 17px">上传证明材料</div>
      <div class="file-field input-field input-field">
        <div class="btn col s2" @change="getFile($event)">
          <span>上传证明材料</span>
          <input type="file">
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card-panel white-text text grey darken-2 " style="vertical-align: center; padding-top: 8px;padding-bottom: 8px;font-size: 17px">管理员信息</div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">account_circle</i>
        <input id="managerName" type="text" class="validate"  v-model="managerName"/>
        <label for="managerName">管理员姓名</label>
      </div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">email</i>
        <input id="confirmEmail" type="email" class="validate"  v-model="confirmEmail"/>
        <label for="confirmEmail">再次确认邮箱</label>
      </div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">local_phone</i>
        <input id="managerPhone" type="text" class="validate"  v-model="managerPhone"/>
        <label for="managerPhone">管理员电话</label>
      </div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">vpn_key</i>
        <input id="password" type="password" class="validate"  v-model="password"/>
        <label for="password">密码</label>
      </div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">vpn_key</i>
        <input id="confirmPassword" type="password" class="validate"  v-model="confirmPassword"/>
        <label for="confirmPassword">确认密码</label>
      </div>
    </div>
    <div class="row">
      <button class="col s8 offset-l2 btn waves-effect waves-light" style="margin-top: 7px;" type="submit" @click="institutionRegisterFuc($event)">
        提交
      </button>
    </div>
    <div style="height: 6rem;"></div>
  </div>

</div>
</template>

<script>
    import navbar from '@/include/NavBar';
    import axios from 'axios';
    import Vue from "vue"
    import VuejsDialog from "vuejs-dialog"

    Vue.use(VuejsDialog);

    export default {
      name: "InstitutionRegister",
      components: { navbar},
      data() {
        return {
          name: '',
          email : '',
          location : '',
          phone:'',
          introduction:'',
          confirmEmail:'',
          password:'',
          confirmPassword:'',
          file:'',
          filePath:'',
          img:'',
          imgPath:'',
          managerName:'',
          managerPhone:'',
        }
      },
      created: function() {
      },
      methods:{
        getFile(event){
          this.file = event.target.files[0];
        },
        getImg(event){
          this.img = event.target.files[0];
        },
        institutionRegisterFuc(event) {

          event.preventDefault();

          let options = {
            cancelText: '确认',  // 本地化确认按钮文字提示内容
            animation: 'zoom', // 动画方式， 三选一: "zoom", "bounce", "fade"
            type: 'basic', // 确认类型，点击确认（basic）， 'soft'(软确认), 'hard'（硬确认)
            };

            const regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if(this.name===""|| this.email===""|| this.location===""|| this.phone===""||
            this.introduction===""|| this.confirmEmail===""|| this.password===""||
            this.confirmPassword===""|| this.managerName===""|| this.managerPhone===""){
            M.toast({
              html:"<span style='font-weight: bold'>请完成所有表单</span>",
              classes: "rounded yellow darken-2"
            });
            return;
          }

          else if(this.email===''||!regEmail.test(this.email)){
            M.toast({
              html:"<span style='font-weight: bold'>邮箱不符合规范</span>",
              classes: "rounded yellow darken-2"
            });
            return;
          }

          else if(this.email!==this.confirmEmail){
            M.toast({
              html:"<span style='font-weight: bold'>两次邮箱不一致</span>",
              classes: "rounded yellow darken-2"
            });
            return;
          }

          let that = this;
          axios.all([this.upload_file(), this.upload_img()]).then(
            axios.spread(function (uf, ui) {
               that.$user.post('/ins/register', {
                name:that.name,
                location: that.location,
                phone: that.phone,
                backimg:that.imgPath,
                introduction:that.introduction,
                evidence:that.filePath,
                principal: {
                  email: that.email,
                  name:that.managerName,
                  password:that.password,
                  phone:that.managerPhone
                }
              }).then(rsp => {
                if(rsp.data.code==="400"){
                  M.toast({
                    html:"<span style='font-weight: bold'>"+rsp.data.msg+"</span>",
                    classes: "rounded yellow darken-2"
                  });
                  return;
                }
                this.$router.push('/');
              }).catch(err => {
                console.log(err);
              })

            })
          );

        },
        upload_file: function() {
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
          let FileData = new FormData();
          FileData.append('file',this.file);
          return this.$file.post('/', FileData, config).then(response=>{
            this.filePath=response.data;
          });

        },
        upload_img: function() {
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
          let ImgData = new FormData();
          ImgData.append('file',this.img);
          return this.$file.post('/', ImgData, config).then(response => {
            this.imgPath=response.data;
          });

        }
      }
    }
</script>

<style scoped>

</style>
