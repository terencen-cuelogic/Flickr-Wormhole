import Flickr from "@/flickr"

export default async function tagsForPlace(
  { apiKey = Flickr.apiKey } = {},
  { minUploadDate = ``, maxUploadDate = ``, minTakenDate = ``, maxTakenDate = ``, placeId = ``, woeId = `` } = {}
) {
  return await Flickr.fetchResource(
    `flickr.places.tagsForPlace`,
    { apiKey },
    { minUploadDate, maxUploadDate, minTakenDate, maxTakenDate, placeId, woeId }
  )
}