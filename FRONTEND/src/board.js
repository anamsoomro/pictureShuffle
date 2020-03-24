const boardHTML = 
    `<table id="game-board">` + 
    `<tr>` +
      `<td><div id="x1_y3"class="tile1"></div></td>` +
      `<td><div id="x2_y3" class="tile2"></div></td>` +
      `<td><div id="x3_y3" class="tile3"></div></td>` +
    `</tr>` +
    `<tr>` +
      `<td><div id="x1_y2" class="tile4"></div></td>` +
      `<td><div id="x2_y2" class="tile5"></div></td>` +
      `<td><div id="x3_y2" class="tile6"></div></td>` +
    `</tr>` +
    `<tr>` +
      `<td><div id="x1_y1" class="tile7"></div></td>` +
      `<td><div id="x2_y1" class="tile8"></div></td>` +
      `<td><div id="x3_y1" class="blank"></div></td>` +
    `</tr>` +
  `</table>` +

  `<button id="action">play</button>`+
  `<button id="moves">moves: 0</button>`+
  `<button id="timer"> 00:00:00 </button>`



function showBoard(image){
  showDiv.innerHTML = boardHTML
  const gameBoard = document.querySelector("#game-board")
  const tilePieces = gameBoard.querySelectorAll("div")
  tilePieces.forEach( tilePiece => {
    if (tilePiece.className !== "blank"){
      tilePiece.style.backgroundImage = `url(${image.image_url})`
    }
  })
}


function activateBoard(image){
  const actionBtn = document.querySelector("#action")
  actionBtn.addEventListener("click", () => {
    if (actionBtn.innerText === "play"){
      actionBtn.innerText = "stop"
      shuffleBoard(image)
      play(image)
    } else if (actionBtn.innerText === "stop") {
      stopGame()
    }
  })

}

function play (image){
  const board = document.querySelector("#game-board")
  let tiles = board.querySelectorAll("div")
  let moves = 0

  // start timer
  // let time = setInterval(incrementTime(), 1000)
  tiles.forEach( tile => {
    tile.addEventListener("click", ()=>{
      // when you click a tile get the tiles around it 
      let adjTiles = surroundingTiles(tile)
      // check those tiles to see if they exist
      adjTiles.forEach (tileToSwap => {
        if (tileToSwap) { 
          // if they exist, are they blank? 
          if(tileToSwap.className === "blank"){
            // then swap them
            swapTile(tile, tileToSwap, image)
            // check to see if current arrangment matches the solution 
            moves = moves + 1 
            let movesBtn = document.querySelector("#moves")
            movesBtn.innerText = `moves: ${moves}`  
            if (checkSolution()) {
              stopGame()
            } 
          }
        }
      })
    })
  })
}



function surroundingTiles(tile){
  let x = parseInt(tile.id[1])
  let y = parseInt(tile.id[4])
  let leftTile = document.querySelector(`#x${x-1}_y${y}`)
  let rightTile = document.querySelector(`#x${x+1}_y${y}`)
  let upTile = document.querySelector(`#x${x}_y${y+1}`)
  let downTile = document.querySelector(`#x${x}_y${y-1}`)
  return [leftTile, rightTile, upTile, downTile]
}

function swapTile(tile, blankTile, image){
  // give the blank tile the tiles class and background image
  blankTile.className = tile.className
  blankTile.style.backgroundImage = `url(${image.image_url})`
  // give the tile a the blank class and no image
  tile.className = "blank"
  tile.style = "none"
}

function checkSolution(){
  const solution = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "blank"]
  const board = document.querySelector("#game-board")
  let arrangement = board.querySelectorAll("div")
  let order = []
  arrangement.forEach( piece => {
    order.push(piece.className)
  })
  for (let i = 0; i < order.length; i++){
    if (order[i] !== solution[i]) { 
      return false
    }
  }
  return true
}



function incrementTime(){
  const timer = document.querySelector("#timer")
  // one way to do is store the start time 
  // every second get current time subtract with start time 
  // this will throw off saved games though 
  // actually no it wont. reassign the start time when they hit play 
  // if time !== nil then add that time to the difference 

}

// function format_timer(ms) {
//   var s = ("0" + Math.floor((ms / (      1000)) % 60)).substr(-2);
//   var m = ("0" + Math.floor((ms / (   60*1000)) % 60)).substr(-2);
//   var h =        Math.floor((ms / (60*60*1000))     );
//   return h + ":" + m + ":" + s;
// }

function shuffleBoard(image){
  // developers shuffle lmao
  let tile = document.querySelector("#x2_y1")
  let blank = document.querySelector("#x3_y1")
  swapTile(tile, blank, image)

  // real shuffle. maybe call swapTile multiple times
  
}

function stopGame(){
  // stop timer 
  // clearInterval(time)
  // make post request to games server
  // saveGame(image)
  const actionBtn = document.querySelector("#action")
  actionBtn.innerText = "play"
  console.log("you got it")
}

function saveGame(image){
  // some conditional to determine if it will be a post or a patch
  let moves = document.querySelector("#moves").innerText
  let time = document.querySelector("#timer").innerText
  fetch(GAMES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      user_id: user.id,
      image_id: image.id,
      // moves: moves,
      // time: time,
      status: "closed"
    }
  })
}