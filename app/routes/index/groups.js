import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {
      tasks: this.store.peekAll('task').filter(task => task.get('groupId') === Number(params.id))
    };
  }
});
