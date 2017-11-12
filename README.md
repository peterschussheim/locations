# locations

## Given Information

### Input

```
[
  {"id": 1, "name": "San Francisco Bay Area", "parent_id": null},
  {"id": 2, "name": "San Jose", "parent_id": 3},
  {"id": 3, "name": "South Bay", "parent_id": 1},
  {"id": 4, "name": "San Francisco", "parent_id": 1},
  {"id": 5, "name": "Manhattan", "parent_id": 6},
  {"id": 6, "name": "New York", "parent_id": null}
]
```

## Desired Result

Transform the data above using the following rules:

1) Child locations should be immediately after their parent, with an extra dash prepended.
2) Locations of the same level of depth should be alphabetically sorted.
3) Assume that the actual list of locations will be longer (up to 100 locations), and have max up to 5 levels of depth.


```
New York
-Manhattan
San Francisco Bay Area
-San Francisco
-South Bay
--San Jose
```

## Solution

This is a deceptively complex problem due to the requirement that *Locations of the same level of depth should be alphabetically sorted.*

Because we made this program nice and modular, let's first examine the final program, located in `src/index.js`:

```javascript
import data from './data/data'
import { makeChildMap, traverse } from './lib/index'

const map = makeChildMap(data)

// Begin traversing our `map` from the first level,
// hence the functions' 2nd and 3rd args being '0'.
traverse(map, 0, 0)
```
Produces the following result:

```bash
  New York
  -Manhattan
  San Francisco Bay Area
  -San Francisco
  -South Bay
  --San Jose
```

### Closer Look at Utilities

`makeChildMap` and `traverse` are the heart of this solution.  Let's take a closer look at their implementation details.

1) Create an intermediate representation of the data using a JavaScript object literal as a map. Each `node` (node === a location) in our map has an `Array` of children, if it has any.  Additionally, we must sort our map alphabetically using the `byName` function.

```javascript
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
```

Our map has the following shape:

```javascript
{
  '0': [
    { id: 6, name: 'New York', parent_id: null },
    { id: 1, name: 'San Francisco Bay Area', parent_id: null }
  ],
  '1': [
    { id: 4, name: 'San Francisco', parent_id: 1 },
    { id: 3, name: 'South Bay', parent_id: 1 }
  ],
  '3': [{ id: 2, name: 'San Jose', parent_id: 3 }],
  '6': [{ id: 5, name: 'Manhattan', parent_id: 6 }]
}

```

2) Now that we have a structured map of our data, lets use our `traverse` function to **recursively** visit each node and print to the console the desired solution.

```javascript
export default function traverse(map, current, level) {
  if (!map[current]) {
    return
  }
  map[current].forEach(n => {
    console.log(`${'-'.repeat(level)}${n.name}`)
    if (map[n.id]) {
      traverse(map, n.id, level + 1)
    }
  })
}
```
