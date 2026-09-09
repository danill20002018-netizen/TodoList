import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTheme, ThemeColors } from "@/context/ThemeContext";
import ThemeList from "@/components/Theme/ThemeList";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SettingsScreen() {
  const {toggleTheme, colors, themeMode } = useTheme();
  const styles = createStyles(colors)
  // Мутації Convex
  const clearCompleted = useMutation(api.todos.clearCompleted);
  const clearAll = useMutation(api.todos.clearAll);

  const handleClearCompleted = () => {
    Alert.alert(
      "Очистити виконані",
      "Ви впевнені, що хочете видалити всі виконані завдання?",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            const res = await clearCompleted();
            Alert.alert("Успішно", `Видалено ${res.deletedCount} завдань`);
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Видалити ВСІ завдання",
      "Цю дію неможливо буде скасувати. Видалити всі завдання з хмари?",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити все",
          style: "destructive",
          onPress: async () => {
            const res = await clearAll();
            Alert.alert("Успішно", `Базу очищено. Видалено ${res.deletedCount} завдань`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerContainer}>
          <Ionicons name="settings-sharp" size={24} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>Налаштування</Text>
        </View>
        {/*керування темами*/}
         <ThemeList onThemeToggle={toggleTheme} currentTheme={themeMode} colors={colors}/>
        {/* Секція керування даними Convex */}
        <Text style={styles.sectionHeader}>КЕРУВАННЯ ХМАРОЮ CONVEX</Text>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={handleClearCompleted}
        >
          <Ionicons name="checkmark-done" size={20} color="#F59E0B" />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>Видалити виконані завдання</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.dangerButton, { backgroundColor: colors.surface, borderColor: colors.danger }]}
          onPress={handleClearAll}
        >
          <Ionicons name="trash" size={20} color={colors.danger} />
          <Text style={[styles.actionButtonText, { color: colors.danger }]}>Видалити абсолютно всі завдання</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  headerContainer:
  {
    flexDirection:"row",
    alignItems:"baseline",
    gap:5,
  },
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  sectionHeader: { fontSize: 12, fontWeight: "bold", marginTop: 16, marginBottom: 8, letterSpacing: 0.5, color: colors.textMuted },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { fontSize: 16, fontWeight: "500" },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  dangerButton: {},
  actionButtonText: { fontSize: 15, fontWeight: "500" },
  versionText: { textAlign: "center", marginTop: 32, fontSize: 12 },
});