import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('left-bar/filter-item', 'Integration | Component | left bar/filter item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{left-bar/filter-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#left-bar/filter-item}}
      template block text
    {{/left-bar/filter-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
