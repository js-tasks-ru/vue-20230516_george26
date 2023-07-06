<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click.prevent="$emit('remove')">
      <UiIcon icon="trash" />
    </button>
    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="localAgendaItem.type" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput v-model="localAgendaItem.startsAt" @change="getTime" type="time" placeholder="00:00" name="startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput v-model="localAgendaItem.endsAt" @change="setInterval" type="time" placeholder="00:00" name="endsAt" />
        </UiFormGroup>
      </div>
    </div>

      <UiFormGroup :label="labelTitle">
        <UiInput name="title" v-model="localAgendaItem.title"/>
      </UiFormGroup>
      <UiFormGroup v-if="isTalk" label="Докладчик">
        <UiInput v-model="localAgendaItem.speaker" name="speaker" />
      </UiFormGroup>
      <UiFormGroup v-if="isTalk || isOther" label="Описание">
        <UiInput v-model="localAgendaItem.description" multiline name="description" />
      </UiFormGroup>
      <UiFormGroup v-if="isTalk" label="Язык">
        <UiDropdown v-model="localAgendaItem.language" title="Язык" :options="$options.talkLanguageOptions" name="language" />
      </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';
import { klona } from 'klona/json';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  data() {
    return {
      localAgendaItem: klona(this.agendaItem),
    }
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getTime() {
      const startsAt = this.parseTime(this.localAgendaItem.startsAt);
      const endsAt = {
        hours: (startsAt.hours + this.interval.hours) % 24,
        minutes: (startsAt.minutes + this.interval.minutes) % 60,
      };
      const resultEndTime = `${String(endsAt.hours).padStart(2, 0)}:${String(endsAt.minutes).padStart(2, 0)}`;

      this.localAgendaItem.endsAt = resultEndTime;
    },

    setInterval() {
      const startsAt = this.parseTime(this.localAgendaItem.startsAt);
      const endsAt = this.parseTime(this.localAgendaItem.endsAt);

      const intervalHours = endsAt.hours  - startsAt.hours;
      const intervalMinutes = endsAt.minutes - startsAt.minutes;

      this.interval = {
        hours: intervalHours,
        minutes: intervalMinutes,
      };
    },

    parseTime(value) {
      const [hours, minutes] = value.split(':');
      return {
        hours: Number(hours),
        minutes: Number(minutes),
      };
    },
  },

  computed: {
    isTalk() {
      return this.localAgendaItem.type === 'talk';
    },

    isOther() {
      return this.localAgendaItem.type === 'other';
    },

    labelTitle() {
      switch(this.localAgendaItem.type) {
        case 'talk':
          return 'Тема';
        case 'other':
          return 'Заголовок';
        default:
          return 'Нестандартный текст (необязательно)';
      }
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', klona(newValue));
      }
    },
  },

  emits: ['update:agendaItem', 'remove'],

  created() {
    this.setInterval();
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
