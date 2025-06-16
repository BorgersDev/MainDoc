import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Easing,
  Text as RNText,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type PopupMenuProps = {
  items: Array<{
    title: string;
    icon: string; // você precisa trocar pelas suas libs de ícone
    action: () => void;
  }>;
};

export const PopupMenu = ({ items }: PopupMenuProps) => {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(100)).current;
  const translateY = useRef(new Animated.Value(-100)).current;

  // useLayoutEffect para animar *depois* de flush de layout, sem warnings
  useLayoutEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 130,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 130,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 130,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0,
          duration: 130,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 100,
          duration: 130,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 130,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scale, translateX, translateY]);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
                <Feather
                  name="info"
                  size={24}
                  color="#333"
                  className="pr-2"
                />
        </TouchableOpacity>

      <Modal transparent visible={visible} animationType="none">
        {/* Presiona em qualquer lugar fora para fechar */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Animated.View
            style={[
              styles.popup,
              {
                opacity: scale,
                transform: [
                  { scale },
                  { translateX },
                  { translateY },
                ],
              },
            ]}
          >
            {items.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.option,
                  { borderBottomWidth: i === items.length - 1 ? 0 : StyleSheet.hairlineWidth },
                ]}
                onPress={() => {
                  setVisible(false);
                  setTimeout(item.action, 200);
                }}
              >
                <Feather
                  name={item.icon}
                  size={17}
                  color="#333"
                  className="pr-2"
                />
                <RNText style={styles.text}>{item.title}</RNText>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  popup: {
    position: "absolute",
    top: 115,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#ccc",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});