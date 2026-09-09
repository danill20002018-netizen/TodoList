import { StyleSheet, Text, View } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useTheme } from "@/context/ThemeContext";
//
interface HeaderProps {
  totalCount: number;
  completedCount: number;
}


export default function Header({ totalCount, completedCount }: HeaderProps) {
  const {colors} = useTheme()

  return (
  <View style={styles.appHeader}>
      <View style={styles.headerTitleGroup}>
        <SimpleLineIcons name="note" size={32} color={colors.primary} />
        <Text style={[styles.appHeaderText, { color: colors.text,}]}>Мій Список Завдань</Text>
      </View>
      <Text style={[styles.headerSubtitle, {color: colors.textMuted}]}>
        {totalCount > 0
          ? `Виконано ${completedCount} з ${totalCount} завдань`
          : "Додайте своє перше завдання"}
      </Text>
    </View>);
}

const styles = StyleSheet.create({
    appHeader: {
      flexDirection:"column",
        marginBottom: 24,
        textAlign: "center",
        justifyContent:"center"
    },
    headerTitleGroup:
    {
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"row",
        gap: 12,
        marginBottom: 6
    },
    appHeaderText: 
    {
        fontSize: 29.6,
        fontWeight: "700",
       
        letterSpacing: -0.5
    },
    headerSubtitle:
    {
      textAlign:"center",
        fontSize: 15.2,
        fontWeight: 400
    }
});