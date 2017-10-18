import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      title: `Priority ${params.priority}`,
      tasks: this.store.peekAll('task').filter(task => task.get('priority') === Number(params.priority))
    };
  }
});
