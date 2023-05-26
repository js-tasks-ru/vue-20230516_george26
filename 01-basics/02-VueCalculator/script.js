import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const App = defineComponent({
  name: 'App',

  data () {
    return {
      operand1: '',
      operand2: '',
      operator: 'sum',
    }
  },
  computed: {
    calculate () {
      const operations = {
       sum: (() => this.operand1 + this.operand2)(),
       subtract: (() => this.operand1 - this.operand2)(),
       multiply: (() => this.operand1 * this.operand2)(),
       divide: (() => this.operand1 + this.operand2)(),
      }

      return operations[this.operator];
    },
  }
});

const app = createApp(App);

const vm = app.mount('#app');
