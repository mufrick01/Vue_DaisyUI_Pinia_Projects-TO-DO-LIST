<template>
  <div v-if="project" class="w-full">
    <section class="m-2">
      <BreadCrumbs :project-name="project?.name ?? 'No-Name'" />
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="(task) in project.tasks" :key="task.id" class="hover">
              <th> <input type="checkbox" @change="projectStore.toogleTaskStatus(project.id, task.id)"
                  class="checkbox checkbox-primary" :checked="!!task.completedAt"></th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <!--  -->
            <tr class="hover">
              <th></th>
              <td><input v-model="inputTaskName" @keypress.enter="newTask"
                  class="input input-primary w-full opacity-60 transition-all focus:opacity-100 hover:opacity-100"
                  type="text" placeholder="Nueva tarea"></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '../store/projects.store';
import { ref, watch } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { useRouter } from 'vue-router';


interface Props {
  id: string
}
const props = defineProps<Props>();
const router = useRouter();

const projectStore = useProjectsStore()

const project = ref<Project | undefined>();

const inputTaskName = ref('');

watch(() => props.id, () => {

  project.value = projectStore.projectList.find(project => project.id === props.id);
  if (!project.value) {
    return router.replace({ name: 'home' })
  }
}, { immediate: true })


const newTask = () => {

  if (!inputTaskName.value.trim()) return;
  if (!project.value) return;
  projectStore.addNewTaskToProject(project.value.id, inputTaskName.value.trim())

  inputTaskName.value = '';

}


</script>
