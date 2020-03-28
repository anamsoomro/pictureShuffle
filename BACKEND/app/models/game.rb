class Game < ApplicationRecord
  belongs_to :user 
  belongs_to :image

  def gameTimeToNumber 
    timeStr = self.time.delete(":")
    timeStr.to_i
  end

end
