declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_DATAMGMT_BASEURL: string
        }
    }
}
export { }