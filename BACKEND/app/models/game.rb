class Game < ApplicationRecord
  belongs_to :user 
  belongs_to :image

  def self.top_games 
    closed_games = self.all.select { |game| game.status == "closed"}
    order = closed_games.sort_by{|game| game.moves}
    [order[0], order[1], order[2]]
  end

  # def self.orderByMoves 
  #   self.all.sort_by{|game| game.moves}
  # end

  # def self.orderByTime
  #   self.all.sort_by{|game| game.time}
  # end

  # def game_speed
  #   moves = game.moves
  #   time = game.time
  #   game_speed = moves / time 
  #   puts game_speed
  # end

  # def self.game_speed
  #   # self.all.sort_by{|game| game.}
  # end

  # for best games for image
  def gameTimeToNumber 
    # "00:00:00" format as string
    timeStr = self.time.delete(":")
    timeStr.to_i
  end





end
