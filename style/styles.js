import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 12
    },

    spacerHorizontal: {
        height: "3%"
    },

    titleText: {
        margin: 4,
        fontSize: 18,
        fontWeight: "500",
        width: "100%",
        textAlign: "center",
        fontFamily: "MetropolisBold"
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
    },

    htmlContainer: {
        alignItems: "center",
        width: "99%"
    },
    infoImagesStyle: {
        margin: 12,
        width: 70,
        height: 70
    },
    htmlContent: {
        paddingHorizontal: 10,
        paddingBottom: 16
    }
})