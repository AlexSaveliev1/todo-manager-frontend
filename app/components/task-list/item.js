import Ember from 'ember';

const RADIO_BUTTON_COLOR_PALETTE = {
  1: 'first-priority',
  2: 'second-priority',
  3: 'third-priority'
};

export default Ember.Component.extend({
  timeManager: Ember.inject.service(),
  router: Ember.inject.service('-routing'),

  classNames: ['task-list-item-wrapper'],
  classNameBindings: ['addNewMode:no-border'],
  tagName: 'li',

  taskId: '',
  groupId: '',
  title: '',
  addButtonLabel: 'Add new task',
  dueDate: '',
  dueDateToChange: '',
  dueDateAvailable: true,
  subtask: false,
  radioButton: true,
  editMode: false,
  addNewMode: false,
  isDeleteConfirmationDialogVisible: false,

  titleToChange: Ember.computed.reads('title'),
  radioButtonClassNames: Ember.computed('priority', function () {
    const priority = this.get('priority'),
      priorityClassName = RADIO_BUTTON_COLOR_PALETTE[priority];

    return ['task-list-item-radio', priorityClassName].join(' ');
  }),
  dueDateObserver: Ember.on('init', Ember.observer('dueDateMs', 'defaultDueDate', function () {
    const { dueDateMs, defaultDueDate } = this.getProperties('dueDateMs', 'defaultDueDate');

    if (dueDateMs) {
      let convertedMsToDate = this.get('timeManager').convertMsToDate(dueDateMs, 'MMM D YYYY'),
        dueDate = this.get('timeManager').convertMsToDate(dueDateMs, 'MMM D');

      return dueDateMs && this.setProperties({
        dueDateToChange: convertedMsToDate,
        dueDate
      });
    }

    if (defaultDueDate) {
      let convertedMsToDate = this.get('timeManager').convertMsToDate(defaultDueDate, 'MMM D YYYY');

      this.set('dueDateToChange', convertedMsToDate);
    }
  })),

  priorityItems: Ember.computed(function () {
    return [
      {
        title: 'Priority 1',
        value: 1,
        icon: 'flag'
      },
      {
        title: 'Priority 2',
        value: 2,
        icon: 'flag'
      },
      {
        title: 'Priority 3',
        value: 3,
        icon: 'flag'
      }
    ];
  }),

  datePickerYearRange: Ember.computed(function () {
    const currentYear = this.get('timeManager').getCurrentYear(),
      maxYearRange = 3;

    return `${currentYear}, ${currentYear + maxYearRange}`;
  }),

  actions: {
    markAsComplete() {
      const item = this.get('item');

      item.set('finishedAt', this.get('timeManager').now());
      this.sendAction('onComplete', item);
    },

    save() {
      const { item, dueDateToChange } = this.getProperties('item', 'dueDateToChange');

      if (!item.title) {
        return;
      }

      item.setProperties({
        dueDate: this.get('timeManager').getMidnightMsOfDate(dueDateToChange),
        updatedAt: this.get('timeManager').now()
      });

      this.sendAction('onSave', item);
      this.set('editMode', false);
    },

    cancelEdit() {
      this.get('item').rollbackAttributes();
      this.set('editMode', false);
    },

    addNew() {
      const { dueDateToChange, titleToChange, subtask, taskId, 
        defaultGroupId, defaultPriority } = this.getProperties('dueDateToChange', 'titleToChange', 'subtask', 'taskId', 'defaultGroupId', 'defaultPriority');

      let newItem = {
        title: titleToChange,
        group: defaultGroupId,
        dueDate: this.get('timeManager').getMidnightMsOfDate(dueDateToChange),
        createdAt: this.get('timeManager').now(),
        priority: defaultPriority || null
      };

      if (subtask) {
        newItem.task = taskId;
      }

      titleToChange && this.sendAction('onAddNew', newItem);
    },

    showOverview(id) {
      this.get('router').transitionTo('index.task', [id]);
    },

    cancel() {
      this.get('cancelAction') && this.sendAction('cancelAction');
    },

    changePriority(value) {
      const item = this.get('item');

      this.sendAction('onChangePriority', item, value);
    },

    delete() {
      this.sendAction('onDelete', this.get('item'));
      this.set('isDeleteConfirmationDialogVisible', false);
    }
  }
});
