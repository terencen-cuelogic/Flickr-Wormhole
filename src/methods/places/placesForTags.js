import Flickr from "@/flickr"

export default async function placesForTags(
  { apiKey = Flickr.apiKey, placeTypeId = `` } = {},
  {
    tags = ``,
    tagsMode = ``,
    machineTags = ``,
    machineTagsMode = ``,
    minUploadDate = ``,
    maxUploadDate = ``,
    minTakenDate = ``,
    maxTakenDate = ``,
    threshold = ``,
    placeId = ``,
    woeId = ``
  } = {}
) {
  return await Flickr.fetchResource(
    `flickr.places.placesForTags`,
    { apiKey, placeTypeId },
    {
      tags,
      tagsMode,
      machinetags,
      machineTagsMode,
      minUploadDate,
      maxUploadDate,
      minTakenDate,
      maxTakenDate,
      threshold,
      placeId,
      woeId
    }
  )
}