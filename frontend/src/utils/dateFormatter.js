export const formatDate = (date, locale = 'en-US', options = {}) => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}
