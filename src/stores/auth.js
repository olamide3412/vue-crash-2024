import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore("authStore",{
    state:()=>{
        return {
            user: null,
            errors: {},
        }
    },
    actions:{
        //Get authenticated user
        async getUser(){
            if(localStorage.getItem('token')){
                try {
                    const res = await axios.get('/api/user', {
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
    
                    const data =  res.data;
                    this.user = data;
                } catch (error) {
                    console.error('Error authenticating user',error);
                    const Toast = useToast();
                    Toast.error('Error retriving user data');
                }
                
            }
        },
        //Login or register
         authenticate(apiRoute, formData, isLoading){
            isLoading.value = true;
            const toast = useToast();
             axios.post(`/api/${apiRoute}`, formData)
             .then(response => {
                if(response.data.errors){
                    this.errors = response.data.errors;
                }else{
                    this.errors = {};
                    localStorage.setItem('token', response.data.token);
                    this.user = response.data;
                    toast.success('Login successful');
                    this.router.push({name:'home'});
                    
                }
                isLoading.value = false;
             }).catch(error => {
                    console.error('Error authenticating user', error);
                    
                    toast.error('Error occured');
                    isLoading.value = false;
             });
        },
        //Logout
        async logout(){
            try {
                const res = await axios.post('/api/logout', null, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if(res.status === 200){
                    const toast = useToast();
                    toast.success('You have successfully logout');
                    this.user = null;
                    this.errors = {};
                    localStorage.removeItem('token');
                    this.router.push({ name:'login' });

                }
            } catch (error) {
                console.error('Error', error);
                
            }
            
        }
    }
})