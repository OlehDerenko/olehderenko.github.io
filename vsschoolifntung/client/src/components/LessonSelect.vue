<template>
  <v-select
    label="Виберіть Предмет"
    :items="lessons"
    :loading="props.loading"
    v-model="lessonId"
  />
</template>
<script setup>
import { ref, defineEmits, computed, watch } from "vue";
import { state } from "@/store/user";

const lessons = computed(() =>
  state.user.metadata.lessons.map((lesson) => ({
    title: lesson.name,
    value: lesson.lesson_id,
  }))
);

console.log(lessons);

const lessonId = ref("");

const emit = defineEmits(["select"]);

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false,
  },
});

watch(lessonId, async (value) => {
  if (value) {
    emit(
      "select",
      lessons.value.find((c) => c.value === value)
    );
  }
});
</script>
