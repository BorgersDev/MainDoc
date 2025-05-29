import { Text } from "@/components/ui/text";
import { Modal, TouchableOpacity, View, StyleSheet, Animated, Easing } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type PopupMenuProps = {
    items: Array<{
        title: string;
        icon: string; 
        action: () => void;
    }>;
    umaEmpresa?: boolean;
}

export const PopupMenu = ({items}: PopupMenuProps) => {
    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(100)).current; // Initial value for translateX
    const translateY = useRef(new Animated.Value(-100)).current; // Initial value for translateY

    const resizeBox = (to: any) => {
        if (to === 1) {
            setVisible(true);
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: to,
                    useNativeDriver: true,
                    duration: 130,
                    easing: Easing.linear,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 130,
                    easing: Easing.linear,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 130,
                    easing: Easing.linear,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: to,
                    useNativeDriver: true,
                    duration: 130,
                    easing: Easing.linear,
                }),
                Animated.timing(translateX, {
                    toValue: 100,
                    useNativeDriver: true,
                    duration: 130,
                    easing: Easing.linear,
                }),
                Animated.timing(translateY, {
                    toValue: -100,
                    useNativeDriver: true,
                    duration: 130,
                    easing: Easing.linear,
                })
            ]).start(() => setVisible(false));
        }
    }

    return (
        <>
            <TouchableOpacity onPress={() => resizeBox(1)}>
                <Feather name="info" size={24} />
            </TouchableOpacity>
            <Modal transparent visible={visible}>
                <SafeAreaView style={{flex: 1}} onTouchStart={()=> resizeBox(0)}>
                    <Animated.View style={[styles.popup, {opacity: scale.interpolate({inputRange:[0,1], outputRange: [0,1]})} ,{transform: [{scale}, {translateX}, {translateY}]}]}>
                        {items.map((item, index) => (
                            <TouchableOpacity style={[styles.option, { borderBottomWidth: index === items.length - 1 ? 0 : 1}]} key={index} onPress={item.action}>
                                <Feather name={item.icon} size={17} color="black" />
                                <Text className="font-heading text-gray-700">{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                </SafeAreaView>
           </Modal>
        </>
    );
}


const styles = StyleSheet.create({
    popup: {
        borderRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal:10,
        position: 'absolute',
        top: 115,
        right: 10,
        shadowColor: '#312c2c',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        shadowOpacity: 0.3
    }, 
    option: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        borderBottomColor: '#c9c5c5',
        alignItems: 'center',
        paddingVertical: 7,
        gap: 7,
        
    }
})