
'use strict'

module.exports = async function (fastify) {
    return {
        signup: async (parent, args, context, info) => {
            const password = await bcrypt.hash(args.password, 10)
            const user = await context.prisma.createUser({ ...args, password })

            const token = fastify.jwt.sign({ userId: user.id }, APP_SECRET)

            return {
                token,
                user,
            }
        },

        login: async (parent, args, context, info) => {
            const user = await context.prisma.user({ email: args.email })
            if (!user) {
                throw new Error('No such user found')
            }

            const valid = await bcrypt.compare(args.password, user.password)
            if (!valid) {
                throw new Error('Invalid password')
            }

            const token = fastify.jwt.sign({ userId: user.id }, APP_SECRET)

            return {
                token,
                user,
            }
        }
    }
}