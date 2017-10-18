import Ember from 'ember';

export default Ember.Route.extend({
  timeManager: Ember.inject.service(),

  model() {
    const tasks = this.store.peekAll('task')
      .filter(task => {
        const taskDueDate = task.get('dueDate'),
          from = this.get('timeManager').getTodayMidnightMs(),
          to = this.get('timeManager').getMidnightMsAfterWeek();

        if (taskDueDate >= from && taskDueDate <= to) {
          return task;
        }
      });

    return {
      tasks
    };
  }
});
