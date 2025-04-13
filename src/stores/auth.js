import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import apiClient from '@/services/api';

export const useAuthStore = defineStore("authStore",{
    state:()=>{
        return {
            user: null,
            errors: {},
        }
    },
    persist: true,
    actions:{
        // In your auth.js
        async loadAuth() {
            const token = localStorage.getItem("token");
            if (token && !this.user) {
                try {
                    const res = await apiClient.get('/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    this.user = res.data;
                } catch (error) {
                    console.error('Error loading auth', error);
                    localStorage.removeItem('token');
                    this.user = null;
                }
            }
        },

        //Get authenticated user
        async getUser(){
            if(localStorage.getItem('token')){
                try {
                    const res = await apiClient.get('/user', {
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
    
                    const data =  res.data;
                    this.user = data;
                } catch (error) {
                    console.error('Error authenticating user',error);
                    const toast = useToast();
                    toast.error('Error retriving user data');
                }
                
            }

            console.log('getUser was called');
            
        },
        //Login or register
         authenticate(apiRoute, formData, isLoading){
            isLoading.value = true;
            const toast = useToast();
            apiClient.post(`/${apiRoute}`, formData)
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
                    if (error.response && error.response.data.errors) {
                        this.errors = error.response.data.errors;
                        Object.values(this.errors).forEach(errMsgArray => {
                            errMsgArray.forEach(msg => toast.error(msg));
                        });
                    } else {
                        toast.error('Error occurred. Please try again.');
                    }
                    isLoading.value = false;
             });
        },
        //Logout
        async logout(){
            try {
                const res = await apiClient.post('/logout', null, {
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