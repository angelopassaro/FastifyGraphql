function newVoteSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newVote,
}