import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('index', { path: '/' }, function () {
    this.route('task-board', { path: '/task-board' });
    // this.route('task-board', { path: '/task-board/:id' });
  });
});

export default Router;
