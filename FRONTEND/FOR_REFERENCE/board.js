// GENERAL APP IDEAS 
// each game will have a timer and a moves counter 
// you finish a game it will make a post to games with that information 

// LEADER BOARDS 
// high scores for each images and also overall 


// images pieces are stored as styles 
// each piece is a div element in a table 
// with each play the div elements class gets updated 

// user hits play, game begins
const playGame = document.querySelector("#play")
playGame.addEventListener("click", () => {
  // timer begins
  // grab all the tile pieces
  const pieces = document.querySelectorAll("div") 
  // shuffle all the pieces 
  // and make them functional
  play(pieces)
})

function play (tiles){
  // start timer
  let moves = 0
  tiles.forEach( tile => {
    tile.addEventListener("click", ()=>{
      // when you click a tile get the tiles around it 
      let adjTiles = surroundingTiles(tile)
      // check those tiles to see if they exis
      adjTiles.forEach (tileToSwap => {
        if (tileToSwap) { 
          // if they exist, are they blank? 
          if(tileToSwap.className === "blank"){
            // then swap them
            swapTile(tile, tileToSwap)
            // check to see if current arrangment matches the solution 
            moves = moves + 1 
            let movesBtn = document.querySelector("#moves")
            movesBtn.innerText = `moves: ${moves}`
            if (checkSolution()) {
              // stop timer 
              alert("Ayyyye")
              // make post request to games server
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

function swapTile(tile1, blankTile){
  blankTile.className = tile1.className
  tile1.className = "blank"
}

function checkSolution(){
  const solution = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "blank"]
  let arrangement = document.querySelectorAll("div") 
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





