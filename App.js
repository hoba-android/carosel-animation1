import React, { useRef } from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const data = [
  "https://i.pinimg.com/originals/56/a9/03/56a903796e83bc51eb8e08b70299c893.jpg",
  "https://wallpaperstock.net/wallpapers/thumbs1/44466wide.jpg",
  "https://i.pinimg.com/originals/9e/fd/b4/9efdb480cd336073cacd61b7c68e56cb.jpg",
  "https://p1.pxfuel.com/preview/536/419/695/avenue-autumn-trees-path-nature-forest.jpg",
  "https://p1.pxfuel.com/preview/426/932/974/tree-way-roadside-spring.jpg",
  "https://cdn.pixabay.com/photo/2015/07/31/06/50/forest-868715_960_720.jpg",
];

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              source={{ uri: image }}
              key={`image-${index}`}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={20}
            />
          );
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled={true}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 1,
                  shadowRadius: 20,
                  shadowOffset: { width: 10, height: 10 },
                  elevation: 10,
                }}
              >
                <Image
                  style={{
                    width: imageW,
                    height: imageH,
                    resizeMode: "cover",
                    borderRadius: 16,
                  }}
                  source={{ uri: item }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
