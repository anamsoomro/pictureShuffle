document.addEventListener("DOMContentLoaded", ()=> {

  const USERS_URL = "http://localhost:3000/users"
  const IMAGES_URL = "http://localhost:3000/images"

  const form = document.querySelector("#login")
  const galleryLi = document.querySelector("#gallery")
  const leaderBoardLi = document.querySelector("#leaderBoard")
  const savedGamesLi = document.querySelector("#savedGames")
  const userDiv = document.querySelector("#user-bar")
  const mainMenuDiv = document.querySelector("#main-menu")
  const subMenuDiv = document.querySelector("#sub-menu")
  const showDiv = document.querySelector("#show-panel")

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
  `<button id="moves">moves: 0</button>`+
  `<button id="timer"> 0:00 </button>`

  galleryLi.addEventListener("click", () => {
    subMenuDiv.innerHTML = "" 
    // alert("show all images ")
    fetch(IMAGES_URL)
    .then(resp => resp.json())
    .then(images => images.forEach(image => showImage(image)))
  })

  leaderBoardLi.addEventListener("click", () => {
    subMenuDiv.innerHTML = ""
    subMenuDiv.innerHTML = "show some options for user stats"
  })

  savedGamesLi.addEventListener("click", ()=>{
    subMenuDiv.innerHTML = ""
    subMenuDiv.innerHTML = "show users games that are status:open"
  })

  form.addEventListener("submit", () => {
    event.preventDefault()
    let name = form[0].value
    fetch(USERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        username: name
      })
    })
    .then(resp => resp.json())
    .then(user => {
      debugger
      console.log(user)
      // show a hey, username
    })
  })

  function showImage(image){
    let img = document.createElement("img")
    img.src = image.image_url
    img.className = "gallery" //come back to styline later 
    
    img.addEventListener("click", ()=>{
      showDiv.innerHTML = boardHTML
      const gameBoard = document.querySelector("#game-board")
      const tilePieces = gameBoard.querySelectorAll("div")
      tilePieces.forEach( tilePiece => {
        if (tilePiece.className !== "blank"){
          // tilePiece.style = `background: url(${image.image_url})`
          tilePiece.style.backgroundImage = `url(${image.image_url})`
        }
      })
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
    }) //IMAGE ADD EVENT LISTENER ENDS HERE. REFRACTOR THE LOAD OUT OF THIS.
    subMenuDiv.append(img)
  }


})