<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card>
          <v-row no-gutters class="bg-primary">
            <v-col class="pl-2">
              <v-tabs v-model="tab">
                <v-tab value="one">Вчителі</v-tab>
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
                <TeacherSelect @select="handleSelectTeacher" />

                <p class="text-h6" v-if="teacher">
                  Вчитель провів {{ lessons.length }} уроків за тиждень
                </p>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, watch } from "vue";
import http from "@/services/http";
import { useRouter } from "vue-router";
import { state } from "@/store/user";
import TeacherSelect from "@/components/TeacherSelect.vue";

const tab = ref(window.location.hash.replace("#", "") || "");
const router = useRouter();
const lessons = ref([]);
const teacher = ref(null);

const logOut = () => {
  localStorage.removeItem("token");
  router.push({ name: "Login" });
};

const handleSelectTeacher = async (t) => {
  const response = await http.get(`/admin/teachers/${t.id}`);

  lessons.value = [];
  lessons.value.push(...response.data.lessons);
  teacher.value = response.data.teacher;

  console.log(teacher.value);
};

watch(tab, (tab) => {
  router.push(`/admin#${tab}`);
});
</script>
