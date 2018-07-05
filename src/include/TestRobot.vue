<template>
  <div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large grey darken-3 tooltipped" style="margin-bottom: 68px" data-position="left" data-tooltip="测试">
        <i class="large material-icons">face</i>
      </a>
      <ul>
        <li v-if="url==='/login'">
          <a class="btn-floating red darken-2 tooltipped" data-position="left" data-tooltip="学者登录" @click="scholar_login()">
            学者
          </a>
        </li>
        <li v-if="url==='/login'">
          <a class="btn-floating yellow darken-2 tooltipped" data-position="left" data-tooltip="主办方登录" @click="institution_login()">
            主办方
          </a>
        </li>
        <li v-if="url==='/login'">
          <a class="btn-floating green darken-2 tooltipped"  style="margin-bottom: 65px" data-position="left" data-tooltip="管理员登录" @click="manager_login()">
            管理员
          </a>
        </li>
        <li v-if="url==='/user/register'">
          <a class="btn-floating green darken-2 tooltipped"  style="margin-bottom: 65px" data-position="left" data-tooltip="个人注册" @click="user_register()">
            注册
          </a>
        </li>
        <li v-if="url==='/institution/register'">
          <a class="btn-floating green darken-2 tooltipped"  style="margin-bottom: 65px" data-position="left" data-tooltip="机构注册" @click="institution_register()">
            注册
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
            url:'',
            login_data:{
              email:'',
              password:'',
              isScholar:''
            },
            user_register_data:{
              name:'',
              email:'',
              password:'',
              confirmPassword:''
            },
            institution_register_data:{
              name: '',
              email : '',
              location : '',
              phone:'',
              introduction:'',
              password:'',
              confirmPassword:'',
              managerName:'',
              managerPhone:'',
            }
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
            this.$emit('child-say',this.login_data);
          },
          manager_login:function(){
            this.login_data.email="manager@qq.com";
            this.login_data.password="manager";
            this.login_data.isScholar="manager";
            this.$emit('child-say',this.login_data);
          },
          user_register:function () {
            this.user_register_data.name="肖暐奇";
            this.user_register_data.email="575386879@qq.com";
            this.user_register_data.password="123456";
            this.user_register_data.confirmPassword="123456";
            this.$emit('child-say',this.user_register_data);
          },
          institution_register:function () {
              this.institution_register_data.name="北京航空航天大学";
              this.institution_register_data.email='Beihang@buaa.edu.cn';
              this.institution_register_data.location="北京市海淀区学院路37号";
              this.institution_register_data.phone="82317114";
              this.institution_register_data.introduction="北京航空航天大学位列“211工程”、“985工程”、“世界一流大学建设高校";
              this.institution_register_data.password="123456";
              this.institution_register_data.confirmPassword="123456";
              this.institution_register_data.managerName="徐慧彬";
              this.institution_register_data.managerPhone="82317114";
              this.$emit('child-say',this.institution_register_data);
          }
        },
        created(){
          this.url=this.$route.path;
        },
    }
</script>

<style scoped>

</style>
