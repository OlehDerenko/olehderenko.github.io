<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { state } from "@/store/user";
import http from "@/services/http";

const getUser = async () => {
  if (state.user) return;

  const userResponse = await http.get("/me");
  state.user = userResponse.data;
};

const getAllClasses = async () => {
  if (state.classes.length) return;

  const classesResponse = await http.get("/classes");
  state.classes = classesResponse.data;
};

onMounted(() => {
  getUser();
  getAllClasses();
});
</script>
