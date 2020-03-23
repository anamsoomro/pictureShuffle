User.destroy_all 
Image.destroy_all 
Game.destroy_all 


corn = User.create(username: "corn")
dumdum = User.create(username: "dumdum")

pup = Image.create(name: "pup", image_url: "https://hips.hearstapps.com/ame-prod-goodhousekeeping-assets.s3.amazonaws.com/main/embedded/31691/dog-main.jpg?crop=1xw:1.0xh;center,top&resize=480:*")

Game.create(
  user_id: corn.id,
  image_id: pup.id ,
  moves: 23,
  time: "00:23",
  status: "closed"
)

Game.create(
  user_id: dumdum.id,
  image_id: pup.id,
  moves: 34,
  time: "00:34",
  status: "open",
  x1_y1: "tile7",
  x2_y1: "tile3",
  x3_y1: "tile2",
  x1_y2: "tile1",
  x2_y2: "tile4",
  x3_y2: "tile8",
  x1_y3: "blank",
  x2_y3: "tile5",
  x3_y3: "tile6"
)


