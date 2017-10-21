import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      tasks: this.store.peekAll('task').filter(task => !task.get('group') && !task.get('finishedAt'))
    };
  }
});
