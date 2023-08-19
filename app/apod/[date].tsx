import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Apod } from "@/types";
import { fetchApod } from "@/api/apods";
import ApodListItem from "@/components/ApodListItem";

const ApoDetail = () => {
  const { date } = useLocalSearchParams();

  const [apod, setApod] = useState<Apod>(null);

  useEffect(() => {
    fetchApod(date as string).then(setApod);
  }, [date]);

  if (!apod) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <ApodListItem apod={apod} />
      <Text
        style={{
          padding: 15,
          backgroundColor: "white",
          lineHeight: 22,
          fontSize: 16,
          maxWidth: 500,
          width: "100%",
          alignSelf: "center",
        }}
      >
        {apod.explanation}
      </Text>
    </ScrollView>
  );
};

export default ApoDetail;

const styles = StyleSheet.create({});
