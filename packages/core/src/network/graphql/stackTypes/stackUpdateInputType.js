import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import GraphQLJSON from 'graphql-type-json'

const stackUpdateInputType = new GraphQLInputObjectType({
  name: 'stackUpdateInputType',
  description: 'A Stack is a group of actions that can be triggered at once or sequentially by a controller',
  fields: {
    id: {
      type: GraphQLString
    },
    label: {
      type: GraphQLString
    },
    panelLabel: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    realm: {
      type: GraphQLString
    },
    core: {
      type: GraphQLString
    },
    actions: {
      type: new GraphQLList(
        new GraphQLInputObjectType({
          name: 'stackActionInputType',
          description: 'An action is something that happens on a device or piece of software',
          fields: {
            device: {
              type: new GraphQLInputObjectType({
                name: 'stackDeviceInputType',
                fields: {
                  id: {
                    type: GraphQLString
                  },
                  label: {
                    type: GraphQLString
                  },
                  provider: {
                    type: new GraphQLInputObjectType({
                      name: 'stackDeviceProviderInputType',
                      fields: {
                        id: {
                          type: GraphQLString
                        },
                        label: {
                          type: GraphQLString
                        }
                      }
                    })
                  }
                }
              })
            },
            providerFunction: {
              type: new GraphQLInputObjectType({
                name: 'stackDeviceProviderFunctionInputType',
                fields: {
                  id: {
                    type: GraphQLString
                  },
                  label: {
                    type: GraphQLString
                  }
                }
              })
            },
            parameters: {
              type: new GraphQLList(
                new GraphQLInputObjectType({
                  name: 'stackActionParametersInputType',
                  fields: {
                    id: {
                      type: GraphQLString
                    },
                    value: {
                      type: GraphQLJSON
                    }
                  }
                })
              )
            }
          }
        })
      )
    }
  }
})

export default stackUpdateInputType
