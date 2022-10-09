export type TPermission = "admin" | "general" | "checkpoint" | "pi" | "camman";
export interface IRoutes {
    path: string;
    component: JSX.Element;
    name: string;
    permission: TPermission;
    reroute: string;
}
export interface IRouteRegistry {
    general: IRoutes[];
    admin: IRoutes[];
    pi: IRoutes[];
    checkpoint: IRoutes[];
    camman: IRoutes[];
}
export const routeRegistry = {
    general: [],
    admin: [],
    pi: [],
    checkpoint: [],
    camman: [],
};
