import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TasksController extends Controller {

  @action
  refreshTasks() {
    this.target.send('refreshModel');
  }
}
