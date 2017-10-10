import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('left-bar/group-item', 'Integration | Component | left bar/group item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{left-bar/group-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#left-bar/group-item}}
      template block text
    {{/left-bar/group-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
