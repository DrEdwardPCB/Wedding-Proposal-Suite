import { Alert, Box, Container } from "native-base";
import { StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { useCameraDevices } from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera";
import { useScanBarcodes, BarcodeFormat } from "vision-camera-code-scanner";
import "react-native-reanimated";
import { get, debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { AppApi } from "../utils/api/app";
import { useDispatch } from "react-redux";
import { addLocation } from "../redux/actions/locationAction";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";

export const CameraPage = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(false);
    const devices = useCameraDevices();
    const dispatch = useDispatch();
    const device = devices.back;

    const [frameProcessor, barcodes] = useScanBarcodes(
        [BarcodeFormat.QR_CODE],
        {
            checkInverted: true,
        }
    );
    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === "authorized");
        })();
    }, []);
    //if barcode is processing just keep it as it is
    const [barcodeProcesing, setBarcodeProcessing] = useState(false);
    useEffect(() => {
        if (!barcodeProcesing) {
            if (barcodes.length > 0) {
                setBarcodeProcessing(true);
            } else {
                setBarcodeProcessing(false);
            }
        }
    }, [barcodes]);
    useEffect(() => {
        if (barcodeProcesing) {
            processBarcode(); // on barcode processing change, trigger the webrquest function only if barcodeprocessing is in rising edge
        }
    }, [barcodeProcesing]);

    const processBarcode = async () => {
        // {"content": {"data": {"url": "http://localhost:4000/app/scan/86220d06-b622-457d-8208-9ff2c88ce001"}, "type": 8}, "cornerPoints": [{"x": 243, "y": 977}, {"x": 609, "y": 1026}, {"x": 564, "y": 1401}, {"x": 207, "y": 1333}], "displayValue": "http://localhost:4000/app/scan/86220d06-b622-457d-8208-9ff2c88ce001", "format": 256, "rawValue": "http://localhost:4000/app/scan/86220d06-b622-457d-8208-9ff2c88ce001"}
        try {
            const code = barcodes[0];
            const url = get(code, "content.data.url", "");
            if (url.includes("/app/scan")) {
                // console.log(url);
                const strLs = url.split("/");
                // console.log(strLs);
                const id = strLs[strLs.length - 1];
                // console.log(id);
                const ai = await AppApi.getInstance();
                const result = await ai.scanQRCode(id);
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: "successfully scan QRCode",
                });
                // console.log(result);
                dispatch(addLocation(id));
                //@ts-ignore
                navigation.navigate("Location");
            }
        } catch (err) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Failed",
                textBody: "an error has occured scan QRCode",
            });
            console.log(err);
        } finally {
            setBarcodeProcessing(false);
        }
    };
    const renderCamera = () => {
        return (
            device != null &&
            hasPermission && (
                <>
                    <Camera
                        style={{ width: "100%", height: "100%" }}
                        device={device}
                        isActive={true}
                        frameProcessor={frameProcessor}
                        frameProcessorFps={5}
                    />
                </>
            )
        );
    };
    return (
        <Container h='100%' w='100%' maxWidth='100%' bg='blue.100'>
            {renderCamera()}
        </Container>
    );
};

const styles = StyleSheet.create({
    barcodeTextURL: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
});
