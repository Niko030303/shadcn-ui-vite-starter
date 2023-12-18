const initialState = {
  counter: 0
}

interface StateType {
  counter: number;
}

interface ActionsParamType {
  increment: number;
}

const model: ModelType<StateType, ActionsParamType> = {
  actions: {
    increment: async (payload, { state }) => {
      return {
        counter: state.counter + (payload || 1)
      }
    }
  },
  state: initialState
}

export default model
