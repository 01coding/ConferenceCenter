<template>
<div>
  <navbar></navbar>
  <div class="row center-align">
    <div class="row" style="margin-top: 30px"></div>
    <div class="row">
      <span class="col s3 offset-l2 left-align" style="font-size: 30px">主办方注册</span>
    </div>
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
        <i class="medium material-icons prefix">short_text</i>
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
        <div class="btn col s2">
          <span>上传证明材料</span>
          <input type="file">
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>
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
        }
      },
    }
</script>

<style scoped>

</style>
