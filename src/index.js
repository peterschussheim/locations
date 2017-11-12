import data from './data/data'
import { makeChildMap, traverse } from './lib/index'

const map = makeChildMap(data)
console.log(map)
traverse(map, 0, 0)
