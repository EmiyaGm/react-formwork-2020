export default field => {
  let newField = ''
  if (typeof (field) === 'string') {
    const fieldArray = field.split('_')
    for (let i = 1; i < fieldArray.length; i += 1) {
      if (fieldArray[i]) {
        fieldArray[i] = fieldArray[i].charAt(0).toUpperCase() + fieldArray[i].slice(1)
      }
    }
    newField = fieldArray.join('')
  }
  return newField
}
