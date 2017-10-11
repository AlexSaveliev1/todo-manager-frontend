import Ember from 'ember';

export default Ember.Component.extend({
  router: Ember.inject.service('-routing'),
  timeManager: Ember.inject.service(),
  groupManager: Ember.inject.service(),

  classNames: ['left-bar-wrapper', 'flex-30'],

  selectedTab: 0,
  isAddGroupFormVisible: false,

  todayInMs: Ember.computed(function () {
    return this.get('timeManager').getTodayMidnightMs();
  }),

  filters: Ember.computed(function () {
    return [{
      label: 'Inbox',
      icon: 'Inbox',
      tagName: 'li',
      className: 'left-bar-filter-item',
      link: 'index.task-board'
    },
    {
      label: 'Today',
      icon: 'Today',
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

  menuTabs: Ember.computed('model.groups', function () {
    return [{
      title: 'Groups',
      groups: this.get('groups')
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
    }];
  }),

  actions: {
    addGroup(title) {
      return this.get('groupManager').addOne(title)
        .then(() => this.set('isAddGroupFormVisible', false))
    },

    saveGroup({ id, title }) {
      return this.get('groupManager').save(id, { title })
        .then(() => this.set('isAddGroupFormVisible', false))
    },

    confirmDelete({ id, title }) {
      this.setProperties({
        groupIdToDelete: id,
        groupTitleToDelete: title,
        isConfirmDialogVisible: true
      });
    },

    cancelDelete() {
      this.setProperties({ groupIdToDelete: '', groupTitleToDelete: '', isConfirmDialogVisible: false });
    },

    deleteGroup() {
      const id = this.get('groupIdToDelete');

      return this.get('groupManager').delete(id)
        .then(() => this.setProperties({ groupIdToDelete: '', groupTitleToDelete: '', isConfirmDialogVisible: false }))
        .then(() => this.get('router').transitionTo('index'));
    }
  }
});
