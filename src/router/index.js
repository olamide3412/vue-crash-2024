import AddJobView from "@/views/job/AddJobView.vue";
import EditJobView from "@/views/job/EditJobView.vue";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/job/JobsView.vue";
import JobView from "@/views/job/JobView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { createRouter, createWebHistory } from "vue-router";
import EditCompanyView from "@/views/company/EditCompanyView.vue";
import CompaniesView from "@/views/company/CompaniesView.vue";
import CompanyView from "@/views/company/CompanyView.vue";



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobsView
        },
        {
            path: '/jobs/:id',
            name: 'job',
            component: JobView
        },
        {
            path: '/jobs/add',
            name: 'add-job',
            component: AddJobView
        },
        {
            path: '/jobs/edit/:id',
            name: 'edit-job',
            component: EditJobView
        },
        {
            path: '/companies',
            name: 'companies',
            component: CompaniesView
        },
        {
            path: '/company/:id',
            name: 'company',
            component: CompanyView
        },
        {
            path: '/companies/edit/:id',
            name: 'edit-company',
            component: EditCompanyView
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        }
    ]
})

export default router;
