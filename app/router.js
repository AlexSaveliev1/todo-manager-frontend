import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('index', { path: '/' }, function () {
    this.route('inbox');
    this.route('today');
    this.route('week');
    this.route('filters', { path: 'filters/:priority' });
    this.route('groups', { path: 'groups/:id' });
  });
});

export default Router;
