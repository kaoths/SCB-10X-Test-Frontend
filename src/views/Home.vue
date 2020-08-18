<template>
  <div>
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <v-row justify="space-between" align="start">
      <v-col>
        <v-btn to="/party/list">ปาร์ตี้ทั้งหมด</v-btn>
      </v-col>
      <v-col>
        <v-btn>สร้างปาร์ตี้</v-btn>
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
