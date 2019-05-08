const bcrypt = require('bcrypt')

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({ ...args, password })

    const token = context.fastify.jwt.sign({ userId: user.id })

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = context.fastify.jwt.sign({ userId: user.id })

    return {
        token,
        user,
    }
}



function post(parent, args, context, info) {
    const userId = context.fastify.getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    })

}

module.exports = {
    signup,
    login,
    post
}
