<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="(project, index) in projectStore.projectsListWithCompletion" :key="project.id" class="hover">
          <th>{{ index + 1 }}</th>
          <RouterLink :to="{ name: 'project', params: { id: project.id } }">
            <td>
              {{ project.name }}
            </td>
          </RouterLink>
          <td>{{ project.taskCount }}</td>
          <td class="">
            {{ project.completion }}
            <progress class="progress progress-primary" :value="project.completion" max="100"></progress>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- InputModal -->
  <InputModal :open="modalOpen" @close="modalOpen = false" @value="projectStore.addProject"
    placeholder="Ingrese nombre del proyecto" title="Nuevo Proyecto" />

  <!-- CustomModal -->

  <CustomModal :open="customModalOpen">
    <template #header>
      <h2>slot header</h2>
    </template>
    <template #body>
      <h2>slot body</h2>
    </template>
    <template #action>
      <form class="mt-5" @submit.prevent="onSubmit">
        <input type="text" v-model="customInputValue" class="input input-bordered input-primary w-full flex-1"
          placeholder='Ingrese un valor'>
        <div class="flex justify-end mt-5">
          <button type="button" @click="customModalOpen = false" class="btn mr-4">Cerrar</button>
          <button type="submit" class="btn btn-primary">Aceptar</button>
        </div>
      </form>
    </template>
  </CustomModal>

  <!-- FabButton -->
  <FabButton @click="modalOpen = true">
    <AddCircleIcon />
  </FabButton>

  <!-- FabButton for custom modal -->
  <FabButton @click="customModalOpen = true" position="bottom-left">
    <AddSquareIcon />
  </FabButton>
</template>

<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircleIcon from '@/modules/common/icons/AddCircleIcon.vue';
import AddSquareIcon from '@/modules/common/icons/AddSquareIcon.vue';
import { ref } from 'vue';
import { useProjectsStore } from '../store/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const customInputValue = ref('');

const projectStore = useProjectsStore();


const onSubmit = () => {
  if (!customInputValue.value.trim()) {
    return;
  }
  console.log(customInputValue.value)
  customInputValue.value = '';
}

</script>
