<template>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: { ToastMessages },
};
</script>
