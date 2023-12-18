const initialState = {
  counter: 0
}

const model = {
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
