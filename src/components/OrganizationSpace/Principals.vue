<template>
  <div class="col s10 offset-s1">
    <div class="row">
      <div class="col s6 m4" v-for="(one, index) in principals" v-bind:key="index">
        <div class="card">
          <div class="card-content center-align">
            <h5>{{ one.name }}</h5>
          </div>
        </div>
      </div>
      <div class="col s6 m4">
        <div class="card modal-trigger" style="cursor: pointer" data-target="add_modal">
          <div class="card-content valign-wrapper" style="height: 200px">
            <div class="center-align" style="width: 100%">
              <i class="medium material-icons">add</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="add_modal" class="modal">
      <div class="modal-content">
        <h5>添加工作人员</h5>
        <div class="row">
          <div class="input-field col s8">
            <input id="new_name" type="text" class="validate" v-model="new_name">
            <label for="new_name">姓名</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="new_email" type="email" class="validate" v-model="new_email">
            <label for="new_email">邮箱</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="new_phone" type="tel" class="validate" v-model="new_phone">
            <label for="new_phone">手机</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="new_password" type="password" class="validate" v-model="new_password">
            <label for="new_password">密码</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="new_location" type="text" class="validate" v-model="new_location">
            <label for="new_location">工作地点</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a style="cursor: pointer;" class="modal-close waves-effect waves-teal btn-flat">取消</a>
        <a style="cursor: pointer;" class="modal-close waves-effect waves-teal btn-flat" @click="add_princ()">添加</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Principals",
    data: function () {
      return {
        principals: [],
        new_name: '',
        new_email: '',
        new_phone: '',
        new_password: '',
        new_location: ''
      };
    },
    mounted: function () {
      this.$bus.emit('manage-change-title', { text: '工作人员管理' });
      this.$axios.post('/api/manage/principals', {}).then(rsp => {
        if (rsp.data.status === 'succ') {
          this.principals = rsp.data.data.principal;
        } else {
        }
      });
      $('.modal').modal();
    },
    methods: {
      add_princ: function() {
        this.$axios.post('/api/manage/addPrincipal', {
          email: this.new_email,
          password: this.new_password,
          name: this.new_name,
          location: this.new_location,
          phone: this.new_phone
        }).then(rsp => {
          if (rsp.data.status === 'succ') {
            M.toast({
              html: "<span style='font-weight: bold'>已添加工作人员</span>",
              classes: "rounded green"
            });
            this.new_email = '';
            this.new_name = '';
            this.new_password = '';
            this.new_location = '';
            this.new_phone = '';
          } else {
            M.toast({
              html: "<span style='font-weight: bold'>" + rsp.data.info + "</span>",
              classes: "rounded red"
            });
          }
        }).catch(err => {
          M.toast({
            html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
            classes: "rounded red"
          });
        })
      }
    }
  }
</script>

<style scoped>
  .col .row {
    margin-right: 0;
  }

  .modal {
    width: 40%;
    min-width: 40%;
  }

  .modal .row {
    margin-bottom: 0;
  }
</style>
