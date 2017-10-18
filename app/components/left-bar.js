import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  router: Ember.inject.service('-routing'),
  timeManager: Ember.inject.service(),

  classNames: ['left-bar-wrapper', 'flex-25'],

  filters: Ember.computed(function () {
    return [{
      label: 'Inbox',
      icon: 'Inbox',
      tagName: 'li',
      className: 'left-bar-item',
      link: 'index.inbox'
    },
    {
      label: 'Today',
      icon: 'Today',
      tagName: 'li',
      className: 'left-bar-item',
      link: 'index.today'
    },
    {
      label: 'Next 7 days',
      icon: 'schedule',
      tagName: 'li',
      className: 'left-bar-item',
      link: 'index.week'
    }];
  }),

  menuTabs: Ember.computed('groups', function () {
    return [{
      title: 'Groups',
      groups: this.get('groups').map(group => Object.assign(group, { link: 'index.groups' }, { param: group.get('id') }))
    },
    {
      title: 'Filters',
      filters: [{
        title: 'Priority 1',
        link: 'index.filters',
        param: '1'
      },
      {
        title: 'Priority 2',
        link: 'index.filters',
        param: '2'
      },
      {
        title: 'Priority 3',
        link: 'index.filters',
        param: '3'
      }]
    }];
  }),

  actions: {
    addGroup(title) {
      const newGroup = this.get('store').createRecord('group', {
        title
      });
  
      return newGroup.save()
        .then(addedGroup => Object.assign(addedGroup, { link: 'index.groups' }, { param: addedGroup.get('id') }))
        .then(group => this.get('menuTabs.firstObject.groups').pushObject(group))
        .then(() => this.set('isAddGroupFormVisible', false));
    },

    saveGroup(item) {
      return item.save()
        .then(() => this.set('isAddGroupFormVisible', false));
    },

    deleteGroup(item) {
      item.deleteRecord();
      item.save()
        .then(group => this.get('menuTabs.firstObject.groups').removeObject(group));
    }
  }
});
