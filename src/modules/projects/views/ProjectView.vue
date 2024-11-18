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
            <tr class="hover">
              <th>1</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
            <!--  -->
            <tr class="hover">
              <th></th>
              <td><input
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

watch(() => props.id, () => {

  project.value = projectStore.projectList.find(p => p.id === props.id);
  if (!project.value) {
    return router.replace({ name: 'home' })
  }
}, { immediate: true })


</script>
