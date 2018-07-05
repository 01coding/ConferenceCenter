<template>
  <div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large grey darken-3 tooltipped" style="margin-bottom: 68px" data-position="left" data-tooltip="测试">
        <i class="large material-icons">assignment_ind</i>
      </a>
      <ul>
        <li>
          <a class="btn-floating red darken-2 tooltipped" data-position="left" data-tooltip="学者登录" @click="scholar_login()">
            学者
          </a>
        </li>
        <li>
          <a class="btn-floating yellow darken-2 tooltipped" data-position="left" data-tooltip="主办方登录" @click="institution_login()">
            主办方
          </a>
        </li>
        <li>
          <a class="btn-floating green darken-2 tooltipped"  style="margin-bottom: 65px" data-position="left" data-tooltip="管理员登录" @click="manager_login()">
            管理员
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TestRobot",
        data() {
          return {
            login_data:{
              email:'',
              password:'',
              isScholar:''
            },
          }
        },
        methods:{
          scholar_login:function(){
            this.login_data.email="1521@123.com";
            this.login_data.password="1521";
            this.login_data.isScholar="scholar";
            this.$emit('child-say',this.login_data)
          },
          institution_login:function(){
            this.login_data.email="buaa@edu.cn";
            this.login_data.password="buaa";
            this.login_data.isScholar="institution";
            this.$emit('child-say',this.login_data)
          },
          manager_login:function(){
            this.login_data.email="manager@qq.com";
            this.login_data.password="manager";
            this.login_data.isScholar="manager";
            this.$emit('child-say',this.login_data)
          },
        }
    }
</script>

<style scoped>

</style>
