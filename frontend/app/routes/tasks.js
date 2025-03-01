import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class TasksRoute extends Route {
  @service store;

  model() {
    return this.store.query('task', {
      sort: 'position',
    });
  }
  actions = {
    refreshModel() {
      this.refresh();
    }
  };
}
