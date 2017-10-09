import Ember from 'ember';

export default Ember.Component.extend({
  timeManager: Ember.inject.service(),

  classNames: ['left-bar-wrapper', 'flex-30'],

  todayInMs: Ember.computed(function () {
    return this.get('timeManager').getTodayMidnightMs();
  }),

  selectedTab: 0,

  filters: Ember.computed(function () {
    return [{
      label: 'Inbox',
      icon: 'Inbox',
      tagName: 'li',
      className: 'left-bar-filter-item',
      link: 'index.task-board',
      queryParams: {
        relatedToGroup: false
      }
    },
    {
      label: 'Today',
      icon: 'Inbox',
      tagName: 'li',
      className: 'left-bar-filter-item',
      link: 'index.task-board',
      queryParams: {
        dueDate: this.get('todayInMs')
      }
    },
    {
      label: 'Next 7 days',
      icon: 'schedule',
      tagName: 'li',
      className: 'left-bar-filter-item',
      link: 'index.task-board',
      queryParams: {
        from: 1,
        to: 2
      }
    }];
  }),

  menuTabs: [{
    title: 'Groups',
    body: 'trololo'
  },
  {
    title: 'Filters',
    filters: [{
      title: 'Priority 1',
      link: 'index.task-board',
      queryParams: {
        priority: 1
      }
    },
    {
      title: 'Priority 2',
      link: 'index.task-board',
      queryParams: {
        priority: 2
      }
    },
    {
      title: 'Priority 3',
      link: 'index.task-board',
      queryParams: {
        priority: 3
      }
    }]
  }]
});
