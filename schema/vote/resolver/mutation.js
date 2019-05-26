async function vote(parent, args, context, info) {
    const userId = context.getUserId(context)

    console.log(userId)

    const linkExists = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId },
    })
    if (linkExists) {
        throw new Error(`Already voted for link: ${args.linkId}`)
    }

    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
    })
}

module.exports = {
    vote
}