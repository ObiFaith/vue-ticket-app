<template>
  <main class="container bg-white grid place-items-center px-6 py-16">
    <section class="lg:w-5/6 mx-auto justify-between lg:flex">
      <div class="lg:w-5/12 text-center">
        <!-- Logo -->
        <Logo />

        <div class="pb-7 pt-10 lg:pb-10">
          <h1 class="text-xl md:text-2xl font-semibold">Create Account</h1>
          <p>
            Welcome to <span className="text-primary-400">Tixly</span> — Let's
            get you started!
          </p>
        </div>

        <!-- Form -->
        <form
          @submit.prevent="handleSubmit(onSubmit)"
          class="grid gap-4 max-w-sm lg:max-w-md mx-auto"
        >
          <div v-for="field in SignupFields" :key="field.name">
            <Input
              v-model="values[field.name]"
              :label="field.label"
              :type="field.type"
              :name="field.name"
              :placeholder="field.placeholder"
              :error="errors[field.name]"
            />
          </div>

          <button class="my-6" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? "Creating account..." : "Sign Up" }}
          </button>
        </form>

        <p>
          Already have an account?
          <RouterLink
            to="/auth/login"
            class="text-primary-400 hover:text-primary-600 hover:underline"
          >
            Login
          </RouterLink>
        </p>
      </div>

      <div class="lg:w-1/2 max-lg:hidden flex justify-end items-center">
        <img
          class="w-full"
          src="../assets/oc-on-the-laptop.svg"
          alt="A man on his laptop using Tixly"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../store/auth";
import { useForm } from "vee-validate";
import { Logo, Input } from "../components";
import { apiUrl } from "../constant";
import { SignupFields, SignupValues, SignupSchema } from "../form";

// Setup
const router = useRouter();
const toast = useToast();
const auth = useAuthStore();

// Initialize vee-validate form
const { handleSubmit, errors, isSubmitting, values, resetForm } = useForm({
  validationSchema: SignupSchema,
  initialValues: SignupValues,
});

// Submit logic
const onSubmit = async values => {
  try {
    const { data } = await axios.post(`${apiUrl}/api/v1/auth/register`, values);
    localStorage.setItem("token", data.token);
    auth.setUser(data.user);
    resetForm();
    toast.success(data.message);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  } catch (error) {
    toast.error(error.response?.data?.message || "Please try again later!");
  }
};
</script>
