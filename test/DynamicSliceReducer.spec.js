import { DynamicSliceReducer, sliceReducer } from '../src';

describe('DynamicSliceReducer Tests', () => {
    it('checks creation', () => {
        const dynamicReducer = new DynamicSliceReducer();
        const reducer = dynamicReducer.reducer();
        expect(reducer('a')).toBe('a');
        expect(reducer()).toEqual({});
    });

    it('checks registration', () => {
        const dynamicReducer = new DynamicSliceReducer();
        class A {
            someAction() {}
        }
        const reducer = sliceReducer('a')(A);

        const reducerInstance = dynamicReducer.register(reducer);

        reducerInstance.someAction = jest.fn();
        reducerInstance.someAction.mockReturnValue({});

        expect(reducerInstance).toBeInstanceOf(A);
        expect(dynamicReducer.sliceReducers.length).toBe(1);
        expect(dynamicReducer.sliceReducers[0]).toBe(reducerInstance);

        dynamicReducer.combinedSlicesReducer({ a: {} }, { type: 'someAction', payload: [1, 2, 3], _namespace: 'blah' });
        expect(reducerInstance.someAction).toHaveBeenCalledWith({}, 1, 2, 3);
    });
});
