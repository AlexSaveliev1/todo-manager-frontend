import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const { id } = params;

    return {
      task: this.store.peekRecord('task', Number(id)),
      subtasks: this.store.peekAll('subtask').filter(subtask => subtask.get('task') === Number(id))
    };
  }
});
