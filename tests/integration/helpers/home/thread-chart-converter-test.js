
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('home/thread-chart-converter', 'helper:home/thread-chart-converter', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{home/thread-chart-converter inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

