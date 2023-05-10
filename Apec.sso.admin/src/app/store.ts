import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas/rootSaga';
import authReducer from '../features/auth/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from '../utils/history';
import userReducer from '../features/user/userSlice';
import clientReducer from '../features/client/clientSlice';
import apiScopesReducer from '../features/apiScopes/apiScopesSlice';
import roleReducer from '../features/role/roleSlice';
import userHistoryReducer  from '../features/history/historySlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    client: clientReducer,
    apiScopes: apiScopesReducer,
    history: userHistoryReducer,
    router: connectRouter(history),
})

const sagaMiddleWare = createSagaMiddleware()
export const store = configureStore({
  reducer : rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare, routerMiddleware(history  )),
});

sagaMiddleWare.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
