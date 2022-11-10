import { Box, Button, Container } from "native-base";
import { Text, View } from "react-native";
import { useRef, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
export const HomePage = () => {
    const diffDates = () => {
        const date1 = new Date("2022-11-15 18:30:00");
        const date2 = new Date();
        const diffTime = Math.abs(date2.valueOf() - date1.valueOf());
        setDiffDay(Math.floor(diffTime / (1000 * 60 * 60 * 24)));
        setDiffHour(
            Math.floor(
                (diffTime -
                    Math.floor(diffTime / (1000 * 60 * 60 * 24)) *
                        (1000 * 60 * 60 * 24)) /
                    (1000 * 60 * 60)
            )
        );
        setDiffMin(
            Math.floor(
                (diffTime -
                    Math.floor(diffTime / (1000 * 60 * 60)) *
                        (1000 * 60 * 60)) /
                    (1000 * 60)
            )
        );
        setDiffSec(
            Math.floor(
                (diffTime - Math.floor(diffTime / (1000 * 60)) * (1000 * 60)) /
                    1000
            )
        );
        setPassAction(date2.valueOf() > date1.valueOf());
    };
    const interval = useRef(0);
    const [diffDay, setDiffDay] = useState(0);
    const [diffHour, setDiffHour] = useState(0);
    const [diffMin, setDiffMin] = useState(0);
    const [diffSec, setDiffSec] = useState(0);
    const [passAction, setPassAction] = useState(false);
    useEffect(() => {
        diffDates();
        clearInterval(interval.current);
        let localInterval = setInterval(() => {
            diffDates();
        }, 1000);
        interval.current = localInterval;
    }, []);

    const navigation = useNavigation();
    return (
        <Container
            h='100%'
            w='100%'
            maxWidth='100%'
            bg='blue.100'
            className='flex items-center justify-center'>
            {passAction ? (
                <View className='flex items-center gap-2 p-12 border-2 rounded border-slate-300'>
                    <Text>It's time Get Ready</Text>
                    <Button
                        onPress={() => {
                            //@ts-ignore
                            navigation.navigate("Location");
                        }}>
                        Go to Scan QR Code
                    </Button>
                </View>
            ) : (
                <View className='flex items-center gap-2 p-12 border-2 rounded border-slate-300'>
                    <Text className='text-xl font-bold'>Save the day</Text>
                    <Text className='text-lg'>
                        <Text className='font-bold'>{` ${diffDay} `}</Text>
                        day
                        <Text className='font-bold'>{` ${diffHour} `}</Text>
                        Hour
                        <Text className='font-bold'>{` ${diffMin} `}</Text>
                        Mins
                        <Text className='font-bold'>{` ${diffSec} `}</Text>
                        Sec Left
                    </Text>
                </View>
            )}
        </Container>
    );
};
