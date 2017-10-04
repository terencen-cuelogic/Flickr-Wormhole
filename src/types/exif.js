import { fetchPhotoExif } from "@/resolvers"
import { Photo } from "./photo"
import { Brand } from "./brand"
import { Camera } from "./camera"

export const Exif = new GqlObject({
  name: `Exif`,
  description: `EXIF Data for a Photo.`,
  fields: () => ({
    photo: {
      type: Photo,
      description: `The Photo this EXIF Data belongs to.`,
      complexity: (args, childComplexity) => childComplexity * 10,
      resolve: ({ photoId }, args, { photo }) => photo.load(photoId)
    },
    camera: {
      type: GqlString,
      description: `The make and model of the camera used to take this photo.`
    },
    make: {
      type: Brand,
      description: `The Brand of of Camera used to take this Photo.`,
      complexity: (args, childComplexity) => childComplexity * 10,
      resolve: async({ make }, args, { brands }) => !!make
        ? await brands.load(`brands`)
          .then(results => results.filter(({ id }) => id === make.toLowerCase())[0])
        : null
    },
    model: {
      type: Camera,
      description: `The Camera used to take this Photo.`,
      complexity: (args, childComplexity) => childComplexity * 10,
      resolve: async({ make, model }, args, { cameras }) => !!make
        ? await cameras.load(make.toLowerCase())
          .then(results => results.filter(({ id }) => id === model.toLowerCase().replace(` `, `_`))[0])
        : null
    },
    xResolution: {
      type: GqlString,
      description: `The horizontal image resolution of the image in Dots Per Inch.`
    },
    yResolution: {
      type: GqlString,
      description: `The vertical image resolution of the image in Dots Per Inch.`
    },
    software: {
      type: GqlString,
      description: `The image editing software used to modify this image. (Optional)`
    },
    shootingMode: {
      type: GqlString,
      description: `The exposure mode used to capture this image.`
    },
    exposure: {
      type: GqlString,
      description: `The exposure value used to caputre this image.`
    },
    aperture: {
      type: GqlString,
      description: `The aperature value used to caputre this image.`
    },
    iso: {
      type: GqlInt,
      description: `The ISO speed used to capture this image.`
    },
    brightness: {
      type: GqlFloat,
      description: `The Brightness value used to capture this image.`
    },
    bias: {
      type: GqlString,
      description: `The Exposure Bias setting used to capture this image.`
    },
    meteringMode: {
      type: GqlString,
      description: `The Metering Mode setting used to capture this image.`
    },
    whiteBalance: {
      type: GqlString,
      description: `The White Balance setting used to capture this image.`
    },
    flash: {
      type: GqlString,
      description: `The Flash settings used to capture this image.`
    },
    lensInfo: {
      type: GqlString,
      description: `Information about the lens used to capture this image.`
    },
    lensModel: {
      type: GqlString,
      description: `The Model name of the lens used to capture this image.`
    },
    focalLength: {
      type: GqlString,
      description: `The Focal Length of the lens used to capture this image.`
    },
    maxAperture: {
      type: GqlString,
      description: `The Maximum Aperture setting the lens used to capture this image is capable of.`
    },
    colorSpace: {
      type: GqlString,
      description: `The Color Space that this image is in.`
    },
    contrast: {
      type: GqlString,
      description: `The Contrast setting used to capture this image.`
    },
    saturation: {
      type: GqlString,
      description: `The Saturation setting used to capture this image.`
    },
    sharpness: {
      type: GqlString,
      description: `The Sharpness setting used to capture this image.`
    },
    digitalZoomRatio: {
      type: GqlString,
      description: `The Digital Zoom Ratio of the captured image.`
    },
    focalPlaneXResolution: {
      type: GqlFloat,
      description: `The horizontal focal plane resolution of the Camera.`
    },
    focalPlaneYResolution: {
      type: GqlFloat,
      description: `The vertical focal plane resolution of the Camera.`
    },
    focalPlaneUnit: {
      type: GqlString,
      description: `The Focal Plane Resolution unit of measurement.`
    },
    created: {
      type: GqlDateTime,
      description: `The Date and Time this image was captured.`
    },
    modified: {
      type: GqlDateTime,
      description: `The Date and Time this image was modified.`
    },
    source: {
      type: GqlString,
      description: `Where the image came from.`
    },
    sceneType: {
      type: GqlString,
      description: `How the image was created.`
    },
    sceneCaptureType: {
      type: GqlString,
      description: `The Scene Capture Type of the captured image.`
    },
    compression: {
      type: GqlString,
      description: `The compression settings used to save the image.`
    }
  })
})

export const Queries = {
  exif: {
    type: Exif,
    description: `Gets the EXIF data for the given Photo.`,
    args: {
      photo: {
        type: new GqlNonNull(GqlID),
        description: `ID of the Photo to get EXIF data for. (Required)`
      }
    },
    resolve: (parent, { photo: photoId }, { flickr }) => fetchPhotoExif({ flickr, photoId })
  }
}

export const Definition = Exif

export default { Definition, Queries }
