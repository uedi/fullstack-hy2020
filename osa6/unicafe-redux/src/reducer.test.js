import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }
    const testState = {
        good: 2,
        ok: 2,
        bad: 2
    }

    test('should return a proper initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = testState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({ ...testState, good: testState.good + 1 })
    })

    test('ok is incremented', () => {
        const action = {
            type: 'OK'
        }
        const state = testState
        
        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({ ...testState, ok: testState.ok + 1 })
    })

    test('bad is incremented', () => {
        const action = {
            type: 'BAD'
        }
        const state = testState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({ ...testState, bad: testState.bad + 1 })
    })

    test('zero resets to initial state', () => {
        const action = {
            type: 'ZERO'
        }
        const state = testState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual(initialState)
    })
})