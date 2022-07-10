import isAuthenticated from './isAuthenticated';
import isAdmin from './isAdmin';
import { Navigate, Route } from 'react-router-dom';

export const AuthenticatedRoute = (path, element) => {
    if (!isAuthenticated()){
        element = <Navigate to='/'/>;
    }

    return < Route path = {path} element = {element} />
};

export const UnauthenticatedRoute = (path, element) => {
    if (isAuthenticated()){
        element = <Navigate to='/'/>;
    }

    return < Route path = {path} element = {element} />

};

export const AdminRoute = (path, element) => {
    if (!isAdmin()){
        element = <Navigate to='/'/>;
    }

    return < Route path = {path} element = {element} />
};