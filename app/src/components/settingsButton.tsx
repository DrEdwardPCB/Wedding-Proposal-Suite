import { useState } from "react";
import { View, Text } from "react-native";
import { Button, Spinner } from "native-base";
export interface ISettingsButtonProps {
    name: string;
    buttonText: string;
    disabled: boolean;
    action: () => Promise<void> | void;
}
export const SettingsButton = (props: ISettingsButtonProps) => {
    const { name, buttonText, action, disabled } = props;
    const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true);
        await action();
        setLoading(false);
    };
    return (
        <View className='flex flex-row items-center justify-between w-full p-4 border-b-2 border-slate-400'>
            <Text className='text-lg font-bold'>{name}</Text>
            {loading ? (
                <Spinner></Spinner>
            ) : (
                <Button
                    disabled={disabled}
                    className={`w-24 ${disabled && "bg-slate-500"}`}
                    onPress={() => {
                        handleClick();
                    }}>
                    {buttonText}
                </Button>
            )}
        </View>
    );
};

