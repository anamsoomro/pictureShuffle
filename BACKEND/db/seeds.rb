User.destroy_all 
Image.destroy_all 
Game.destroy_all 


corn = User.create(username: "corn")
dumdum = User.create(username: "dumdum")

# for now only 480 x 480 
pup = Image.create(name: "pup", image_url: "https://hips.hearstapps.com/ame-prod-goodhousekeeping-assets.s3.amazonaws.com/main/embedded/31691/dog-main.jpg?crop=1xw:1.0xh;center,top&resize=480:*")
painting = Image.create(name: "painting", image_url: "https://www.paul-wright.com/wp-content/uploads/2019/02/Gaze-oil-on-linen-130cm-x-90cm-2019-for-email-480x480.jpg")
earth = Image.create(name: "earth", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Earth_Eastern_Hemisphere.jpg/480px-Earth_Eastern_Hemisphere.jpg")

Game.create(
  user_id: corn.id,
  image_id: pup.id ,
  moves: 23,
  time: "0:00:23",
  status: "closed"
)

Game.create(
  user_id: dumdum.id,
  image_id: painting.id,
  moves: 34,
  time: "0:00:34",
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

Game.create(
  user_id: dumdum.id,
  image_id: earth.id ,
  moves: 56,
  time: "00:23",
  status: "closed"
)


Game.create(
  user_id: corn.id,
  image_id: painting.id ,
  moves: 103,
  time: "00:23",
  status: "closed"
)

Game.create(
  user_id: corn.id,
  image_id: earth.id ,
  moves: 12,
  time: "00:23",
  status: "closed"
)



