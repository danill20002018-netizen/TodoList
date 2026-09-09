import { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface TodoFormProps {
  onAdd: (text: string) => Promise<void>;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {colors} = useTheme()

  const handleSubmit = async () => {
    const trimmedText = text.trim();

    if (!trimmedText || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onAdd(trimmedText);

      setText("");
      Keyboard.dismiss();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.todoForm}>
      <TextInput
        style={[styles.todoInput, {borderColor: colors.border, borderRadius: 10, color: colors.textMuted}]}
        placeholder="Що потрібно зробити?"
        value={text}
        onChangeText={setText}
        editable={!isSubmitting}
        maxLength={120}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      <TouchableOpacity
        style={[styles.todoAddBtn, {borderRadius: 10, backgroundColor: colors.primary}]}
        onPress={handleSubmit}
        disabled={!text.trim() || isSubmitting}
      >
        <Text style={styles.todoAddBtnText}>
          {isSubmitting ? "Додаємо..." : "Додати"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoForm:
  {
    paddingHorizontal: 25,
    flexDirection: "row",
    gap: 10,
    marginBottom: 24
  },
  todoInput:
  {
    flex:1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderStyle: "solid",
    backgroundColor: "#f8fafc",
    fontSize: 16,
    fontFamily:"inherit"
  },
  todoAddBtn:
  {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 0,
    fontWeight: "600",
    fontSize: 15.2,
    cursor: "pointer",
  },
  todoAddBtnText:
  {
    color: "white",
     fontWeight: "600",
    fontSize: 15.2,

  }
});
