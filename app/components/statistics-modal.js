import Ember from 'ember';

const TIME_FORMAT = 'm [min], h [hours], d [days], M [months]';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  timeManager: Ember.inject.service(),

  completed: Ember.computed('tasks', function () {
    return this.get('tasks').filter(task => task.get('finishedAt')).length;
  }),

  summaryEstimated: Ember.computed('tasks', function () {
    const tasks = this.get('tasks'),
      summaryEstimatedMs = tasks.reduce((sum, task) => {
        const { createdAt, dueDate } = task.getProperties('createdAt', 'dueDate');

        if (dueDate && dueDate >= createdAt) {
          sum += (dueDate - createdAt);
        }

        return sum;
      }, 0);

    return this.get('timeManager').getDuration(summaryEstimatedMs, TIME_FORMAT);
  }),

  summaryRemaining: Ember.computed('tasks', function () {
    const tasks = this.get('tasks'),
      summaryRemainingMs = tasks.reduce((sum, task) => {
        const dueDate = task.get('dueDate'),
          now = this.get('timeManager').now(),
          remainingMs = dueDate - now;

        if (remainingMs >= 0) {
          sum += remainingMs;
        }

        return sum;
      }, 0);

    return this.get('timeManager').getDuration(summaryRemainingMs, TIME_FORMAT);
  }),

  actions: {
    close() {
      this.sendAction('onClose');
    }
  }
});
