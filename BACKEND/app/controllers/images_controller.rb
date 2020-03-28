class ImagesController < ApplicationController

  def index 
    images = Image.all
    render json: images
  end

  def show 
    image = Image.find(params[:id])
    render json: image
  end

  def stats 
    image_with_stats = []
    Image.all.each do |image| 
      bestGames = image.best_games
      image_with_stats << {image: image, game: bestGames}
    end
    render json: {stats: image_with_stats}
  end

end
