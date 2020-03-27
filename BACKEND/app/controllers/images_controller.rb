class ImagesController < ApplicationController

  def index 
    images = Image.all
    render json: images
  end

  def show 
    image = Image.find(params[:id])
    # best = image.best_games
    render json: image
  end


  def stats 
    image_with_stats = []
    Image.all.each do |image| 
      # image = Image.find(params[:id])
      bestGames = image.best_games
      image_with_stats << {image: image, game: bestGames}
    end

    render json: {stats: image_with_stats}
  end

  # def best 
  #   image = Image.find(params[:id])
  #   best = image.best_games
  #   render json: best
  # end

end
