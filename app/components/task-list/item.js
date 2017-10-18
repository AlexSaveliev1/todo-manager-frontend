import Ember from 'ember';

export default Ember.Component.extend({
  timeManager: Ember.inject.service(),

  classNames: ['task-list-item-wrapper'],
  classNameBindings: ['addNewMode:no-border'],
  tagName: 'li',

  id: '',
  groupId: '',
  title: '',
  dueDate: '',
  dueDateToChange: '',
  datePickerYearRange: Ember.computed(function () {
    const currentYear = this.get('timeManager').getCurrentYear(),
      maxYearRange = 3;

    return `${currentYear}, ${currentYear + maxYearRange}`;
  }),
  editMode: false,
  addNewMode: false,
  isDeleteConfirmationDialogVisible: false,

  titleToChange: Ember.computed.reads('title'),
  dueDateObserver: Ember.on('init', Ember.observer('dueDateMs', function () {
    let ms = this.get('dueDateMs'),
      convertedMsToDate = this.get('timeManager').convertMsToDate(ms, 'MMM D YYYY'),
      dueDate = this.get('timeManager').convertMsToDate(ms, 'MMM D');

    return ms && this.setProperties({
      dueDateToChange: convertedMsToDate,
      dueDate
    });
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

  actions: {
    save() {
      const { item, dueDateToChange } = this.getProperties('item', 'dueDateToChange');

      if (!item.title) {
        return;
      }

      item.setProperties({
        dueDate: this.get('timeManager').getMidnightMsOfDate(dueDateToChange),
        updatedAt: this.get('timeManager').getTodayMidnightMs()
      });

      this.sendAction('onSave', item);
      this.set('editMode', false);
    },

    cancelEdit() {
      this.get('item').rollbackAttributes();
      this.set('editMode', false);
    },

    addNew() {
      const { dueDateToChange, titleToChange } = this.getProperties('dueDateToChange', 'titleToChange'),
        newItem = {
          title: titleToChange,
          groupId: this.get('groupId'),
          dueDate: this.get('timeManager').getMidnightMsOfDate(dueDateToChange),
          createdAt: this.get('timeManager').getTodayMidnightMs()
        };

      titleToChange && this.sendAction('onAddNew', newItem);
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
