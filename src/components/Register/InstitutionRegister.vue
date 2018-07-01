<template>
<div>
  <navbar></navbar>
  <div class="row center-align">
    <div class="row" style="margin-top: 30px"></div>
    <div class="col s7 offset-l2 row">
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
    <div class="col s7 offset-l2 row">
      <div class="card-panel white-text text grey darken-2 " style="vertical-align: center; padding-top: 8px;padding-bottom: 8px; margin-bottom:25px;font-size: 17px">上传照片</div>
      <div class="file-field input-field input-field">
        <div class="btn col s2">
          <span>上传照片</span>
          <input type="file">
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>
    </div>
    <div class="col s7 offset-l2 row">
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
    <div class="col s7 offset-l2 row">
      <div class="card-panel white-text text grey darken-2 " style="vertical-align: center; padding-top: 8px;padding-bottom: 8px;font-size: 17px">账号信息</div>
      <div class="input-field col s12">
        <i class="medium material-icons prefix">email</i>
        <input id="confirmEmail" type="email" class="validate"  v-model="confirmEmail"/>
        <label for="confirmEmail">确认邮箱</label>
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
    <div class="col s7 offset-l2 row">
      <button class="col s8 offset-l2 btn waves-effect waves-light" style="margin-top: 7px;" type="submit" @click="institutionRegisterFuc($event)">
        提交
      </button>
    </div>
  </div>

</div>
</template>

<script>
    import navbar from '@/include/NavBar';
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
          file:''
        }
      },
      created: function() {
      },
      methods:{
        getFile(event){
          this.file = event.target.files[0];
        },
        institutionRegisterFuc(event) {

          event.preventDefault();
          let formData = new FormData();
          formData.append('file',this.file);

          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }

          this.$axios.post('http://154.8.211.109:8000', formData, config).then(function (response) {
            console.log(response.data);
          })


        }
      }
    }
</script>

<style scoped>

</style>
