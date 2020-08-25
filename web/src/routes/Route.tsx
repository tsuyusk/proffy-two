import React from "react";

import {
  Route as ReactRouterRoute,
  RouteProps as ReactRouterRouteProps,
} from "react-router-dom";

interface RouteProps extends ReactRouterRouteProps {}

const Route: React.FC<RouteProps> = ({ ...rest }) => {
  return <ReactRouterRoute {...rest} />;
};

export default Route;
