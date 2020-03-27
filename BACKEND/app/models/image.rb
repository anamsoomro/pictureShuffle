class Image < ApplicationRecord
  has_many :games 
  has_many :users, through: :games


  # this isnt being used yet. 
  def best_games
    closed_games = self.games.select {|game| game.status == "closed"}
    least_moves = closed_games.sort_by{|game| game.moves}
    fastest = closed_games.sort_by{|game| game.gameTimeToNumber}
    if !closed_games.empty?
      { byMoves: {user: User.find(least_moves[0]["user_id"])["username"], moves: least_moves[0][:moves]},
        byTime: {user: User.find(fastest[0]["user_id"])["username"], time: fastest[0][:time]}
      }
    else 
      return "none"
    end
  end


  

end
