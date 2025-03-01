class TasksController < ApplicationController
  before_action :find_task, only: %i[show update destroy]

  # GET /tasks
  def index
    @tasks = Task.order(:position)
    render json: @tasks, adapter: :json_api
  end

  # GET /tasks/:id
  def show
    render json: @task
  end

  # POST /tasks
  def create
    last_task_position = Task.maximum(:position) || 0 
    @task = Task.new(task_params.merge(position: last_task_position + 1))

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PUT /tasks/:id
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:id
  def destroy
    @task.destroy
  end

  # PUT /tasks/reorder
  def reorder
    tasks = params[:task_ids].each_with_index.map do |id, index|
      task = Task.find(id)
      task.update(position: index + 1)
    end
    render json: tasks, status: :ok
  end

  private

  def find_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description)
  end
end
