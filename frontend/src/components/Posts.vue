<template>
    <div class="forums">
        <div v-for = "forum in forums" :key="forum.id">
            <h3>{{forum.name}}</h3>
            <div class="posts">
                <article class="post" v-for = "post in forum.conversations" :key="post.id">
                    <router-link :to="{ name: 'Post', params: { id: post.id } }">
                        <div class="post-header">
                            <span class="post-info">Posté le {{dateFormat(post.createdAt)}} par {{post.user.firstname}} {{post.user.lastname}}</span>
                            <span class="post-modify" v-if="post.userId == $user.userId || $user.admin == 1">Modifier</span> 
                        </div>  
                        <h2 class="post-title">{{post.title}}</h2>
                        <div class="post-content" v-html="characterLimit(post)"></div>
                    </router-link>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Posts',
    data(){
        return {
            forums: [],
            visible: false
        }
    },
    mounted() {
        if(localStorage.user != undefined){
            this.getAllForums();
        }
        //Export de la fonction
        this.$root.$on('Posts', () => {
            this.getAllForums();
        });
    },
    methods: {
        getAllForums(){
            axios.get(`${this.$apiUrl}/forum/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.forums = res.data;
            })
        },
        characterLimit(post){
            const maxLength = 350;
            const content = post.messages[0].content;
            if(content.length > maxLength){
                return content.substring(0, maxLength - 3) + "...";
            } 
            else{
                return content;
            }
        },
        dateFormat(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            console.log(date);
            return event.toLocaleDateString('fr-FR', options);
        }
    }
}
</script>

<style scoped>
    .forums{
        margin: 0 auto;
        padding: 20px;
        max-width: 800px;
    }
    .post{
        position: relative;
        padding: 20px 20px 20px 30px;
        margin-bottom: 30px;
        border-left: 5px solid red;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
    }
    .post:hover{
        box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.2);
    }
    .post h2{
        margin-top: 7px;
    }
    .post-header{
        display: flex;
        justify-content: space-between;
        color: rgb(0, 0, 0);
        font-size: .8rem;
    }
    .post-modify{
        color: rgb(219, 17, 17);
        font-size: 1rem;
        font-weight: bold;
    }
    .post-title{
        color: red;
    }
    .post-content{
        font-size: .9rem;
    }
    h3{
        color: red;
        font-weight: bold;
        font-size: 2.5rem;
    }
</style>