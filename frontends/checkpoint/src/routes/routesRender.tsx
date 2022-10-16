import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotAuthorizePage } from "../pages/general/NotAuthorizePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LoginPage } from "../pages/general/loginPage";
import { HomePage } from "../pages/general/HomePage";
import { AdminLayout } from "./Layout/AdminLayout";
import { PiLayout } from "./Layout/PiLayout";
import { AdminHomePage } from "../pages/admin/HomePage";
import { UserPage } from "../pages/admin/UserPage";
import { LocationPage } from "../pages/admin/LocationPage";
import { PasswordPage } from "../pages/admin/PasswordPage";
import { DestinationPage } from "../pages/admin/DestinationPage";
import { PasscodePage } from "../pages/admin/PasscodePage";
import { PhotosPage } from "../pages/admin/PhotosPage";
import { CheckpointLayout } from "./Layout/CheckpointLayout";
import { CheckpointHomepage } from "../pages/checkpoint/HomePage";
export const RouterRender = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<AdminLayout></AdminLayout>}>
                    <Route
                        path=''
                        element={<AdminHomePage></AdminHomePage>}></Route>
                    <Route path='user' element={<UserPage></UserPage>}></Route>
                    <Route
                        path='location'
                        element={<LocationPage></LocationPage>}></Route>
                    <Route
                        path='password'
                        element={<PasswordPage></PasswordPage>}></Route>
                    <Route
                        path='destination'
                        element={<DestinationPage></DestinationPage>}></Route>
                    <Route
                        path='passcode'
                        element={<PasscodePage></PasscodePage>}></Route>
                    <Route
                        path='photo'
                        element={<PhotosPage></PhotosPage>}></Route>
                    <Route path='pi' element={<PiLayout></PiLayout>}>
                        <Route path=''></Route>
                    </Route>
                </Route>
                <Route path='/camman'>
                    <Route path=''></Route>
                </Route>
                <Route
                    path='/checkpoint'
                    element={<CheckpointLayout></CheckpointLayout>}>
                    <Route
                        path=''
                        element={
                            <CheckpointHomepage></CheckpointHomepage>
                        }></Route>
                    <Route path='qrcode'></Route>
                    <Route path='edit'></Route>
                </Route>
                <Route path='/'>
                    <Route path='' element={<HomePage></HomePage>}></Route>
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
