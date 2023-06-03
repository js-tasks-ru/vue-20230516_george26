<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->

<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" @click="previousMonth()" aria-label="Previous month"></button>
        <div class="calendar-view__date">{{ normalDate }}</div>
        <button class="calendar-view__control-right" type="button" @click="nextMonth()" aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div class="calendar-view__cell calendar-view__cell_inactive"
        v-for="value in previousMonthInCalendar"
        tabindex="0"
        :key="value"
      >
        <div class="calendar-view__cell-day">{{ value }}</div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <div class="calendar-view__cell" tabindex="0" v-for="number in lastDateOfMonth" :key="number">
        <div class="calendar-view__cell-day"> {{ number }}</div>
        <div class="calendar-view__cell-content"
          v-for="meetup in IsMeetupinDay(number)"
          :key="meetup"
        >
        <a :href="`/meetups/${meetup.id}`" class="calendar-event">{{ meetup.title }}</a>
        </div>
      </div>
      <div class="calendar-view__cell calendar-view__cell_inactive" tabindex="0" v-for="day in nextMonthCalendar" :key="day">
        <div class="calendar-view__cell-day">{{ day }}</div>
        <!-- <div class="calendar-view__cell-content"></div> -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MeetupsCalendar',

  data() {
    return {
      currentDate: new Date(),
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  computed: {

    normalDate() {
      return this.currentDate.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },

    firstDayOfMonth() {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDay();
    },

    lastDateOfMonth() {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
    },

    lastDayOfMonth() {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.lastDateOfMonth - 1).getDay();
    },

    lastDateOfPreviousMonth() {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    },

    previousMonthInCalendar() {
       let previousDaysinCalendar = [];
       for (let i = this.firstDayOfMonth; i > 0; i--) {
        previousDaysinCalendar.push(this.lastDateOfPreviousMonth - i + 1);
    }
      return previousDaysinCalendar;
    },

    nextMonthCalendar() {
      let nextDaysinCalendar = [];
      for (let i = this.lastDayOfMonth; i < 6; i++) {

        nextDaysinCalendar.push(i - this.lastDayOfMonth + 1);
      }
      console.log(this.lastDayOfMonth);
      console.log(this.lastDateOfMonth);
    return nextDaysinCalendar;
    },
  },

  methods: {
    nextMonth() {
      return this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    },

    previousMonth() {
      return this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    },

    IsMeetupinDay(value) {
      const dateInCalendar = new Date(this.currentDate.getFullYear() ,this.currentDate.getMonth(), value, 3, 0, 0, 0).getTime();
       const flt = this.meetups.filter(({ date }) => date === dateInCalendar);
       return flt;
    }
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
