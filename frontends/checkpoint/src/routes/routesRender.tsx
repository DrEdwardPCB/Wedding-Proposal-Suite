import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
export const RouterRender = () => {
    const renderGeneral = () => {
        return;
    };
    return (
        <Routes>
            <Route path='admin'></Route>
            <Route path='camman'></Route>
            <Route path='checkpoint'></Route>
            <Route path='/'>
                <Route path='login'></Route>
            </Route>
            <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
    );
};
