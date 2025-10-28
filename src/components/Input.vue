<template>
  <div class="grid gap-1 text-left">
    <!-- Label -->
    <label v-if="label" class="block" :for="name">
      {{ label }}
    </label>

    <!-- Error: show only if error && touched -->
    <div v-if="error && touched" class="text-red-600 text-sm">
      {{ error }}
    </div>

    <!-- Input -->
    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary-400"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  name: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  error: String,
  touched: Boolean,
  modelValue: [String, Number],
});

defineEmits(["update:modelValue", "blur"]);
</script>
