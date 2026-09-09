import { ThemeMode, ThemeOption, ThemeOptionStyle } from "@/context/ThemeContext";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {} from "@/context/ThemeContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



interface ThemeItemProps
{
    themeOption: ThemeOption
    onThemeToggle: (currentThemeMode: ThemeMode) => Promise<void>;
    isCurrent: boolean;
}

export default function ThemeItem({themeOption, isCurrent, onThemeToggle}: ThemeItemProps ) 
{
    const styles = createStyles(themeOption.style, isCurrent)
    return(
    <View style={styles.body}>
        <Text style={styles.text}>{themeOption.title}</Text>
        <View style={styles.leftPart}>
            <View></View>
            <TouchableOpacity style={styles.button} onPress={()=> {onThemeToggle(themeOption.mode)}} disabled={isCurrent}>
                {isCurrent && <MaterialIcons name="done" size={20} color={themeOption.style.success} />}
            </TouchableOpacity>
        </View>
    </View>
    )
}

const createStyles = (colors: ThemeOptionStyle, isCurrent: boolean) => StyleSheet.create({
    text: 
    {
        color: isCurrent?colors.textMuted: colors.text,
        textDecorationLine: isCurrent?"line-through":"none"
    },
    body:
    {
        width: "20%",
        minWidth: 300,
        paddingHorizontal: 10,
        borderRadius:5,
        backgroundColor: colors.bg,
        borderWidth: 1,
        borderColor: colors.borderColor,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between"

    },
    leftPart:
    {
        flexDirection: "row"
    },
    button:
    {
        width: 20,
        height:20,
        borderWidth: 2,
        borderColor: colors.borderColor,
        marginVertical: 4,
    }
})