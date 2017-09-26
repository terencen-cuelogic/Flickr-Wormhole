import Flickr from "@/flickr"

export default async function getPhotoReferrers(
  { apiKey = Flickr.apiKey, date = ``, domain = `` } = {},
  { photoId = ``, page = 1, perPage = 25 } = {}
) {
  return await Flickr.fetchResource(
    `flickr.stats.getPhotoReferrers`,
    { apiKey, date, domain },
    { photoId, page, perPage },
    `read`
  )
}