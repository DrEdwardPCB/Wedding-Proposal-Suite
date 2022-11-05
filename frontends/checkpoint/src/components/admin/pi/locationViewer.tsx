import { get, isNil, upperFirst } from "lodash";
import { env } from "../../../env";
import { Location } from "../../common/entityInterface";
import WYSIWYGEditor from "../../common/wysiwygeditor/wysiwygeditor";
import { IMapViewerPopups, MapViewer } from "../../common/mapViewer";
// this component will be used for rendering single location

export interface ILocationViewerProp {
    location: Location;
    displayPasswordPartial: boolean;
    displayDestinationPartial: boolean;
    displayNextLocation: boolean;
}
export const LocationViewer = (props: ILocationViewerProp) => {
    const { location } = props;
    const name = location?.user?.loginName;
    const message = location?.message;
    const renderPhoto = (photoSrc: string) => {
        return (
            <img
                className={`max-h-[20vh] object-contain origin-center`}
                src={`${env.REACT_APP_DATAMGMT_BASEURL}${photoSrc}`}></img>
        );
    };
    const renderNextLocation = () => {
        if (location.next && props.displayNextLocation) {
            const loc = location.next;
            const lat = loc.location?.coordinates[0];
            const long = loc.location?.coordinates[1];
            return (
                <div className='p-4 my-4 rounded outline outline-1 outline-slate-300'>
                    <h3 className='font-bold text-md'>
                        Next Location:{loc.locationDescription}
                    </h3>
                    <div className='w-full h-[500px]'>
                        <MapViewer
                            center={[
                                isNil(long) || isNaN(long) ? 114.1722 : long,
                                isNil(lat) || isNaN(lat) ? 22.295 : lat,
                            ]}
                            showlines={false}
                            popups={[
                                {
                                    message: "",
                                    coordinate: [
                                        isNil(long) || isNaN(long)
                                            ? 114.1722
                                            : long,
                                        isNil(lat) || isNaN(lat) ? 22.295 : lat,
                                    ],
                                } as IMapViewerPopups,
                            ]}></MapViewer>
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    };
    const renderPasswordPartial = () => {
        if (location.passwordPartial && props.displayPasswordPartial) {
            return (
                <div className='p-4 my-2 rounded outline outline-1 outline-slate-300'>
                    <h3>
                        <span className='font-bold text-md'>
                            Password Partial:{" "}
                        </span>
                        {location.passwordPartial.message}
                    </h3>
                </div>
            );
        } else {
            return <></>;
        }
    };
    const renderDestinationPartial = () => {
        if (location.destinationPartial && props.displayDestinationPartial) {
            return (
                <div className='p-4 my-2 rounded outline outline-1 outline-slate-300'>
                    <h3>
                        <span className='font-bold text-md'>
                            Destionation Partial:{" "}
                        </span>
                        {location.destinationPartial.message}
                    </h3>
                </div>
            );
        } else {
            return <></>;
        }
    };
    return (
        <div className='p-4 m-4 rounded outline outline-1 outline-slate-300'>
            <div>
                <p className='text-xl italic'>
                    from {isNil(name) ? "" : upperFirst(name)} -{" "}
                    {location.displayName}
                </p>
            </div>
            <div>
                <span className='font-bold text-md'>Location Description:</span>{" "}
                {location?.locationDescription || "N/A"}
            </div>
            <div className='p-4 my-2 rounded outline outline-1 outline-slate-300'>
                <h3 className='font-bold text-md:'> Messages</h3>
                <WYSIWYGEditor
                    noEdit={true}
                    onChange={() => {}}
                    value={isNil(message) ? "" : message}
                    readonly={true}></WYSIWYGEditor>

                <div className='flex flex-wrap items-center justify-around gap-2 m-4'>
                    {location.photoone ? renderPhoto(location.photoone) : <></>}
                    {location.phototwo ? renderPhoto(location.phototwo) : <></>}
                    {location.photothree ? (
                        renderPhoto(location.photothree)
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div>{renderDestinationPartial()}</div>
            <div>{renderPasswordPartial()}</div>
            <div>{renderNextLocation()}</div>
        </div>
    );
};
