<template>
  <div class="grid gap-1 text-left">
    <label v-if="label" class="block" :for="name">
      {{ label }}
    </label>

    <div v-if="error && touched" class="text-red-600 text-sm">
      {{ error }}
    </div>

    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      @blur="handleBlur"
      class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary-400"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  name: String,
  type: { type: String, default: "text" },
  placeholder: String,
  error: String,
  touched: Boolean,
  value: [String, Number],
  onChange: Function,
  onBlur: Function,
});

const emit = defineEmits(["update:modelValue", "blur"]);

const handleInput = e => {
  const value = e.target.value;
  // Support both vee-validate and v-model
  if (props.onChange) {
    props.onChange(value);
  }
  emit("update:modelValue", value);
};

const handleBlur = e => {
  if (props.onBlur) {
    props.onBlur(e);
  }
  emit("blur");
};
</script>
