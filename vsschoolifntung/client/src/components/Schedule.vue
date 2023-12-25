<template>
  <div class="schedule-table">
    <v-data-table
      v-if="props.items.length"
      :headers="headers"
      :items="props.items"
      :group-by="groupBy"
      group-header="День"
      item-value="name"
      hide-headers
    >
      <template
        v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }"
      >
        <tr>
          <td :colspan="columns.length">
            <VBtn
              size="small"
              variant="text"
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              @click="toggleGroup(item)"
            ></VBtn>
            {{ item.value }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const groupBy = ref([
  {
    key: "day",
    title: "День",
  },
]);

const headers = ref([
  {
    title: "Предмет",
    key: "name",
    sortable: false,
    value: (t) => `Предмет: ${t.name}`,
  },
  {
    title: "Час",
    key: "time",
    sortable: false,
    value: (t) => `Час: ${t.time}`,
  },
]);
</script>
<style scoped>
.schedule-table >>> thead {
  display: none;
}

.schedule-table >>> .v-data-table-footer {
  display: none;
}
</style>
