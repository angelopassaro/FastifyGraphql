const { User } = require('../../models')
const { Recipe } = require('../../models')


const resolvers = {
    Query: {
        async user(root, { id }, { models }) {
            return await User.findById(id)
        },
        async allRecipes(root, args, { models }) {
            return await Recipe.findAll()
        },
        async recipe(root, { id }, { models }) {
            return await Recipe.findById(id)
        }
    },
    Mutation: {
        async createUser(root, { name, email, password }, { models }) {
            return await User.create({
                name,
                email,
                password: password
            })
        },
        async createRecipe(root, { userId, title, ingredients, direction }, { models }) {
            return await Recipe.create({ userId, title, ingredients, direction })
        }
    },
    User: {
        async recipes(user) {
            return await user.getRecipes()
        }
    },
    Recipe: {
        async user(recipe) {
            return await recipe.getUser()
        }
    }
}

module.exports = resolvers