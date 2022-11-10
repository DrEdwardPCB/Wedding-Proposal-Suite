import { Box, Button, Container } from "native-base";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { reloadLocation, resetLocation } from "../redux/actions/locationAction";
import { AppApi } from "../utils/api/app";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { SettingsButton } from "../components/settingsButton";
export const SettingPage = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const listSetting = [
        {
            name: "Clear Store",
            type: "button",
            buttonText: "Clear",
            action: async () => {
                try {
                    dispatch(resetLocation());
                    const aa = await AppApi.getInstance();
                    await aa.resetLocations();
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: "Success",
                        textBody: "successfully reload",
                    });
                } catch (err) {
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: "Failed",
                        textBody: "an error has occured in clearing",
                    });
                } finally {
                    setEdit(false);
                }
            },
        },
        {
            name: "Reload Store",
            type: "button",
            buttonText: "Reload",
            action: async () => {
                try {
                    const aa = await AppApi.getInstance();
                    const response = await aa.getLocations();
                    if (response.status >= 400) {
                        throw new Error(response.status.toFixed());
                    }
                    dispatch(reloadLocation(response.data.data));
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: "Success",
                        textBody: "successfully reload",
                    });
                } catch (err) {
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: "Failed",
                        textBody: "an error has occured in reload",
                    });
                } finally {
                    setEdit(false);
                }
            },
        },
    ];
    return (
        <Container h='100%' w='100%' maxWidth='100%' bg='blue.100'>
            <View className='p-2'>
                <Button
                    onPress={() => {
                        setEdit(!edit);
                    }}>
                    {edit ? "unlocked" : "locked"}
                </Button>
            </View>
            {listSetting.map((e, i) => {
                return (
                    <SettingsButton
                        name={e.name}
                        buttonText={e.buttonText}
                        action={e.action}
                        disabled={!edit}
                        key={i}
                    />
                );
            })}
        </Container>
    );
};
