import byName from './byName'

export default function makeChildMap(arr) {
  let childMap = {}
  let mapped = arr.map(el => {
    let node = el

    if (childMap[node.parent_id]) {
      childMap[node.parent_id].push(node)
    } else if (node.parent_id === null) {
      if (childMap[0]) {
        childMap[0].push(node)
      } else {
        childMap[0] = [node]
      }
    } else {
      childMap[node.parent_id] = [node]
    }
  })
  Object.keys(childMap).forEach(nodeId => {
    childMap[nodeId].sort(byName)
  })

  return childMap
}
