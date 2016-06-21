var R = require('ramda')

var source = {
  taglia: ['m','l', 'xl'],
  colore: ['red', 'green', 'yellow'],
  materiale: ['pelle', 'plastica']
}

R.zipObj(['taglia', 'colore'], ['m', 'l', 'uno'])
R.fromPairs([['taglia', 'colore'], ['m', 'l', 'p']])
R.xprod(['taglia', 'colore'], ['m', 'l', 'p'])

R.xprod(R.map(k => [k, source[k]]), R.keys(source))
R.map(k => R.xprod(R.times(i => k, source[k].length), source[k]), R.keys(source))
R.map(k => R.zipObj(R.times(i => k , source[k].length), source[k]), R.keys(source))


var arr = R.map(a => R.merge(...a), R.xprod(...R.map(k => R.times(i => {return {[k]:source[k][i]}} , source[k].length), R.keys(source))))
//arr = R.map(k => R.times(i => {return {[k]:source[k][i]}} , source[k].length), R.keys(source))
//var res = R.map(a => R.merge(...a), R.xprod(...arr))
console.log(arr)

// res = [{taglia: 'm', colore:'red'}, {taglia: 'm', colore: 'green'}, ...]
