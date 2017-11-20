export default function traverse(map, current, level) {
  if (!map[current]) {
    return
  }
  map[current].forEach(n => {
    /* eslint no-console: 0 */
    console.log(`${'-'.repeat(level)}${n.name}`)
    if (map[n.id]) {
      traverse(map, n.id, level + 1)
    }
  })
}
