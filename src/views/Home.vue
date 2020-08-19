<template>
  <div>
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <h3>This is a dummy home page</h3>
    <v-row class="px-3">
      <v-col cols="6" md="2">
        <v-btn to="/party/list">ปาร์ตี้ทั้งหมด</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
