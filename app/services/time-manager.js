import Ember from 'ember';

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
  }
});
