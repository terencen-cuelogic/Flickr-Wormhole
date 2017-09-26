import Flickr from "@/flickr"

export default async function getPerms({ apiKey = Flickr.apiKey, photoId = `` } = {}) {
  return await Flickr.fetchResource(`flickr.photos.getPerms`, { apiKey, photoId }, {}, `read`)
}