<template>
  <div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large grey darken-3 tooltipped" style="margin-bottom: 68px" data-position="left" data-tooltip="测试">
        <i class="large material-icons">face</i>
      </a>
      <ul>
        <li v-if="url==='/login'">
          <a class="btn-floating red darken-2 tooltipped"  data-position="left" data-tooltip="学者登录" @click="scholar_login()">
            学者
          </a>
        </li>
        <li v-if="url==='/login'">
          <a class="btn-floating yellow darken-2 tooltipped" data-position="left" data-tooltip="主办方登录" @click="institution_login()">
            主办
          </a>
        </li>
        <li v-if="url==='/login'">
          <a class="btn-floating green darken-2 tooltipped" style="margin-bottom: 65px" data-position="left" data-tooltip="管理员登录" @click="manager_login()">
            管理
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
        <li v-if="url==='/orgspace/new/conference'">
          <a class="btn-floating green darken-2 tooltipped"  style="margin-bottom: 65px" data-position="left" data-tooltip="发布新会议" @click="new_conference()">
            发布
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
            },
            new_conference_data:{
              conf_topic: '',
              conf_field: '',
              conf_desc: '',
              conf_start_date: '',
              conf_end_date: '',
              conf_location: '',
              conf_essay_info: '',
              conf_essay_inst: '',
              conf_essay_ddl: '',
              // conf_essay_time: "23:59",
              conf_essay_time: '',
              conf_release_ddl: '',
              conf_release_time: '',
              conf_register_ddl: '',
              // conf_register_time: "23:59",
              conf_register_time: '',
              conf_schedule: '',
              conf_paper_template: '',
              conf_register_info: '',
              conf_commute_info: '',
              conf_contact: '',
            }
          }
        },
        methods:{
          init_fab_tip: function () {
            let width = 0;
            $('.overlay-trigger').click(this.overlay);
            $('.overlay').click(this.hideOverlay);
            $(window).on("scroll", this.hideOverlay);
          },
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
          },
          new_conference:function () {
            this.new_conference_data.conf_topic="IEEE国际计算机视觉与模式识别会议";
            this.new_conference_data.conf_field=2;
            this.new_conference_data.conf_desc = "CVPR是世界顶级的计算机视觉会议";
            this.new_conference_data.conf_start_date="Jul 01, 2018";
            this.new_conference_data.conf_end_date="Jul 15, 2018";
            this.new_conference_data.conf_location="法国巴黎";
            this.new_conference_data.conf_essay_info="与计算机视觉相关";
            this.new_conference_data.conf_essay_inst="英文，不少于10页";
            this.new_conference_data.conf_essay_ddl="Jan 18, 2018";
            // conf_essay_time: "23:59",
            this.new_conference_data.conf_essay_time="00:00";
            this.new_conference_data.conf_release_ddl="Jan 20, 2018";
            this.new_conference_data.conf_register_ddl="Jan 22, 2018";
            // conf_register_time: "23:59",
            this.new_conference_data.conf_register_time="00:00";
            this.new_conference_data.conf_schedule="第一天：主会场；第二天：分会场";
            this.new_conference_data.conf_register_info="1.投稿人可带至多三人参会；2.普通与会人员：300/人次。";
            this.new_conference_data.conf_commute_info="北航招待 地铁十三号线知春路站";
            this.new_conference_data.conf_contact="谭老师 电话：123456789";
            this.$emit('child-say',this.new_conference_data);
          }
        },
        created(){
          this.url=this.$route.path;
          $(document).ready(function(){
            $('.fixed-action-btn').floatingActionButton();
          });
          this.init_fab_tip();
        },
    }
</script>

<style scoped>

</style>
