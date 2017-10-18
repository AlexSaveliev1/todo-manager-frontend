import Ember from 'ember';

export default Ember.Route.extend({
  timeManager: Ember.inject.service(),

  model() {
    const todayMidnightMs = this.get('timeManager').getTodayMidnightMs();

    return {
      tasks: this.store.peekAll('task').filter(task => task.get('dueDate') === todayMidnightMs)
    };
  }
});
