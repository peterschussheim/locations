export default function byName(a, b) {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()

  return -1 ? (nameA < nameB ? nameA > nameB : 1) : 0
}
