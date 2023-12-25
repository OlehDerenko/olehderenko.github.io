<template>
  <v-select
    label="Виберіть Клас"
    :items="classes"
    :loading="props.loading"
    v-model="classId"
  />
</template>
<script setup>
import { ref, defineEmits, computed, watch } from "vue";
import { state } from "@/store/user";

const classes = computed(() =>
  state.classes.map((c) => ({ title: c.name, value: c.id }))
);

const classId = ref("");

const emit = defineEmits(["select"]);

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false,
  },
});

watch(classId, async (value) => {
  if (value) {
    emit(
      "select",
      classes.value.find((c) => c.value === value)
    );
  }
});
</script>
