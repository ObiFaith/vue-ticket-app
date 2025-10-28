<template>
  <div
    :class="[
      'font-pacifico text-2xl tracking-wide text-primary-400',
      className,
    ]"
  >
    Tixly
  </div>
</template>

<script setup>
defineProps({
  className: {
    type: String,
    default: "",
  },
});
</script>
