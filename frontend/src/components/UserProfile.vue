<template>
    <div class="UserProfile">
        <div class="profile-info">
            <h2>Bonjour,</h2>
            <span>{{this.user.firstname}}</span> <span>{{this.user.lastname}}</span>
        </div>

        <div class="delete-profile" @click="deleteUser()">Supprimer le compte</div>

        <h3>Vos posts :</h3>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'UserProfile',
    data(){
        return{
            user : null
        }
    },
    mounted(){
        axios.get(`${this.$apiUrl}/auth/me`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.$token}`
              }
            })
        .then(response=>{
          this.user=response.data
        })
      },
    methods: {
      
      deleteUser(){
        const userId = this.user.id;
        axios.delete(`${this.$apiUrl}/auth/${userId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.$token}`
              }
            }
        )
       .then(localStorage.removeItem('user'))
       .then(location.href = "/");
      }
  }
}
</script>

<style scoped>
    .profile-info{
        margin: 50px auto;
        max-width: 800px;
        /* text-align: left; */
    }
    .profile-info h2 {
        margin-bottom: 20px;
        font-size: 3rem;
    }
    .profile-info span {
        font-size: 3rem;
    }
    .delete-profile{
      color: red;
      margin-bottom: 30px;
      font-size: 24px;
      cursor: pointer;
    }
</style>