import { configureStore } from '@reduxjs/toolkit'
import reducer from './slice';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: {
        main: reducer,
    },
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(saga);