<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <h1 class="text-h2 mb-5">Авторизація користувача</h1>
        <form @submit.prevent="onSubmit">
          <v-text-field
            :disabled="isLoading"
            label="Пошта"
            placeholder="oleh-teacher@gmail.com"
            v-model="form.email"
            type="email"
          ></v-text-field>
          <v-text-field
            :disabled="isLoading"
            label="Пароль"
            v-model="form.password"
            type="password"
          ></v-text-field>
          <v-btn
            :loading="isLoading"
            variant="tonal"
            class="bg-primary"
            type="submit"
          >
            Увійти
          </v-btn>

          <p v-if="message" class="text-h6 text-red-darken-4 mt-4">
            {{ message }}
          </p>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { reactive, ref } from "vue";
import router from "@/router";
import http from "@/services/http";
import { state } from "@/store/user";

const form = reactive({
  email: "",
  password: "",
});

const message = ref("");

const isLoading = ref(false);

const onSubmit = async () => {
  try {
    isLoading.value = true;
    message.value = "";

    const tokenResponse = await http.post("/sign-in", form);

    const { token } = tokenResponse.data;

    localStorage.setItem("token", token);

    const userResponse = await http.get("/me");
    state.user = userResponse.data;

    if (state.user.role === "teacher") {
      router.push("/teacher");
      return;
    }

    if (state.user.role === "student") {
      router.push("/student");
      return;
    }

    if (state.user.role === "admin") {
      router.push("/admin");
      return;
    }
  } catch (e) {
    if (e.response.status === 401) {
      message.value = "Не правильна Пошта або Пароль";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
