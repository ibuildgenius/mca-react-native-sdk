import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 12
    },

    spacerHorizontal: {
        height: "5%"
    },

    titleText: {
        margin: 4,
        fontSize: 20,
        width: "100%",
        fontWeight: "600",
        textAlign: "center"
    },

    listItem: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        flexDirection: "row",
        margin: 4,
        paddingHorizontal: 8,
        backgroundColor: "#ffffff",
        borderRadius: 3,
    },

    listImage: {
        width: 38,
        height: 38
    },

    logo: {
        margin: 12,
        width: 150,
        height: 30
    },

    poweredBy: {
        margin: 12,
    }
})