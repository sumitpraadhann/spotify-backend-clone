const Imagekit = require('@imagekit/nodejs') 
const { Folders } = require('@imagekit/nodejs/resources.js')

const imagekitclient = new Imagekit ({
    privateKey:process.env.PRIVATE_KEY
})

async function uploadfile(file) {
    const result = await imagekitclient.files.upload({
        file,
        fileName:"music" + Date.now(),
        Folder:"yt-backend/music"
    })

    return result
}

module.exports = {uploadfile}