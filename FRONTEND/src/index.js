
  const USERS_URL = "http://localhost:3000/users"
  const IMAGES_URL = "http://localhost:3000/images"
  const GAMES_URL = "http://localhost:3000/games"

  const form = document.querySelector("#login")
  const galleryLi = document.querySelector("#gallery")
  const leaderBoardLi = document.querySelector("#leaderBoard")
  const savedGamesLi = document.querySelector("#savedGames")
  const userDiv = document.querySelector("#user-bar")
  const mainMenuDiv = document.querySelector("#main-menu")
  const subMenuDiv = document.querySelector("#sub-menu")
  const showDiv = document.querySelector("#show-panel")
  let user 

  galleryLi.addEventListener("click", () => {
    subMenuDiv.innerHTML = "" 
    showDiv.innerText = ""
    // alert("show all images ")
    fetch(IMAGES_URL)
    .then(resp => resp.json())
    .then(images => images.forEach(image => showImage(image)))
  })

  leaderBoardLi.addEventListener("click", () => {
    subMenuDiv.innerHTML = ""
    subMenuDiv.innerHTML = "show some options for user stats"
    showDiv.innerText = ""

  })

  savedGamesLi.addEventListener("click", ()=>{
    subMenuDiv.innerHTML = ""
    subMenuDiv.innerHTML = "show users their games that are status:open"
    showDiv.innerText = ""
    // make a fetchSavedGames()
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
    .then(userRecord => {
      form.reset()
      user = userRecord
      form.style.display = "none"
      let greeting = document.createElement("label")
      greeting.innerText = `Hey, ${user.username}!`
      greeting.id = "username"
      let logoutBtn = document.createElement("button")
      logoutBtn.innerText = "logout"
      userDiv.append(greeting, logoutBtn)
      // when login show the other three divs 
      logoutBtn.addEventListener("click", ()=> {
        user = null
        form.style.display = "block"
        logoutBtn.remove()
        greeting.remove()
        // Eventually when logout, hide the other 3 divs
      })
    })
  })

  function showImage(image){
    let img = document.createElement("img")
    img.src = image.image_url
    img.className = "gallery" //come back to styline later 
    img.addEventListener("click", ()=>{
      // refer to board.js for board functions
      showBoard(image) 
      activateBoard(image) // refer to board.js 
    }) 
    subMenuDiv.append(img)
  }

