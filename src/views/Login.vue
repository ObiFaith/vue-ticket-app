<template>
  <main class="container bg-white grid place-items-center px-6 py-16">
    <section class="lg:w-5/6 mx-auto justify-between lg:flex">
      <div class="lg:w-5/12 text-center">
        <!-- Logo -->
        <Logo />

        <div class="pb-7 pt-10 lg:pb-10">
          <h1 class="text-xl md:text-2xl font-semibold">Login</h1>
          <p>Welcome back to <span class="text-primary-400">Tixly</span></p>
        </div>

        <!-- Form -->
        <form
          @submit.prevent="handleSubmit(onSubmit)"
          class="grid gap-4 max-w-sm lg:max-w-md mx-auto"
        >
          <Field
            v-for="field in LoginFields"
            :key="field.name"
            :name="field.name"
            v-slot="{ field: f, meta, errors }"
          >
            <Input
              v-bind="f"
              :error="errors[0]"
              :touched="meta.touched"
              :label="field.label"
              :type="field.type"
              :placeholder="field.placeholder"
            />
          </Field>

          <button class="my-6" type="submit">
            {{ isSubmitting ? "Signing in..." : "Log In" }}
          </button>
        </form>

        <p>
          Don't have an account?
          <RouterLink
            to="/auth/signup"
            class="text-primary-400 hover:text-primary-600 hover:underline"
          >
            Create Account
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
import { useForm, Field } from "vee-validate";
import { Logo, Input } from "../components";
import { apiUrl } from "../constant";
import { LoginFields, LoginValues, LoginSchema } from "../form";

const router = useRouter();
const toast = useToast();
const auth = useAuthStore();

// Submit logic
const onSubmit = async values => {
  console.log(values);
  try {
    const { data } = await axios.post(`${apiUrl}/api/v1/auth/login`, values);
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

// Vee-Validate form - pass onSubmit directly
const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: LoginSchema,
  initialValues: LoginValues,
});
</script>
