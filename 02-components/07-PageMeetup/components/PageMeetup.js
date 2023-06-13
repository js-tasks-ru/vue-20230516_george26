import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },

  data() {
    return  {
      meetup: null,
      options: {
        state: null,
        error: null,
      },
    };
  },

  watch: {
    meetupId: {
      handler() {
        this.options.state = 'loading';
        fetchMeetupById(this.meetupId)
        .then((meetup) => {
          this.meetup = meetup;
          this.options.state = 'loaded';
        })
        .catch((error) => {
          this.options.error = error.message;
          this.options.state = 'failed';
        })
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <UiContainer>
        <UiAlert v-if="options.state === 'loading'">Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer>
        <UiAlert v-if="options.state === 'failed'">{{ options.error }}</UiAlert>
      </UiContainer>
      <MeetupView  v-if="options.state === 'loaded'" :meetup="meetup" />
    </div>`,
});
