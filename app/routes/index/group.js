import Ember from 'ember';

export default Ember.Route.extend({
  groupManager: Ember.inject.service(),

  controllerName: 'index.task-board',
  templateName: 'index.task-board',

  model(params) {
    return RSVP.hash({
      groups: this.get('groupManager').getOne(params.id)
    });
  }
});
