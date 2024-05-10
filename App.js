import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		return <View />;
	}
	if (!permission.granted) {
		return <Text>No access to camera</Text>;
	}

	// View the output and see that the interval does not effect the scanning frequency
	const onBarcodeScanned = () => {
		console.log(Date.now());
	};

	return (
		<View style={styles.container}>
			<CameraView
				style={styles.camera}
				facing={"back"}
				onBarcodeScanned={onBarcodeScanned}
				barcodeScannerSettings={{
					barcodeTypes: ["ean13", "ean8", "upc_a"],
					interval: 1000,
				}}
			></CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	camera: {
		width: "100%",
		height: "100%",
	},
});
