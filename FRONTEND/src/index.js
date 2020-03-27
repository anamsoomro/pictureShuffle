  const USERS_URL = "http://localhost:3000/users"
  const IMAGES_URL = "http://localhost:3000/images"
  const GAMES_URL = "http://localhost:3000/games"
  const form = document.querySelector("#login")
  const galleryLi = document.querySelector("#gallery")
  const leaderBoardLi = document.querySelector("#leaderBoard")
  const savedGamesLi = document.querySelector("#savedGames")
  const userDiv = document.querySelector("#user-bar")
  const userUl = document.querySelector("ul")
  const mainMenuDiv = document.querySelector("#main-menu")
  const subMenuDiv = document.querySelector("#sub-menu")
  const showDiv = document.querySelector("#show-panel")
  const gameControlsDiv = document.querySelector("#game-controls")
  const gameBoardDiv = document.querySelector("#game-board")
  const leaderBoardDiv = document.querySelector("#leader-board")

  let currentUser
  let currentImage



  form.addEventListener("submit", () => {
    event.preventDefault()
    let name = form[0].value
    fetch(USERS_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify({
        username: name
      })
    })
    .then(resp => resp.json())
    .then(userRecord => {
      form.reset()
      mainMenuDiv.style.display = "inline"
      currentUser = userRecord
      form.style.display = "none"
      let greeting = document.createElement("li")
      greeting.innerText = `hey, ${currentUser.username}!`
      greeting.id = "username"
      let logoutBtn = document.createElement("li")
      logoutBtn.className = "hoverMe"
      logoutBtn.innerText = "logout"
      logoutBtn.style.float = "right"
      userUl.append(greeting, logoutBtn)
      // when login show the other three divs 
      logoutBtn.addEventListener("click", ()=> {
        mainMenuDiv.style.display = "none"
        subMenuDiv.style.display = "none" 
        showDiv.style.display = "none"
        gameBoardDiv.innerHTML = ""
        gameControlsDiv.innerHTML = ""
        leaderBoardDiv.innerHTML = ""
        currentUser = null
        form.style.display = "block"
        logoutBtn.remove()
        greeting.remove()
      if (time) clearInterval(time)

      })
    })
  })

  galleryLi.addEventListener("click", () => {
    showDiv.style.display = "none"
    subMenuDiv.style.display = "inline"
    subMenuDiv.innerHTML = "" 
    gameBoardDiv.innerHTML = ""
        gameControlsDiv.innerHTML = ""
        leaderBoardDiv.innerHTML = ""
        if (time) clearInterval(time)

    fetch(IMAGES_URL)
    .then(resp => resp.json())
    .then(images => images.forEach(image => showImage(image)))
  })

  leaderBoardLi.addEventListener("click", () => {
    subMenuDiv.style.display = "none"
    subMenuDiv.innerHTML = ""
    gameBoardDiv.innerHTML = ""
    gameControlsDiv.innerHTML = ""
    showDiv.style.display = "block"
    if (time) clearInterval(time)

    const table = document.createElement("table")
    const titlesTr = document.createElement("tr")
    const imgTh = document.createElement("th")
    imgTh.innerText = "image"
    const movesTh = document.createElement("th")
    movesTh.innerText = "least moves"
    const timeTh = document.createElement("th")
    timeTh.innerText = "least time"
    assignClassName([imgTh, movesTh, timeTh, titlesTr, table], "leaderBoard")
    titlesTr.append(imgTh, movesTh, timeTh)
    table.append(titlesTr)
    fetch(IMAGES_URL+"/stats")
    .then(resp => resp.json())
    .then(imgsWithStats => {
      imgsWithStats["stats"].forEach( img => {
        const imageTr = document.createElement("tr")
        const imageTd = document.createElement("td")
        const gameImg = document.createElement("img")
        gameImg.src = img["image"]["image_url"]
        gameImg.className = "gallery"
        imageTd.append(gameImg)
        const movesTd = document.createElement("td")
        const timeTd = document.createElement("td")
        if (img["game"] != "none") {
          movesTd.innerText = `${img["game"]["byMoves"]["user"]} - ${img["game"]["byMoves"]["moves"]}`
          timeTd.innerText = `${img["game"]["byTime"]["user"]} - ${img["game"]["byTime"]["time"]}`
        } else {
          movesTd.innerText = "no games played"
          timeTd.innerText = "no games played"
        }
        assignClassName([imageTd, movesTd, timeTd], "leaderBoard")
        imageTr.append(imageTd, movesTd, timeTd)
        table.append(imageTr)
      })
      leaderBoardDiv.append(table)
    })

    function assignClassName (elementsArr, classN){
      elementsArr.forEach (element => {
        element.className = classN
      })
    }
  })

  savedGamesLi.addEventListener("click", ()=>{
    showDiv.style.display = "none"
    subMenuDiv.style.display = "inline"
    subMenuDiv.innerHTML = ""
    gameBoardDiv.innerHTML = ""
    gameControlsDiv.innerHTML = ""
    leaderBoardDiv.innerHTML = ""
    if (time) clearInterval(time)
    fetch(USERS_URL + "/" + currentUser.id) 
    .then(resp => resp.json())
    .then(games =>{showGames(games["open"])})
  })

  function showGames(openGames){
    openGames.forEach(openGame => {
      fetch(IMAGES_URL + "/" + openGame.image_id)
      .then(resp => resp.json())
      .then(image => {showImage(image, openGame)})
    })
  }

  function showImage(image, openGame = null){
    let img = document.createElement("img")
    img.src = image.image_url
    if (openGame) img.id = `gameId${openGame.id}`
    img.className = "gallery" 
    img.addEventListener("click", ()=>{
      showDiv.style.display = "grid"
      if (time) clearInterval(time)
      currentImage = image
      currentGame = null 
      openGame ? showExistingGame(openGame) : showNewGame()
      // debugger
      // showGame(openGame) 
      togglePlayPause() 
    }) 
    subMenuDiv.append(img)
  }

