<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-b-blue-500">
        <!-- header modal -->
        <slot name="header"></slot>
      </div>
      <div class="my-5">
        <slot name="body"></slot>
      </div>
      <div class="border-t border-t-blue-500 mt-5">
        <slot name="action"></slot>
      </div>

    </div>
  </dialog>
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean
}

withDefaults(defineProps<Props>(), {
  open: false
})
</script>
