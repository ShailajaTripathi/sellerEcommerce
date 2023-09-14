import { configureStore } from '@reduxjs/toolkit'


import createSagaMiddleware from 'redux-saga'
import rootSaga from './Sagas'
import { rootReducer } from './Slices'


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({

  reducer: rootReducer,
//   devTools:false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
export default store