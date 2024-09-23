
import express from "express"

import { PrismaClient } from '@prisma/client'

app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );
  

const prisma = new PrismaClient()

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.get('/usuarios', async (request, response) => {

    const users = await prisma.user.findMany()

    response.status(200).json(users)

});

app.post('/usuarios', async (request, response) => {

    await prisma.user.create({
        data: {
            email: request.body.email,
            age: request.body.age,
            name: request.body.name
        }
    })

    response.status(201).json({ Message: "Usuário cadastrado com sucesso" })

})

app.put('/usuarios/:id', async (request, response) => {

    const user = await prisma.user.update({
        where: {
            id: request.params.id
        },
        data: {
            email: request.body.email,
            age: request.body.age,
            name: request.body.name
        }
    })

    response.status(200).json(user)

})

app.delete('/usuarios/:id', async (request, response) =>{
    await prisma.user.delete({
        where: {
            id: request.params.id
        }
    })
    response.status(200).json({Message: "Êeeeeeee, meu parceiro! Tu apagou o cara mesmo né. Mó paia issuaí"})
})

app.listen(port)

/* 

    name: davi
    password: ajjdln4455

    npx prisma studio - para abrir a janela de testes no localhost:5555

    node --watch server.js - para rodar o código e não precisar ficar salvando

*/