import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Projects
    {
      path: '/',
      name: 'home',
      redirect: { name: 'projects' },
      component: () => import('@/modules/projects/layouts/ProjectsLayout.vue'),
      children: [
        {
          path: '/',
          name: 'projects',
          component: () => import('@/modules/projects/views/ProjectsView.vue'),
        },
      ],
    },
  ],
});

export default router;
