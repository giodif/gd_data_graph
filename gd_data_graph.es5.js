'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = graph;
// node -> object that represents the intersection of edges
// edge -> unidirectional path from one node to another
//         _nodes only know about adjacent _nodes and don't know who their adjacent
//         _nodes are then adjacent.
// edge dependencies -> criteria for being allowed to pass from one node to another
// events -> for all graph actions at node and graph level

// is function
var isf = function isf(f) {
    return f && {}.toString.call(f) === '[object Function]';
};
// is string
var iss = function iss(s) {
    return s && typeof s === 'string';
};

var _map = function _map(obj, fn) {
    var obj2 = {};
    for (var key in obj) {
        obj2[key] = fn(key, obj[key], obj);
    }
    return obj2;
};

//uid index shared by all graphs
var _uids = 0;

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

var uid = function uid() {
    return "DG_" + ++_uids;
};

function graph() {
    // node id and node data
    var _n = {};
    // object map of edges from one node
    // to another and weight of each edge
    var _e = {};

    var has = function has(id) {
        return _n[id] && _e[id];
    };
    var connected = function connected(id1, id2) {
        return has(id1) && has(id2) && _e[id1].hasOwnProperty(id2);
    };

    var ids = function ids() {
        return Object.keys(_n);
    };
    var node = function node(id) {
        return has(id) ? _n[id] : false;
    };
    var edges = function edges(id) {
        return has(id) ? _e[id] : false;
    };
    var degree = function degree(id) {
        return has(id) ? _e[id].length : false;
    };
    var remove = function remove(id) {
        if (!has(id)) {
            return false;
        }
        delete _n[id];
        delete _e[id];
        return true;
    };

    var add = function add() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var id = uid();
        _n[id] = data;
        _e[id] = {};
        return id;
    };

    var connect = function connect(id1, id2) {
        var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        if (connected(id1, id2)) {
            return false;
        }
        _e[id1][id2] = w;
        return true;
    };
    var sever = function sever(id1, id2) {
        if (!connected(id1, id2)) {
            return false;
        }
        delete _e[id][id2];
        return true;
    };

    var each = function each(fn) {
        return ids().forEach(function (id) {
            return fn(id, _n[id], _e[id]);
        });
    };

    return {
        has: has,
        connected: connected,
        ids: ids,
        node: node,
        edges: edges,
        degree: degree,
        remove: remove,
        add: add,
        each: each,
        connect: connect,
        sever: sever
    };
}
