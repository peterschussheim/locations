import data from './data/data'
import { makeChildMap, traverse } from './lib/index'

const map = makeChildMap(data)

traverse(map, 0, 0)
