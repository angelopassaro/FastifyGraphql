function feed(parent, args, context, info) {
    return context.prisma.links()
}

function links(parent, args, context) {
    return context.prisma.user({ id: parent.id }).links()
}


module.exports = {
    feed,
    links,

}