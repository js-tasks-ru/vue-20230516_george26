import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },

  },

  computed: {
    viewIcon() {
      return agendaItemIcons[this.agendaItem['type']];
    },

    viewTitle() {
      return this.agendaItem.title !== null ? this.agendaItem.title : agendaItemDefaultTitles[this.agendaItem['type']];
    },

    viewDescription() {
      return this.agendaItem.description ?? '';
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="\`/assets/icons/icon-\${viewIcon}.svg\`" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ viewTitle }}</h3>
        <p class="agenda-item__talk" v-if="agendaItem.type === 'talk'">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang"> {{ agendaItem.language }}</span>
        </p>
        <p>{{ viewDescription }}</p>
      </div>
    </div>`,
});
