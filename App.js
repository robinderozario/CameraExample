import React, { useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
	const [permission, requestPermission] = useCameraPermissions();

	// permission is not updated when user accepts native permission modal (after fresh install)
	useEffect(() => {
		console.log("permission", permission);
	}, []);

	if (!permission) {
		return <View />;
	}

	// Remove permission (in iOS settings) and try to press the button, it has no effect on iOS
	if (!permission.granted) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>No access to camera</Text>
				<Button onPress={requestPermission} title="Give permission" />
			</View>
		);
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
