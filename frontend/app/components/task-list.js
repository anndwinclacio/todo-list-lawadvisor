import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TaskListComponent extends Component {
  @service router;
  @service store;
  @tracked tasks = this.args.tasks;
  
  draggedIndex = null;

  @action
  startDrag(index, event) {
    this.draggedIndex = index;
    event.dataTransfer.effectAllowed = "move";
  }

  @action
  allowDrop(event) {
    event.preventDefault(); // to allow dropping
  }

  @action
  async drop(index, event) {
    event.preventDefault();
    
    // Array to be updated on the changes
    let tasks = [...this.tasks];

    // Removal of the dragged task from the array
    let draggedTask = tasks.splice(this.draggedIndex, 1)[0];

    // Inserting it again to the array with a new position
    tasks.splice(index, 0, draggedTask);

    // Updating the tasks array being shown in the UI
    this.tasks = [...tasks];

    // Getting the IDs for the reordering happening in the API
    let taskIds = this.tasks.map(task => task.id);

    try {
      await fetch('http://localhost:3000/tasks/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task_ids: taskIds })
      });

      this.args.refreshTasks();
    } catch (error) {
      console.error("Error reordering tasks:", error);
    }
  }

  @action
  transitionToNewTask() {
    this.router.transitionTo('new-task');
  }

  @action
  editTask(task) {
    this.router.transitionTo('edit-task', task);
  }

  @action
  async deleteTask(task) {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.tasks = this.tasks.filter(t => t.id !== task.id);

      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      });
      this.args.refreshTasks();
    }
    console.log(`Task - "${task.title}" has been deleted.`);
  }
}
