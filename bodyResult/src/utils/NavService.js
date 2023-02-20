import React from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';

export class NavService {
  static navigationRef = React.createRef();

  static getNavRef() {
    return this.navigationRef;
  }

  static navigate(name, params) {
    this.navigationRef.current?.navigate(name, params);
  }

  static push(name, params) {
    this.navigationRef.current?.dispatch(StackActions.push(name, params));
  }

  static goBack() {
    this.navigationRef.current?.goBack();
  }

  static goBackToTop() {
    this.navigationRef.current?.dispatch(StackActions.popToTop());
  }

  static popTo(count = 1) {
    this.navigationRef.current?.dispatch(StackActions.pop(count));
  }

  static reset(name) {
    this.navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name}],
      }),
    );
  }

  static replace(name, params) {
    this.navigationRef.current?.dispatch(StackActions.replace(name, params));
  }

  static isCurrentRoute(name) {
    const currentRoute = this.navigationRef.current?.getCurrentRoute();
    return currentRoute?.name === name;
  }

  static getCurrentRoute() {
    return this.navigationRef.current?.getCurrentRoute()?.name;
  }

  static getCurrentRouteParams() {
    return this.navigationRef.current?.getCurrentRoute()?.params;
  }
}
