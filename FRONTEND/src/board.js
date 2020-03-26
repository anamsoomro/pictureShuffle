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

  `<button id="play">play</button>`+
  `<button id="stop" style="display: none">pause</button>`+

  `<button id="moves">moves: 0</button>`+
  `<button id="timer"> 0:00:00 </button>` + 
  `<button id="kill" style="display: none" class="hoverMe"> kill game </button>`
  let time 
  let currentGame
  let dev = "here"




function showGame(openGame){
  openGame ? showExistingGame(openGame) : showNewGame()
}

function togglePlayPause(){
  const playBtn = document.querySelector("#play")
  const stopBtn = document.querySelector("#stop")
  const killBtn = document.querySelector("#kill")
  playBtn.addEventListener("click", () => {
    playBtn.style.display = "none"
    stopBtn.style.display = "inline"
    killBtn.style.display = "inline"
    currentGame ? playPausedGame() : playNewGame()
  })
  stopBtn.addEventListener("click", () => {
    stopBtn.style.display = "none"
    killBtn.style.display = "none"
    playBtn.style.display= "inline"
    clearInterval(time)
    saveGame()
    //  if you hit stop you need to deactivate the tiles
  }) 
  killBtn.addEventListener("click", ()=>{
    clearInterval(time)
    deleteGame()
    currentGame = null
    showGame()
    togglePlayPause()
    // if youre playing an unfinised game remove its img from the queue 
    let openGameImg = document.querySelector(`#gameId${currentGame.id}`)
    if (openGameImg) openGameImg.remove()
  })
}

function playNewGame(){
  console.log("YOU PLAYING A NEW GAME")
  let movesBtn = document.querySelector("#moves")
  movesBtn.innerText = "moves: 0"
  const board = document.querySelector("#game-board")
  let tiles = board.querySelectorAll("div")
  dev === "here" ? devShuffle() : shuffleBoard();
  postNewGame()
  // console.log ("moves at line 75", moves)
  let moves = 0
  // moves is 0 here
  console.log ("moves at line 77", moves)
  let startTime = Date.now()
  time = setInterval(()=>{
    const timer = document.querySelector("#timer")
    let timeDiff = Date.now() - startTime
    timer.innerText = formatTime(timeDiff)
  }, 1000)
  tiles.forEach( tile => {
    tile.addEventListener("click", activateTile)
    function activateTile(){
      // when you click a tile get the tiles around it 
      let adjTiles = surroundingTiles(tile)
      // check those tiles to see if they exist
      adjTiles.forEach (tileToSwap => {
        if (tileToSwap) { 
          // if they exist, are they blank? 
          if(tileToSwap.className === "blank"){
            // then swap them
            swapTile(tile, tileToSwap)
            // check to see if current arrangment matches the solution 
            moves++
            movesBtn.innerText = `moves: ${moves}`  
            if (checkSolution()) {
              console.log("solved")
              const playBtn = document.querySelector("#play")
              const stopBtn = document.querySelector("#stop")
              playBtn.style.display = "inline"
              stopBtn.style.display = "none"
              const killBtn = document.querySelector("#kill")
              killBtn.style.display = "none"
              winMessage()
              // if this an "unfinished game", remove it from their list of unfinished games
              let openGameImg = document.querySelector(`#gameId${currentGame.id}`)
              if (openGameImg) openGameImg.remove()
              closeGame()
              currentGame = null
            } 
          }
        }
      })
    }
  })
}



