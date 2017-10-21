import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const { priority } = params;

    return {
      title: `Priority ${priority}`,
      tasks: this.store.peekAll('task').filter(task => task.get('priority') === Number(priority) && !task.get('finishedAt')),
      defaultPriority: priority
    };
  }
});
