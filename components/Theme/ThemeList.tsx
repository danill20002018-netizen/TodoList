import { themes, ThemeMode, ThemeColors} from "@/context/ThemeContext";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ThemeItem from "./ThemeItem";


interface ThemeListProps
{
    onThemeToggle: (currentThemeMode: ThemeMode) => Promise<void>;
    currentTheme: ThemeMode;
    colors: ThemeColors
}

export default function ThemeList({ onThemeToggle, currentTheme, colors}: ThemeListProps) 
{
  const styles= createStyles(colors)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>ТЕМИ</Text>
         <FlatList
              data={themes}
              keyExtractor={(item) => item.style.mainColor}
              renderItem={({ item }) => (
                <ThemeItem
                    themeOption={item}
                    onThemeToggle= {onThemeToggle}
                    isCurrent = {currentTheme===item.mode}
                />
              )}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
    );
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container:
  {
    flexDirection: "column",
  },
  text:
  {
    fontSize: 12, fontWeight: "bold", marginTop: 16, marginBottom: 8, letterSpacing: 0.5, color: colors.textMuted,
    alignContent: "flex-start",
    
  },
  listContent:
  {
    marginLeft: "2%",
    width: "35%",
    padding: 10,
    gap:5,
  }
})