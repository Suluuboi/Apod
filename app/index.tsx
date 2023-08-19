import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import apodJson from "../src/data/apods.json";
import ApodListItem from "../src/components/ApodListItem";
import { useEffect, useState } from "react";
import { Apod } from "../src/types";
import FullScreenImage from "../src/components/FullScreenImage";
import { fetchApods } from "../src/api/apods";

export default function Page() {
  const [apods, setApods] = useState<Apod[]>();
  const [activePicture, setActivePicture] = useState<string>(null);

  useEffect(() => {
    fetchApods().then(setApods);
  }, []);

  if (!apods) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <>
      <FlatList
        data={apods}
        renderItem={({ item }) => (
          <ApodListItem
            apod={item}
            onImagePress={() => setActivePicture(item.url)}
          />
        )}
      />
      <FullScreenImage
        url={activePicture}
        onClose={() => setActivePicture(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({});
