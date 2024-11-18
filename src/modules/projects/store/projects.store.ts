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
      tasks: [],
    });
  };

  const addNewTaskToProject = (projectId: string, taskName: string) => {
    const project = projects.value.find((project) => project.id === projectId);

    if (!project || taskName.trim().length === 0) return;

    project.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  const toogleTaskStatus = (projectId: string, taskId: string) => {
    const project = projects.value.find((project) => project.id === projectId);
    if (!project) return;

    const task = project.tasks.find((task) => task.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : dateToString();
  };

  const dateToString = (): string => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0'); // Día (DD)
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes (MM) - Enero es 0
    const anio = fecha.getFullYear(); // Año (YYYY)

    const horas = String(fecha.getHours()).padStart(2, '0'); // Horas (HH)
    const minutos = String(fecha.getMinutes()).padStart(2, '0'); // Minutos (MM)

    return `${dia}/${mes}/${anio} | ${horas}:${minutos}`;
  };

  return {
    // properties
    projects,
    // getter
    projectList: computed(() => [...projects.value]),
    isEmpty: computed(() => projects.value.length === 0),
    projectsListWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const total = project.tasks.length;
        const completed = project.tasks.filter((task) => task.completedAt).length;

        const completion = total === 0 ? 0 : (completed / total) * 100;

        return {
          id: project.id,
          name: project.name,
          taskCount: total,
          completion: Math.round(completion),
        };
      });
    }),
    // actions
    addProject,
    addNewTaskToProject,
    toogleTaskStatus,
  };
});
