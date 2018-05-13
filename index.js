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
import Config from 'react-native-config'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist : ['Auth']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleWare;
if (Config.DEBUG) {
    middleWare = applyMiddleware(thunk, logger);
} else {
    middleWare = applyMiddleware(thunk);
}

const store = createStore(
    persistedReducer,
    undefined,
    compose(middleWare)
);
const persistor = persistStore(store);

// uncomment this line if you need to purge your store
// persistor.purge();

// disable the SetTimeInterval Yellow Box
console.disableYellowBox = true;

const JustJokes = () => {    
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
}

AppRegistry.registerComponent('JustJokes', () => JustJokes);
