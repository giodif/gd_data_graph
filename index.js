var graph = require("./gd_data_graph.es5").default;

const g = graph()

const a = g.add({content: "sup"})
const b = g.add({content: "second thing"})
const c = g.add({content: "another thing"})

g.connect(a, b)
g.connect(a, c)
g.connect(b, a)
g.connect(c, b)

// console.log(g.ids())

// g.ids().forEach( id => console.log( g.node(id) ) )

// console.log( g.connected(a, b) )
// console.log( g.connected(a, c) )
// console.log( g.connected(b, a) )
// console.log( g.connected(c, b) )
// console.log( g.connected(c, a) )

g.each((id, data, connections) => console.log(id, data, connections))