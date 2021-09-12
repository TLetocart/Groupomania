<template>
  <div class="home">
    <p>test</p>
  </div>
</template>

<script>

  export default {
    name: 'Home',

    data() {
      return{
        connected: true
      };
    },
    created(){
      this.checkConnected()
    },
    methods: {
      checkConnected(){
        if(localStorage.user !== undefined){
          this.connected = true;
          console.log('Utilisateur connecté !');
        }
        else if(localStorage.user == undefined){
          this.connected = false;
          console.log('Utilisateur non connecté !');
        }
      }
    }
  }
</script>