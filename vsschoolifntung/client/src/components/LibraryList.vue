<template>
  <v-card class="mx-auto">
    <v-toolbar color="primary" height="88" flat class="px-5">
      <v-text-field
        v-model="search"
        hide-details
        label="Пошук у бібліотеці"
        prepend-inner-icon="mdi-magnify"
        single-line
      ></v-text-field>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list lines="three">
      <v-list-item
        class="d-flex align-center justify-space-between w-100"
        v-for="(item, i) in filteredBooks"
        :key="i"
        link
      >
        <template v-slot:prepend>
          <v-icon class="mt-2"> mdi-book </v-icon>
          <v-list-item-title
            class="text-uppercase font-weight-regular text-caption ml-5 mt-3"
            v-text="item.title"
          ></v-list-item-title>
        </template>

        <template v-slot:append>
          <v-btn
            icon="mdi-download"
            @click="handleDownloadBook(item)"
            color="primary"
          />

          <v-btn
            class="ml-3"
            v-if="props.canDeleteBooks"
            icon="mdi-delete"
            @click="handleDeleteBook(item)"
            color="red"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup>
import { ref, computed } from "vue";
import http from "@/services/http";

const props = defineProps({
  canDeleteBooks: {
    type: Boolean,
    default: false,
  },
  books: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["book-deleted"]);

const search = ref("");

const handleDownloadBook = (item) => {
  const link = document.createElement("a");
  link.setAttribute("download", "true");
  link.href = `http://localhost:3001/${item.file}`;
  link.click();
};

const handleDeleteBook = async (item) => {
  try {
    await http.post("/library/delete", item);
    emit("book-deleted");
  } catch (e) {
    return [];
  } finally {
  }
};

const filteredBooks = computed(() =>
  props.books.filter((book) =>
    book.title.toLowerCase().trim().includes(search.value.toLowerCase().trim())
  )
);
</script>
