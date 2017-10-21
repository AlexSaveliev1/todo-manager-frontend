import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const { id } = params;

    return {
      group: this.store.peekRecord('group', id),
      tasks: this.store.peekAll('task').filter(task => task.get('group') === Number(id) && !task.get('finishedAt'))
    };
  }
});
