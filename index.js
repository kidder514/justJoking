import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { AppRegistry, AsyncStorage, Text } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './app/reducer';
import AppWithNavigationState from './app/AppNavigator';
import { persistStore, autoRehydrate } from 'redux-persist'
import ActivityIndicatorWrapper from "./app/ActivityIndicatorWrapper"

const store = createStore(
	rootReducer,
	undefined,
	compose(
		applyMiddleware(thunk, logger),
		autoRehydrate()
		)
	);

//disable the SetTimeInterval Yellow Box
// console.disableYellowBox = true;

export default class JustJoking extends Component {
	constructor(props){
		super(props);
		this.state = {
			rehydrated: false
		}
	}

	// initial the store with AsyncStorage
	// otherwise the initial store will be used from
	componentWillMount(){
		persistStore(store, { storage: AsyncStorage, blacklist: ['Nav'] }, () => {
			this.setState({ rehydrated: true })
		})
	}

  	render() {
  		if(!this.state.rehydrated) 
  			return <ActivityIndicatorWrapper />;

		return (
			<Provider store={store}>
				<AppWithNavigationState />
			</Provider>
		);
  	}
}

AppRegistry.registerComponent('JustJoking', () => JustJoking);
