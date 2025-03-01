class Task < ApplicationRecord
  validates :title, presence: true
  validates :position, presence: true
end
