<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card>
          <v-row no-gutters class="bg-primary">
            <v-col class="pl-2">
              <v-tabs v-model="tab">
                <v-tab value="one">Розклад</v-tab>
                <v-tab value="two">Бібліотека</v-tab>
                <v-tab value="three">Навчально-методична інформація</v-tab>
              </v-tabs>
            </v-col>
            <v-col class="d-flex justify-end align-center pr-2">
              <v-menu min-width="200px" rounded>
                <template v-slot:activator="{ props }">
                  <v-btn icon v-bind="props" color="green" size="40">
                    <v-avatar color="white">
                      <span
                        class="text-h6 d-flex justify-center align-center text-primary"
                        >{{ state.user.email.charAt(0).toUpperCase() }}</span
                      >
                    </v-avatar>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <div class="mx-auto text-center">
                      <v-avatar color="primary">
                        <span class="text-h6">{{
                          state.user.email.charAt(0).toUpperCase()
                        }}</span>
                      </v-avatar>
                      <h3 class="mt-3">{{ state.user.full_name }}</h3>
                      <p class="text-caption mt-1">{{ state.user.email }}</p>
                      <v-divider class="my-3"></v-divider>
                      <v-btn
                        @click="logOut"
                        class="bg-primary-subtle"
                        color="primary"
                        >Вихід</v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="one">
                <Schedule :items="schedule" />
              </v-window-item>

              <v-window-item value="two">
                <LibraryList :books="books" />
              </v-window-item>

              <v-window-item value="three">
                <h1 class="text-h5 mb-5">
                  Виберіть предмет для перегляду навчально-методичної інформації
                </h1>

                <LessonSelect @select="handleSelectTrainingMaterials" />

                <v-list lines="three">
                  <v-list-item
                    class="d-flex align-center justify-space-between w-100"
                    v-for="(item, i) in trainingMaterials"
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
                        @click="handleDownloadTrainingMaterial(item)"
                        color="primary"
                      />
                    </template>
                  </v-list-item>
                </v-list>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import http from "@/services/http";
import Schedule from "@/components/Schedule.vue";
import { useRouter } from "vue-router";
import { state } from "@/store/user";
import LibraryList from "@/components/LibraryList.vue";
import LessonSelect from "@/components/LessonSelect.vue";

const tab = ref(window.location.hash.replace("#", "") || "");
const schedule = ref([]);
const isLoading = ref(false);
const router = useRouter();
const books = ref([]);
const trainingMaterials = ref([]);
const selectLesson = ref(null);

const getClassSchedule = async () => {
  try {
    isLoading.value = true;
    const scheduleResponse = await http.get("/schedule/student");
    schedule.value.push(...scheduleResponse.data.schedule);
  } catch (e) {
    return [];
  } finally {
    isLoading.value = false;
  }
};

const logOut = () => {
  localStorage.removeItem("token");
  router.push({ name: "Login" });
};

const getLibraryBooks = async () => {
  try {
    const booksResponse = await http.get("/library");
    books.value.push(...booksResponse.data);
  } catch (e) {
    return [];
  }
};

const handleSelectTrainingMaterials = async ({ value }) => {
  console.log(value);
  const trainingMaterialsResponse = await http.get(
    `/training-materials/${state.user.metadata.student.class_id}/${value}`
  );

  selectLesson.value = value;

  trainingMaterials.value = [];
  trainingMaterials.value.push(...trainingMaterialsResponse.data);
};

const handleDownloadTrainingMaterial = (item) => {
  const link = document.createElement("a");
  link.setAttribute("download", "true");
  link.href = `http://localhost:3001/${item.file}`;
  link.click();
};

onMounted(() => {
  getClassSchedule();
  getLibraryBooks();
});

watch(tab, (tab) => {
  router.push(`/student#${tab}`);
});
</script>
