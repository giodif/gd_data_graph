// node -> object that represents the intersection of edges
// edge -> unidirectional path from one node to another
//         _nodes only know about adjacent _nodes and don't know who their adjacent
//         _nodes are then adjacent.
// edge dependencies -> criteria for being allowed to pass from one node to another
// events -> for all graph actions at node and graph level

// is function
const isf = f => f && {}.toString.call(f) === '[object Function]'
// is string
const iss = s => s && typeof s === 'string'

const _map = (obj, fn) => {
    const obj2 = {}
    for (const key in obj){
        obj2[key] = fn( key, obj[key], obj )
    }
    return obj2
}

const _c = () => true

//uid index shared by all graphs
let _uids = 0

//nodes
/*
    _n = {
        id1: {
            a: "thing"
            b: 4,
            e: ...
        },
        id2: {
            ...
        },
        ...
    }
    _e = {
        id1: {
            id2: 0.7,
            id3: 0.2
        },
        id2: {
            id1: 0.3,
            ...
        },
        ...
    }
*/

const uid = () => "DG_" + ++_uids

export default function graph(){
    // node id and node data
    const _n = {}
    // object map of edges from one node
    // to another and weight of each edge
    const _e = {}

    const has = id => _n[id] && _e[id]
    const connected = (id1, id2) => {
        return has(id1)
        && has(id2)
        && _e[id1].hasOwnProperty(id2)
    }

    const ids = () => Object.keys(_n)
    const node = id => has(id) ? _n[id] : false
    const edges = id => has(id) ? _e[id] : false
    const degree = id => has(id) ? _e[id].length : false
    const remove = id => {
        if (!has(id)) { return false }
        delete _n[id]
        delete _e[id]
        return true
    }

    const add = (data = {}) => {
        const id = uid()
        _n[id] = data
        _e[id] = {}
        return id;
    }

    const connect = (id1, id2, c = _c ) => {
        if (connected(id1, id2)) { return false }
        _e[id1][id2] = c
        return true
    }

    const sever = (id1, id2) => {
        if (!connected(id1, id2)) { return false }
        delete _e[id][id2]
        return true
    }

    const each = fn => ids().forEach( id => fn( id, _n[id], _e[id] ) )

    return {
        has,
        connected,
        ids,
        node,
        edges,
        degree,
        remove,
        add,
        each,
        connect,
        sever
    }
}






