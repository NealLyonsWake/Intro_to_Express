const express = require('express')
const app = express()
const port = 3000

const TOYS = [
    {
        id: 1,
        name: "Tchoo tchoo train",
        price: "100",
        minimalAge: 3
    },
    {
        id: 2,
        name: "Teddy the bear",
        price: "10",
        minimalAge: 1
    },
    {
        id: 3,
        name: "Duplo set",
        price: "25",
        minimalAge: 2
    },
    {
        id: 4,
        name: "Lego set",
        price: "30",
        minimalAge: 5
    },
    {
        id: 5,
        name: "Remote controlled car",
        price: "50",
        minimalAge: 7
    }
]

function queryAgeName(age, name) {
    console.log(age)
    if (!isNaN(age) && name !== undefined) {
        const filterToy = TOYS.filter((toy) => {
            return toy.minimalAge <= age;
        })
        const searchToy = filterToy.filter((toy) => {
            return toy.name.includes(name)
        })
        return searchToy;

    } else if (!isNaN(age) && name === undefined) {
        const filterToy = TOYS.filter((toy) => {
            return toy.minimalAge <= age;
        })
        return filterToy

    } else if (isNaN(age) && name !== undefined) {
        const searchToy = TOYS.filter((toy) => {
            return toy.name.includes(name)
        })
        return searchToy;
    } else { return TOYS }
}


function findProductId(id) {
    const filterToy = TOYS.filter((toy) => {
        return toy.id === id;
    })
    console.log(filterToy)
    return filterToy
}


app.get('/products/:id', (req, res) => {
    const id = parseFloat(req.params.id)
    res.send(findProductId(id))
})

app.get('/search', (req, res) => {
    const { age, name } = req.query
    res.send(queryAgeName(parseFloat(age), name))
})


app.get('/', (req, res) => {
    res.send(TOYS)
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})