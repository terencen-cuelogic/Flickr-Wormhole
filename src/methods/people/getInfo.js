import Flickr from "@/flickr"

async function getInfo({ apiKey = Flickr.apiKey, userId = `` } = {}) {
  return await Flickr.fetchResource(`flickr.people.getInfo`, { apiKey, userId })
}

export default getInfo
