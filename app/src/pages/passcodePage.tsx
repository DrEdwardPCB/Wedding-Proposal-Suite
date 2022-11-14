import { Box, Container } from "native-base";
import { ScrollView, View, Text } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppApi } from "../utils/api/app";
import { RootType } from "../redux/reducers/rootReducer";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Input, Stack, FormControl, Button } from "native-base";
import { isNil } from "lodash";
export const PasscodePage = () => {
    const [passcode, setPasscode] = useState("");
    const submitPasscode = async () => {
        try {
            const aa = await AppApi.getInstance();
            const result = await aa.enterPasscode(passcode);
            if (result.data.data === "password incorrect") {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Failed",
                    textBody: "Incorrect Passcode",
                });
            } else {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: "Here we go",
                });
            }
        } catch (err) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Failed",
                textBody:
                    "Internal Server Error, please ask Edward for contingency plan",
            });
        }
    };
    const { locations, show } = useSelector(
        (state: RootType) => state.location
    );
    return (
        <View className='flex flex-col w-full h-full bg-blue-100'>
            <View className='flex flex-col w-full'>
                <Text className='max-w-full p-2 text-lg text-wrap'>
                    <Text>Description:{"\n"}</Text>
                    After enter the room enter the correct passcode to unlock
                    ring
                </Text>
                <View className='flex m-2'>
                    <FormControl>
                        <Stack>
                            <FormControl.Label>Passcode</FormControl.Label>
                            <Input
                                w='100%'
                                variant='outline'
                                placeholder='Passcode'
                                value={passcode}
                                onChangeText={(val) => {
                                    setPasscode(val);
                                }}
                            />
                        </Stack>
                    </FormControl>
                </View>
                <View className='flex flex-row mx-2 '>
                    <Button
                        className='flex-1 m-2 bg-red-400'
                        onPress={() => {
                            setPasscode("");
                        }}>
                        Cancel
                    </Button>
                    <Button
                        className='flex-1 m-2'
                        onPress={() => {
                            submitPasscode();
                        }}>
                        Submit
                    </Button>
                </View>
            </View>
            <ScrollView
                className='flex-1 w-full'
                contentContainerStyle={{
                    display: "flex",
                    alignItems: "stretch",
                    paddingHorizontal: 10,
                }}>
                <Text className='text-lg font-bold'>Passcode Hints</Text>
                {Object.keys(show).some((e) => show[e]) ? (
                    <></>
                ) : (
                    <View className='p-12 m-12 border-2 rounded border-slate-300'>
                        <Text className='text-xl text-center'>
                            No Location Scanned, Please go to Check point and
                            scan location using camera
                        </Text>
                    </View>
                )}
                {locations.map((e) => {
                    if (isNil(show[e.id])) {
                        return <></>;
                    } else if (show[e.id]) {
                        if (e.passwordPartial) {
                            return (
                                <View
                                    key={e.id}
                                    className='p-4 my-2 border-2 rounded border-slate-400'>
                                    <Text>
                                        <Text className='font-bold text-md'>
                                            Passcode Hint:{" "}
                                        </Text>
                                        {e.passwordPartial.message}
                                    </Text>
                                </View>
                            );
                        } else {
                            return <></>;
                        }
                    } else {
                        return <></>;
                    }
                })}
            </ScrollView>
        </View>
    );
};
