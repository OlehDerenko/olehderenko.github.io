<template>
  <form @submit.prevent="handleUploadBook">
    <v-text-field required label="Введіть Назву" name="title" />
    <v-file-input label="Виберіть Файл" name="file" />

    <v-btn variant="tonal" class="bg-primary" type="submit">
      Завантажити
    </v-btn>
  </form>
</template>
<script setup>
const emit = defineEmits(["upload"]);

const handleUploadBook = (e) => {
  const formData = new FormData(e.target);

  emit("upload", formData);
};
</script>
