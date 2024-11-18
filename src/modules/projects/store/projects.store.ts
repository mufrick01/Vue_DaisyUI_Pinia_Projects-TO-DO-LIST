import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (projectName: string) => {
    if (projectName.trim().length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: projectName,
      task: [],
    });
  };

  return {
    // properties
    projects,
    // getter
    projectList: computed(() => [...projects.value]),
    isEmpty: computed(() => projects.value.length === 0),
    // actions
    addProject,
  };
});
