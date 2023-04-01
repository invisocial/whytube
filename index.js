let menuIcon=document.querySelector(".logo1")

let sidebar=document.querySelector(".leftbar")

menuIcon.onclick=function()
{
    sidebar.classList.toggle("small-sidebar")
}

let API_KEY = `AIzaSyAdMBxmDrgJmdFEH08yhr5rDRvyKM_yALk`

let searchResultDiv = document.getElementById('video-container')

async function searchVideo() {
  try {
    let userInput = document.querySelector('#searchTerm').value
    localStorage.setItem("videosSech" , JSON.stringify(userInput))
    
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${userInput}&part=id%2C+snippet&type=video&maxResults=35`,
    )

    let data = await res.json()
    // console.log(data)
    let videosList = data.items
    console.log(videosList)
    window.location.href = 'search.html'
  } catch (err) {
    console.log(err)
  }
}

const displayData = (videosList) => {
  searchResultDiv.innerHTML = ''
  videosList.forEach((video) => {
    const {
      snippet: {
        thumbnails: {
          medium: { url },
        },
        title,
        channelTitle,
      },
    } = video
    // console.log(video)
    let videoCard = document.createElement('button')
    videoCard.addEventListener('click', function () {
      localStorage.setItem('mediaId',JSON.stringify(video.id))
      window.location.href = "./One.html"
      // Refreshdata(video.id , video.snippet.title ,  video.snippet.channelTitle)
    })

    let img = document.createElement('img')
    img.src = video.snippet.thumbnails.medium.url
   

    let Title = document.createElement('h5')
    Title.innerHTML = video.snippet.title
    Title.setAttribute('class', 'Title')

    let Channel = document.createElement('p')
    Channel.innerHTML = video.snippet.channelTitle
    Channel.setAttribute('class', 'Channel')

    videoCard.append(img, Title, Channel)
    searchResultDiv.append(videoCard)
  })
}

async function randomdata() {
  try {
    let res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${API_KEY}&type=video&part=snippet&maxResults=35`,
    )

    let data = await res.json()
    // console.log(data)
    let videosList = data.items
    displayData(videosList)
    // console.log(videosList)
  } catch (err) {
    console.log(err)
  }
}
randomdata()
