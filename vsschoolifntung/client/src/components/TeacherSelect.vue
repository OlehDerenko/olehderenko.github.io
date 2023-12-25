<template>
  <v-select
    label="Виберіть Вчиителя"
    :items="computedTeachers"
    :loading="props.loading"
    v-model="teacherId"
  />
</template>
<script setup>
import { ref, defineEmits, watch, onMounted } from "vue";
import http from "@/services/http";
import { computed } from "vue";

const teacherId = ref("");
const teachers = ref([]);

const handleGetTeachers = async () => {
  const response = await http.get("/admin/teachers");

  teachers.value.push(...response.data);
};

const emit = defineEmits(["select"]);

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false,
  },
});

watch(teacherId, async (value) => {
  console.log(value);
  if (value) {
    emit(
      "select",
      teachers.value.find((c) => c.id === value)
    );
  }
});

const computedTeachers = computed(() => {
  return teachers.value.map((t) => ({
    title: `${t.full_name} - ${t.subject}`,
    value: t.id,
  }));
});

onMounted(() => {
  handleGetTeachers();
});
</script>
