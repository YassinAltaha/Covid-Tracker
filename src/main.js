import Vue from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
  screens: {
    tablet: '576px',
    laptop: '992px',
    desktop: '1200px',
  },
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
