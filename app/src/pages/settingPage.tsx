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
            action: () => {
                dispatch(resetLocation());
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: "successfully reload",
                });
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
                }
            },
        },
    ];
    return (
        <Container h='100%' w='100%' maxWidth='100%' bg='blue.100'>
            <View className=''>
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
