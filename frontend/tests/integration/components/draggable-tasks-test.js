import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | draggable-tasks', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<DraggableTasks />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <DraggableTasks>
        template block text
      </DraggableTasks>
    `);

    assert.dom().hasText('template block text');
  });
});
