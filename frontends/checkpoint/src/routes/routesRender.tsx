import { BrowserRouter, Route, Routes } from "react-router-dom";
export const RouterRender = () => {
    const renderGeneral = () => {
        return;
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path='admin'></Route>
                <Route path='camman'></Route>
                <Route path='checkpoint'></Route>
                <Route path='/'>
                    <Route path='login'></Route>
                </Route>
                <Route path='*' element={}></Route>
            </Routes>
        </BrowserRouter>
    );
};
