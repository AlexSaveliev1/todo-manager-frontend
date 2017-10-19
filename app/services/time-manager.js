import Ember from 'ember';

const DAYS_IN_WEEK = 7,
  DATE_AFTER_WEEK = moment().add(DAYS_IN_WEEK, 'd');

export default Ember.Service.extend({
  getMidnightMsOfDate(date) {
    return moment(date).startOf('day').valueOf();
  },

  getTodayMidnightMs() {
    return moment().startOf('day').valueOf();
  },

  convertMsToDate(ms, format) {
    return moment(ms).format(format);
  },

  getCurrentYear() {
    return moment().year();
  },

  getMidnightMsAfterWeek() {
    return this.getMidnightMsOfDate(DATE_AFTER_WEEK);
  },

  now() {
    return moment().valueOf();
  }
});
