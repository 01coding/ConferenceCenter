<template>
  <div>
    <div></div>
    <ul class="collapsible" id="collaps">
      <li v-for="data in apply">
        <div class="collapsible-header active"><i class="material-icons">filter_drama</i>{{apply.data.name}}</div>
        <div class="collapsible-body"><p>{{apply.data[applyNumber].location}}</p></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import NavBar from "@/include/NavBar";
  export default {
    name:"ReviewApplication",
    components:{NavBar},
    data: function() {
      return {
        applyNumber: 0,
        apply: {
          data: {}
        }
      }
    },

    methods: function() {

    },

    created: function() {
      $(document).ready(function(){
        $('#collaps').collapsible();
      });

      this.$test.post('/review/application').then(response => {
        for(var i=0; i<response.data.length; i++) {
          this.apply.data = response.data[i];
          this.applyNumber = i;
          console.log(response.data[i]);
        }
      }).catch(error => {
        console.log(1);
      });
    }
  }

</script>



















