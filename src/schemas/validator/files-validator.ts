/* eslint-disable implicit-arrow-linebreak, arrow-body-style */
import { z } from 'zod'

export const ACCEPTED_IMAGE_TYPES = [
  'image/apng',
  'image/png',
  'image/x-png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'image/gif',
]
const MAX_IMAGE_SIZE_IN_MB = 2

export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}

export const checkLength = (files: FileList) => {
  return Array.from(files ?? []).length !== 0
}

export const checkSize = (files: FileList) => {
  return Array.from(files ?? []).every((file) =>
    sizeInMB(file.size) <= MAX_IMAGE_SIZE_IN_MB)
}

export const checkTypes = (files: FileList) => {
  return Array.from(files ?? []).every((file) =>
    ACCEPTED_IMAGE_TYPES.includes(file.type))
}

export const failedLength = 'Image is required'
export const failedSize = `The maximum image size is ${MAX_IMAGE_SIZE_IN_MB}MB`
export const failedTypes = 'File type is not supported'

// File Validator
export const filesSizeValidatorAllowNoFile = z.custom<FileList>()
  .refine(checkSize, failedSize)

export const filesSizeValidator = z.custom<FileList>()
  .refine(checkSize, failedSize)
  .refine(checkLength, failedLength)

// Image Validator
export const filesValidatorAllowNoFile = z.custom<FileList>()
  .refine(checkSize, failedSize)
  .refine(checkTypes, failedTypes)

export const filesValidator = filesValidatorAllowNoFile
  .refine(checkLength, failedLength)
