class User < ApplicationRecord
  has_many :games 
  has_many :images, through: :games
end
