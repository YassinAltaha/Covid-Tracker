<template>
  <div id="app">
    <label for="prov">Choose a Province:</label>

    <select name="prov" v-model="prov">
      <option value="none" selected disabled hidden>
        Select an Option
      </option>
      <option value="canada">Entire Canada</option>
      <option value="AB">Alberta</option>
      <option value="BC">British Columbia </option>
      <option value="MB">Manitoba</option>
      <option value="NB">New Brunswick</option>
      <option value="NL">Newfoundland and Labrador</option>
      <option value="NT">Northwest Territories</option>
      <option value="NS">Nova Scotia</option>
      <option value="NU">Nunavut</option>
      <option value="ON">Ontario</option>
      <option value="PE">Prince Edward Island</option>
      <option value="QC">Quebec</option>
      <option value="SK">Saskatchewan</option>
      <option value="YT">Yukon</option>
      <option value="RP">Repatriated</option>
    </select>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent>
      <div class="mb-4">
        <span class="block text-gray-600 text-sm text-left font-bold mb-2"
          >Select Range</span
        >
        <vc-date-picker v-model="range" mode="date" :masks="masks" is-range>
          <template v-slot="{ inputValue, inputEvents, isDragging }">
            <div class="flex flex-col sm:flex-row justify-start items-center">
              <div class="relative flex-grow">
                <input
                  class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                />
              </div>
              <span class="flex-shrink-0 m-2"> </span>
              <div class="relative flex-grow">
                <input
                  class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                />
              </div>
            </div>
          </template>
        </vc-date-picker>
      </div>
    </form>
    <HelloWorld v-bind:loc="prov" v-bind:date="range" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data() {
    return {
      prov: "canada",

      range: {
        start: this.getYesterday(),
        end: new Date(),
      },
      masks: {
        input: "YYYY-MM-DD",
      },
    };
  },
  methods: {
    getYesterday() {
      let today = new Date();
      let yesterday = new Date(today);

      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    },
  },
  components: {
    HelloWorld,
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100vh;
}
</style>
