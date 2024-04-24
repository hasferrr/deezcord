export const trimString = (str: string) => str.replace(/\s+/g, ' ').trim()

export const isValidChannelName = (input: string): boolean => {
  // Check if the string has whitespace
  const hasWhitespace = /\s/.test(input)
  if (hasWhitespace) {
    return false
  }

  // Check if the string has uppercase characters
  if (input !== input.toLowerCase()) {
    return false
  }

  return true
}

export const modifyString = (input: string): string => {
  let modifiedString = input

  // Lowercase the string
  modifiedString = modifiedString.toLowerCase()

  // Replace whitespace with hyphen
  modifiedString = modifiedString.replace(/\s+/g, '-')

  return modifiedString
}

const getDateInformation = (date0: Date | string) => {
  const date = typeof date0 === 'string'
    ? new Date(date0)
    : date0

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ]

  const month = monthNames[date.getMonth()]
  const day = dayNames[date.getDay()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()

  const hour = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  const adjustedHour = date.getHours() % 12 || 12

  return {
    month,
    day,
    dayOfMonth,
    year,
    hour,
    minutes,
    ampm,
    adjustedHour,
  }
}

/**
 * Takes a Date, returns formatted string "04/01/2024 10:30 AM"
 */
export const formatDate = (date0: Date | string): string => {
  const date = typeof date0 === 'string'
    ? new Date(date0)
    : date0

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()

  // const hour = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  const adjustedHour = date.getHours() % 12 || 12

  return `${month}/${day}/${year} ${adjustedHour}:${minutes} ${ampm}`
}

/**
 * Takes a Date, returns formatted string "Monday, April 1, 2024 03:49 PM"S
 */
export const formatDateWithTime = (date0: Date | string): string => {
  const {
    month,
    day,
    dayOfMonth,
    year,
    minutes,
    ampm,
    adjustedHour,
  } = getDateInformation(date0)

  return `${day}, ${month} ${dayOfMonth}, ${year} ${adjustedHour}:${minutes} ${ampm}`
}

/**
 * Takes a date and return like "X years ago" from now
 */
export const yearDifferenceYearFromNow = (date0: Date | string): string => {
  const date = typeof date0 === 'string'
    ? new Date(date0)
    : date0

  // Calculate the difference in milliseconds
  const diff = Date.now() - date.getTime()

  // Convert milliseconds to years
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))

  // Return formatted string
  return years > 0 ? `${years} year${years > 1 ? 's' : ''} ago` : 'this year'
}

/**
 * Format date to like `October 13, 2018`
 */
export const formatDateMinimal = (date0: Date | string): string => {
  const {
    month,
    dayOfMonth,
    year,
  } = getDateInformation(date0)

  return `${month} ${dayOfMonth}, ${year}`
}

export const getFileURLFromGCS = (fileName: unknown) => `https://storage.googleapis.com/server-profile/${fileName}`
