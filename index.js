import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import { AppRegistry, AsyncStorage, Text } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './app/reducer';
import App from './app/App';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    undefined,
    compose(applyMiddleware(thunk, logger))
);
const persistor = persistStore(store);

// disable the SetTimeInterval Yellow Box
console.disableYellowBox = true;

const JustJoking = () => {    
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
}

AppRegistry.registerComponent('JustJoking', () => JustJoking);
