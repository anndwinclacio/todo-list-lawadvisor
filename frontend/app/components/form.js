import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class TaskFormComponent extends Component {
  @service router;

  @tracked title = this.args.task?.title || '';
  @tracked description = this.args.task?.description || '';

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  updateDescription(event) {
    this.description = event.target.value;
  }

  @action
  async saveTask(event) {
    event.preventDefault();

    // default as CREATE
    let url = 'http://localhost:3000/tasks';
    let method = 'POST';

    // if task is available, it's an UPDATE
    if (this.args.task) {
      url = `http://localhost:3000/tasks/${this.args.task.id}`;
      method = 'PUT';
    }

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: { title: this.title, description: this.description },
      }),
    });
    if (this.args.task) console.log(`Task - "${this.title}" has been updated.`);
    else console.log(`Task - "${this.title}" has been created.`);

    this.router.transitionTo('tasks');
  }

  @action
  cancel() {
    this.router.transitionTo('tasks');
  }
}