function playPausedGame(){
  console.log("YOU PLAYING A PAUSED GAME")
  let movesBtn = document.querySelector("#moves")
  const board = document.querySelector("#game-board")
  const timer = document.querySelector("#timer")
  let tiles = board.querySelectorAll("div")
  let moves = parseInt(movesBtn.innerText.substring(7))
  let carryOverTime = timer.innerText
  let startTime = Date.now()
  time = setInterval(()=>{
    let timeDiff = Date.now() - startTime
    timer.innerText = addTime(formatTime(timeDiff), carryOverTime)
  }, 1000)
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
            swapTile(tile, tileToSwap)
            // check to see if current arrangment matches the solution 
            moves++
            movesBtn.innerText = `moves: ${moves}`  
            if (checkSolution()) {
              console.log("solved")
              const playBtn = document.querySelector("#play")
              const stopBtn = document.querySelector("#stop")
              playBtn.style.display = "inline"
              stopBtn.style.display = "none"
              killBtn.style.display = "none"

              const h2 = document.createElement("h2")
              h2.innerText = "you did it."
              setTimeout(()=>{
                h2.remove()
              }, 5000)
              showDiv.append(h2)
              clearInterval(time)
              // if this an "unfinished game", remove it from their list of unfinished games
              let openGameImg = document.querySelector(`#gameId${currentGame.id}`)
              if (openGameImg){
                openGameImg.remove()
              }
              closeGame()
              currentGame = null
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

function shuffleBoard(){
  let i = 0
    let swap = setInterval( ()=>{
      let blankTile = document.querySelector(".blank")
      let tiles = surroundingTiles(blankTile).filter( tile => tile)
      let rand = Math.floor( Math.random() * tiles.length )
      swapTile(tiles[rand], blankTile)
      i++ 
      if (i === 50){
       clearInterval (swap)
      }
    },20)
}

function devShuffle(){
  let tile = document.querySelector("#x2_y1")
  let blank = document.querySelector("#x3_y1")
  swapTile(tile, blank)
}


function swapTile(tile, blankTile){
  // function swapTile(tile, blankTile, image){
  // give the blank tile the tiles class and background image
  blankTile.className = tile.className
  // blankTile.style.backgroundImage = `url(${image.image_url})`
  blankTile.style.backgroundImage = `url(${currentImage.image_url})`
  // give the tile a the blank class and no image
  tile.className = "blank"
  tile.style = "none"
}

function checkSolution(){
  console.log("checkSolution")
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

function formatTime(ms) {
  var s = ("0" + Math.floor((ms / (      1000)) % 60)).substr(-2);
  var m = ("0" + Math.floor((ms / (   60*1000)) % 60)).substr(-2);
  var h =        Math.floor((ms / (60*60*1000))     );
  return h + ":" + m + ":" + s;
}

function addTime(time1, time2){
  time1Arr = time1.split(":")
  time2Arr = time2.split(":")
  s = parseInt(time1Arr[2]) + parseInt(time2Arr[2])
  m = parseInt(time1Arr[1]) + parseInt(time2Arr[1])
  h = parseInt(time1Arr[0]) + parseInt(time2Arr[0])
  if ( s >= 60){
    m = m + 1 
    s = s - 60
  } if (m >= 60){
    h = h + 1
    m = m - 60
  }
  return h + ":" + m + ":" + s
  //  this doesnt return minutes and seconds in two digits. come back later
}

function postNewGame(){
  console.log("new game created")
  fetch(GAMES_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      user_id: currentUser.id,
      image_id: currentImage.id,
      status: "open", 
      moves: 0,
      time: "0:00:00"
    })
  })
  .then(resp => resp.json())
  .then(newGame => {
    currentGame = newGame
  })
}


function saveGame(){
  let moves = parseInt(document.querySelector("#moves").innerText.substring(7))
  let time = document.querySelector("#timer").innerText
  const board = document.querySelector("#game-board")
  let pieces = board.querySelectorAll("div")
  fetch(GAMES_URL + "/" + currentGame.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      moves: moves,
      time: time,
      status: "open",
      x1_y3: pieces[0].className,
      x2_y3: pieces[1].className,
      x3_y3: pieces[2].className,
      x1_y2: pieces[3].className,
      x2_y2: pieces[4].className,
      x3_y2: pieces[5].className,
      x1_y1: pieces[6].className,
      x2_y1: pieces[7].className,
      x3_y1: pieces[8].className
    })
  })
  console.log("saved to db")
}

  function closeGame() {
  console.log("game is closed")
  let moves = parseInt(document.querySelector("#moves").innerText.substring(7))
  let time = document.querySelector("#timer").innerText
  fetch(GAMES_URL + "/" + currentGame.id, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      moves: moves,
      time: time,
      status: "closed"
    })
  })
}

function showNewGame(){
  showDiv.innerHTML = boardHTML
  const gameBoard = document.querySelector("#game-board")
  const tilePieces = gameBoard.querySelectorAll("div")
  tilePieces.forEach( tilePiece => {
    if (tilePiece.className !== "blank"){
      tilePiece.style.backgroundImage = `url(${currentImage.image_url})`

    }
  })
}

function showExistingGame(openGame){
  currentGame = openGame
  showDiv.innerHTML = boardHTML
  const x1_y1 = document.querySelector("#x1_y1")
  const x2_y1 = document.querySelector("#x2_y1")
  const x3_y1 = document.querySelector("#x3_y1")
  const x1_y2 = document.querySelector("#x1_y2")
  const x2_y2 = document.querySelector("#x2_y2")
  const x3_y2 = document.querySelector("#x3_y2")
  const x1_y3 = document.querySelector("#x1_y3")
  const x2_y3 = document.querySelector("#x2_y3")
  const x3_y3 = document.querySelector("#x3_y3")
  x1_y1.className = openGame.x1_y1
  x2_y1.className = openGame.x2_y1
  x3_y1.className = openGame.x3_y1
  x1_y2.className = openGame.x1_y2
  x2_y2.className = openGame.x2_y2
  x3_y2.className = openGame.x3_y2
  x1_y3.className = openGame.x1_y3
  x2_y3.className = openGame.x2_y3
  x3_y3.className = openGame.x3_y3
  const gameBoard = document.querySelector("#game-board")
  const tilePieces = gameBoard.querySelectorAll("div")
  tilePieces.forEach( tilePiece => {
  if (tilePiece.className !== "blank"){
    tilePiece.style.backgroundImage = `url(${currentImage.image_url})`
  }})
  let moves = document.querySelector("#moves")
  moves.innerText = `moves: ${openGame.moves}`
  let timer = document.querySelector("#timer")
  timer.innerText = openGame.time
}

function deleteGame(){
  console.log("game is deleted from db")
  fetch(GAMES_URL + "/" + currentGame.id, {
    method: "DELETE", 
    headers: {"Content-Type": "application/json"}
  })
}

function winMessage(){
  const h2 = document.createElement("h2")
  h2.innerText = "you did it."
  setTimeout(()=>{h2.remove()}, 5000)
  showDiv.append(h2)
  clearInterval(time)
}