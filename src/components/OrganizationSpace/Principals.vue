<template>
  <div class="row">
    <div class="col s6 m4 l3" v-for="(one, index) in principals" v-bind:key="index">
      <div class="card">
        <div class="card-content center-align">
          <h5>{{ one.name }}</h5>
        </div>
      </div>
    </div>
    <div class="col s6 m4 l3">
      <div class="card">
        <div class="card-content center" style="height: 200px">
          <i class="material-icons">add</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Principals",
    data: function () {
      return {
        principals: []
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
    }
  }
</script>

<style scoped>
.col .row {
  margin-right: 0;
}
</style>
