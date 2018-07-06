<template>
  <div>
    <div class="row" style="height: 1rem;"></div>
    <div class="row">
      <form class="col s10 offset-s1">
        <div class="row">
          <div class="input-field col s8">
            <i class="material-icons prefix">email</i>
            <input disabled id="icon_telephone" type="email" class="validate">
            <label for="disabled">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_origin" type="password" class="validate">
            <label for="password">Password</label>
          </div>
          <div class="col s4" style="margin-top: 2.4rem;">
            请输入原来的旧密码
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_first" type="password" class="validate">
            <label for="password">Password</label>
          </div>
          <div class="col s4" style="margin-top: 2.4rem;">
            请输入新的密码
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <i class="material-icons prefix">vpn_key</i>
            <input id="password_second" type="password" class="validate">
            <label for="password">Password</label>
          </div>
          <div class="col s4" style="margin-top: 2.4rem;">
            请再次确认密码
          </div>
        </div>
        <div class="row center-align">
          <div class="btn-large blue darken-1" @click="submit">
            <i class="material-icons left">send</i>
            提交
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
    export default {
      name: "Account",
      data: function() {

      }
    }
</script>

<style scoped>

</style>
