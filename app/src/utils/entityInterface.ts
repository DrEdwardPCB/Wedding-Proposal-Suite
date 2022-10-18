import { Point } from 'geojson';
export interface User {
    id: string
    loginName: string
    password: string
    isCameraMan: boolean
    isAdmin: boolean
    isApp: boolean
    location?: Location
}

export interface Location {
    id: string
    user: User | null
    displayName: string | null
    message: string | null
    photoone: string | null
    phototwo: string | null
    photothree: string | null
    location: Point | null
    next: Location | null
    prev: Location | null
    locationDescription: string
    scanTime: Date | null
    destinationPartial?: DestinationPartial
    passwordPartial?: PasswordPartial

}
export interface DestinationPartial {
    id: string;
    location: Location | null
    message: string

}
export interface PasswordPartial {
    id: string;
    location: Location | null
    message: string

}
export interface Photo {
    id: string
    createdAt: Date
    photo: string
    deletedAt: Date | null
}
export interface Passcode {
    passcode: string
}