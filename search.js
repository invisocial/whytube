let API_KEY = `AIzaSyDF4Z46J4NQVIgkh9bOt0m_Ac22wrWx9xI`

async function searchVideo() {
try {
  let userInput = JSON.parse(localStorage.getItem("videosSech"))
   let res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${userInput}&part=id%2C+snippet&type=video&maxResults=35`,
  )

  let data = await res.json()
  // console.log(data)
  let videosList = data.items
  // console.log(videosList)
  displayData(videosList)
} catch (err) {
  console.log(err)
}
}
searchVideo()

const container = document.getElementById("searchResultDiv")


const displayData = (videosList) => {
// console.log(videosList)
container.innerHTML = null
videosList.forEach((video) => {
  console.log(video)
  const {
    snippet:{thumbnails:{medium:{url}},title,channelTitle},
  } = video

  let videoCard = document.createElement('button')
  videoCard.addEventListener('click', function () {
    localStorage.setItem('mediaId',JSON.stringify(video.id.videoId))
    window.location.href = "./One.html"
    container.innerHTML=""
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
  container.append(videoCard)
})
}
