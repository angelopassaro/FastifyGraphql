function feed(parent, args, context, info) {
    return context.prisma.links()
}

function links(parent, args, context) {
    return context.prisma.user({ id: parent.id }).links()
}

const user = {
    links(parent, args, context) {
        return context.prisma.user({ id: parent.id }).links()
    }
}

module.exports = {
    feed,
    links,
    User: user
}