import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('indicators/indicator-base', 'Integration | Component | indicators/indicator base', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{indicators/indicator-base}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#indicators/indicator-base}}
      template block text
    {{/indicators/indicator-base}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
