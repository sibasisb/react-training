const {buildSchema}=require('graphql')

module.exports=buildSchema(`
    
    type Product {
        id: String!
        title: String!
        price: String!
        description:String! 
        imageUrl: String!
        expiryDate: String!
    }

    type Todo {
        id: Int!
        title: String!
        description: String!
        unchecked: Boolean
    }

    type User{
        userId:String!
        email:String!
        firstName:String!
        lastName:String
        password:String!
        dob:String!
        role:String!
        pic:String
        todos:[Todo]
    }

    type ProductQueryResponse {
        product: Product
        message: String!
    }

    type UserDto {
        userId:String!
        email:String!
        firstName:String!
        lastName:String
        dob:String!
        role:String!
        pic:String
        todos:[Todo]
    }

    type UserQueryResponse {
        user: UserDto
        message: String!
    }

    type AuthData {
        user:UserDto
        message: String!
        token: String
    }

    type Query{
        users:[User!]!
        user(userId:String!):UserQueryResponse
        signin(email: String!, password: String!): AuthData
        products:[Product]
        product(productId: String!): ProductQueryResponse
    }

    input UserInputData{
        email: String!
        firstName: String!
        lastName: String
        password: String!
        dob: String!
        pic: String
    }

    input ProductInputData {
        title: String!
        price: String!
        description: String!
        expiryDate: String!
        imageUrl: String!
    }

    type CreateUserResponse {
        message: String
        statusCode: String
    }

    type CreateProductResponse {
        message: String!
        product: Product
    }

    type DeleteUserResponse {
        message: String!
        statusCode: String
    }

    input UserUpdateInfo {
        userId: String!
        firstName: String!
        lastName: String
        password: String!
        pic: String
        dob: String!
    }

    type UpdateUserResponseInfo {
        userId: String!
        firstName: String!
        lastName: String
        pic: String
        dob: String!
    }

    type UpdateUserResponse {
        user: UpdateUserResponseInfo
        message: String!
    }

    input EditProductInputData{
        productId: String!
        title: String!
        price: String!
        description: String!
        expiryDate: String!
        imageUrl: String!
    }

    type DeleteProductResponse {
        message: String!
        statusCode: String!
    }

    input TaskInputInfo{
        title: String!
        description: String!
    }

    type CreateTaskResponse {
        message: String!
        statusCode: String
    }

    input EditTaskInputInfo{
        id: Int!
        title: String!
        description: String!
        unchecked: Boolean
    }

    type Mutation{
        createUser(userInput:UserInputData): CreateUserResponse
        createProduct(productInput:ProductInputData): CreateProductResponse
        deleteUser(userId: String!): DeleteUserResponse
        updateUser(userInfo:UserUpdateInfo): UpdateUserResponse
        editProduct(productInput:EditProductInputData): CreateProductResponse
        deleteProduct(productId: String!): DeleteProductResponse
        createTask(taskInput: TaskInputInfo!): CreateTaskResponse
        editTask(taskInput: EditTaskInputInfo!): CreateTaskResponse
    } 

    schema{
        query: Query,
        mutation:Mutation
    }

`)