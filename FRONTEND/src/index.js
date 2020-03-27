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
  let currentUser
  let currentImage



  // LOGIN ACTIONS
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
      greeting.innerText = `Hey, ${currentUser.username}!`
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
        showDiv.innerHTML = ""
        // why does the above not work. but works in the console
        currentUser = null
        form.style.display = "block"
        logoutBtn.remove()
        greeting.remove()
      })
    })
  })

  galleryLi.addEventListener("click", () => {
    subMenuDiv.style.display = "inline"
    subMenuDiv.innerHTML = "" 
    showDiv.innerText = ""
    fetch(IMAGES_URL)
    .then(resp => resp.json())
    .then(images => images.forEach(image => showImage(image)))
  })

  // leaderBoardLi.addEventListener("click", () => {
  //   subMenuDiv.style.display = "inline"
  //   subMenuDiv.innerHTML = ""
  //   subMenuDiv.innerHTML = "show some options for user stats"
  //   showDiv.innerText = ""

  // })

  leaderBoardLi.addEventListener("click", () => {
    subMenuDiv.innerHTML = ""
    showDiv.innerText = ""
    const li = document.createElement('li')
    li.innerHTML = 'Best Moves'
    li.addEventListener('click', ()=>{
      event.preventDefault()
      showDiv.innerHTML = ''

      fetch(GAMES_URL +  '/stats')
      .then(res => res.json())
      .then(stats => console.log(stats))
      

      
    })
    // const timeli = document.createElement('li')
    // timeli.innerHTML = 'Best Time'
    // timeli.addEventListener('click', ()=>{
      // event.preventDefault()
      // showDiv.innerHTML = '' 
      // fetch(GAMES_URL +  '/stats')
      // .then(res => res.json())
      // .then(stats => console.log(stats))
      
      
    // })
    // const userli = document.createElement('li')
    // userli.innerHTML = 'Top User'
    // userli.addEventListener('click', ()=>{
    //   showDiv.innerHTML = '' 
      
    // })
    // subMenuDiv.append(li, timeli, userli)
  })

  savedGamesLi.addEventListener("click", ()=>{
    subMenuDiv.style.display = "inline"
    subMenuDiv.innerHTML = ""
    showDiv.innerText = ""
    fetch(USERS_URL + "/" + currentUser.id) 
    .then(resp => resp.json())
    .then(openGames => showGames(openGames))
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
    if (openGame){
      img.id = `gameId${openGame.id}`
    }
    img.className = "gallery" // or can i just set a format for all images. one less class
    img.addEventListener("click", ()=>{
      currentImage = image
      currentGame = null 
      showGame(openGame) 
      togglePlayPause() 
    }) 
    subMenuDiv.append(img)
  }

