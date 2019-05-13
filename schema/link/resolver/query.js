function postedBy(parent, args, context) {
    return context.prisma.link({ id: parent.id }).postedBy()
}


const link = {
    postedBy(parent, args, context) {
        return context.prisma.link({ id: parent.id }).postedBy()
    }
}

module.exports = {
    postedBy,
    Link: link
}