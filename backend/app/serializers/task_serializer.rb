class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :position
end
