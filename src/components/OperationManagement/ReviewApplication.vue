<template>
  <div>
    <NavBar></NavBar>
    <div class="center white section">
      <h5 style="margin-top: 0;">有 0 个新申请</h5>
    </div>

    <div class="row container">
      <EmptyView message="还没有新的申请" :style="{'height': page_height*0.6+'px'}"></EmptyView>
    </div>
  </div>
</template>

<script>
import NavBar from "@/include/NavBar";
import BackGround from "@/include/Background";
import EmptyView from "../../include/EmptyView";

export default {
  name:"ReviewApplication",
  components:{EmptyView, NavBar, BackGround},
  data: function() {
    return {
      page_height: $(document).height(),
    }
  },

  created: function() {
    this.verify_session();
    this.load_apps();
  },

  methods: {
    verify_session() {
      let session_token = sessionStorage.getItem("session");
      if (!session_token) {
        M.toast({
          html:"<span style='font-weight: bold'>请先登录</span>",
          classes: "rounded yellow darken-2"
        });
        this.$router.push("/login")
      }
    },

    load_apps: function() {
      this.$axios.post('/api/getInstitutionToCheck').then(response => {
        let resp = response.data;
        console.log(resp);
        if (resp.status === "succ") {

        } else {
          if (resp.info === "没有管理员权限") {
            M.toast({
              html:"<span style='font-weight: bold'>你无权访问该页面</span>",
              classes: "rounded  red"
            });
            this.$router.push("/404");
          } else {
            M.toast({
              html:"<span style='font-weight: bold'>请求发生错误</span>",
              classes: "rounded  red"
            });
            this.$router.push("/");
          }
        }
      }).catch(error => {
        M.toast({
          html:"<span style='font-weight: bold'>请求发生错误</span>",
          classes: "rounded  red"
        });
        this.$router.push("/");
      });
    },

    reviewPass: function (applyid) {
      //console.log(localStorage);
      sessionStorage.getItem('session');
      this.$axios.post('/api/setInstitutionStatus/'+applyid+'/1').then(response => {
        //set status
        console.log("pass OK");
        console.log(response);
        console.log(this.apply);

        //get new list
        this.$axios.post('/api/getInstitutionToCheck').then(response => {
          console.log(JSON.stringify(response));
          this.applyNumber=response.data.data.length;
          this.apply = response.data.data;
        }).catch(error => {
          console.log(1);
        });

      }).catch(error => {
        console.log("ERROR");
      });

    },

    reviewReject: function (applyid) {
      //console.log(localStorage);
      sessionStorage.getItem('session');
      this.$axios.post('/api/setInstitutionStatus/'+applyid+'/-1').then(response => {
        console.log("reject OK");

        //get new list
        this.$axios.post('/api/getInstitutionToCheck').then(response => {
          console.log(JSON.stringify(response));
          this.applyNumber=response.data.data.length;
          this.apply = response.data.data;
        }).catch(error => {
          console.log(1);
        });

      }).catch(error => {
        console.log("ERROR");
      })
    }
  },
}

</script>

<style>
.check-institution{
  font-weight: 500;
  font-family: "Times New Roman";
  font-size: 1.4rem;
}
</style>
