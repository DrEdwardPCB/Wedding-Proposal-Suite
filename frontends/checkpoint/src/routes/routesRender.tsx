import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotAuthorizePage } from "../pages/general/NotAuthorizePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LoginPage } from "../pages/general/loginPage";
export const RouterRender = () => {
    const renderGeneral = () => {
        return;
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path='admin'>
                    <Route path='pi'>
                        <Route path='/'></Route>
                        <Route path='/'></Route>
                    </Route>
                </Route>
                <Route path='camman'>
                    <Route path='/'></Route>
                </Route>
                <Route path='checkpoint'>
                    <Route path='/'></Route>
                    <Route path='qrcode'></Route>
                    <Route path='edit'></Route>
                </Route>
                <Route path='/'>
                    <Route
                        path='login'
                        element={<LoginPage></LoginPage>}></Route>
                    <Route
                        path='unauthorize'
                        element={<NotAuthorizePage></NotAuthorizePage>}></Route>
                </Route>
                <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
            </Routes>
        </BrowserRouter>
    );
};
