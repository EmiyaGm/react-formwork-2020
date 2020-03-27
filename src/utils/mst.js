import { types } from 'mobx-state-tree'

const maybeNullAll = obj => {
  const tmp = {}

  Object.keys(obj).forEach(item => {
    tmp[item] = types.maybeNull(obj[item])
  })

  return tmp
}

const tableDataSourceTypeWrapper = (getTypeFuction = () => {}, addonStore = null) => {
  let tmpTypes = {
    ...getTypeFuction(),
  }

  if (addonStore) {
    tmpTypes = {
      ...tmpTypes,
      ...addonStore,
    }
  }

  const model = types.model(tmpTypes)

  return types.maybeNull(types.array(types.maybeNull(model)))
}

const wipeNullOutOfArray = toWipedArray => toWipedArray.filter(item => item)

const injectDateFieldValue = dataArray => {
  const injectedResult = dataArray.map(item => {
    if (!item) return null

    const { createdAt, updatedAt } = item

    return {
      ...item,
      createdAt: createdAt ? new Date(createdAt) : null,
      updatedAt: updatedAt ? new Date(updatedAt) : null,
    }
  })

  const withOutNull = wipeNullOutOfArray(injectedResult)

  return withOutNull.length > 0 ? withOutNull : null
}

export { maybeNullAll, tableDataSourceTypeWrapper, injectDateFieldValue }
