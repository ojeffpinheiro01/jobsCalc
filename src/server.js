const express = require('express')
const server = express()

server.set('view engine', 'ejs')

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(require('./routes'))

server.listen(3000, () => console.log('Server on / Port: 3000'))