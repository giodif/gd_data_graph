const nodes = {
    id0:{
        content : "THis is some content"
    },
    id1:{
        thing: "sup"
    },
    id2:{
        yo: 3
    }
}

const edges = {
    id0: {
        id1: 0.5,
        id2: 0.25
    },
    id1: {id0: 0.9}
    id2: {id1: 0.76}
}