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
  dueDateToChange: '', // TODO: make min date of current day
  editMode: false,
  addNewMode: false,

  titleToChange: Ember.computed.reads('title'),
  dueDateObserver: Ember.on('init', Ember.observer('dueDateMs', function () {
    let ms = this.get('dueDateMs'),
      convertedMsToDate = this.get('timeManager').convertMsToDate(ms, 'MMM D');

    return ms && this.setProperties({
      dueDateToChange: convertedMsToDate,
      dueDate: convertedMsToDate
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
    cancel() {
      this.get('cancelAction') ? this.sendAction('cancelAction') : this.set('editMode', !this.editMode); // TODO: Think about cancelAction
    },

    cancelEdit() {
      const titleToChange = this.get('title'),
        dueDateToChange = this.get('dueDate');

      this.setProperties({ titleToChange, dueDateToChange, editMode: false });
    },

    save() {
      const { id, titleToChange, dueDateToChange } = this.getProperties('id', 'titleToChange', 'dueDateToChange');

      if (!titleToChange) {
        return;
      }

      let updatedItem = {
        id,
        titleToChange,
        dueDateToChange: this.get('timeManager').getMidnightMsOfDate(dueDateToChange),
        updatedAt: this.get('timeManager').getTodayMidnightMs()
      };

      this.setProperties({ title: titleToChange, dueDate: dueDateToChange, editMode: false });
      this.sendAction('onSave', updatedItem);
    },

    addNew() {
      const title = this.get('titleToChange'),
        dueDate = this.get('dueDateToChange'),
        groupId = this.get('groupId'),
        newItem = {
          title,
          groupId,
          dueDate: this.get('timeManager').getMidnightMsOfDate(dueDate),
          createdAt: this.get('timeManager').getTodayMidnightMs()
        };

      title && this.sendAction('onAddNew', newItem);
    },

    changePriority(value) {
      const id = this.get('id');

      this.sendAction('onChangePriority', { id, value });
    },

    delete() {
      this.sendAction('onDelete', {
        id: this.get('id'),
        groupId: this.get('groupId'),
        title: this.get('title')
      });
    }
  }
});
