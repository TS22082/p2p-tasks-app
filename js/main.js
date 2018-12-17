
$(document).ready(function() {
  renderApp()
});

async function createProfile(e){
  profile = await DatArchive.create()
  await profile.mkdir('/contents')
  await profile.mkdir('/data')
  html = await archive.readFile('profile.html')
  html2 = html.replace(/{{DAT_ARCHIVE_URL}}/g, archive.url)
  await profile.writeFile('index.html', html2)
  await profile.writeFile('/data/data.json', '')
  profileInfo = await profile.getInfo()
  window.location = profile.url
}

async function renderApp(){
  //settup dat
  try {
    archive = new DatArchive(window.location)
    archiveInfo = await archive.getInfo()
  } catch {
    console.log('Error reading dat')
  }
  //mount frontend components
  try {
    $('.title').text(archiveInfo.title)
    $('.url').text(window.location)
    $('.addLabBtn').on('click', createProfile)
  } catch {
    console.log('Error mounting front end components')
  }
}
