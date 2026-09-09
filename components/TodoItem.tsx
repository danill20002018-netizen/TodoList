
import { useState } from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import type { Todo } from "@/types";
import { useTheme, ThemeColors } from "@/context/ThemeContext";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, text: string) => Promise<void>;
}

export default function TodoItem({todo, onToggle, onDelete, onEdit,}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isUpdating, setIsUpdating] = useState(false);

  const {colors} = useTheme()
  const styles = createStyles(colors, todo.isCompleted)

  const handleToggle = async () => {
    try {
      setIsUpdating(true);
      await onToggle(todo._id, !todo.isCompleted);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsUpdating(true);
      await onDelete(todo._id);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSave = async () => {
    const trimmedText = editText.trim();

    if (!trimmedText) {
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }

    if (trimmedText === todo.text) {
      setIsEditing(false);
      return;
    }

    try {
      setIsUpdating(true);
      await onEdit(todo._id, trimmedText);
      setIsEditing(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const startEditing = () => {
    if (isUpdating) return;

    setEditText(todo.text);
    setIsEditing(true);
  };

  return (
    <View style = {[styles.todoItem, {borderRadius: 10, borderColor: colors.border}]}>
      <View style={styles.todoLeftPart}>
      {isEditing ? (
        <TextInput
          style= {styles.todoEditInput}
          value={editText}
          onChangeText={setEditText}
          onBlur={handleSave}
          autoFocus
          maxLength={120}
          editable={!isUpdating}
          returnKeyType="done"
          onSubmitEditing={handleSave}
        />
      ) : (<>
       <TouchableOpacity style={[styles.checkmark, todo.isCompleted && [styles.checkmarkCompleted, {backgroundColor: colors.success}]]} onPress={handleToggle} disabled={isUpdating}>
          {todo.isCompleted && <MaterialIcons name="done" size={30} color="white" />}
        </TouchableOpacity>
        <TouchableOpacity style= {styles.todoEditInput} onPress={startEditing} disabled={isUpdating}>
          <Text style= {[styles.todoText]}>
           {` ${todo.text} `} 
          </Text>
        </TouchableOpacity>
       
        </>
      )}
      </View>
      <View style={styles.todoRightPart}>
        {!isEditing && (
          <TouchableOpacity onPress={startEditing} disabled={isUpdating}>
            <EvilIcons name="pencil" size={30} color={colors.text}/>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleDelete} disabled={isUpdating}>
          <EvilIcons name="trash" size={30} color={colors.text}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const createStyles = (colors: ThemeColors, isCompleted: boolean) => StyleSheet.create({
   todoItem:
    {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: colors.bg,
        borderWidth: 4,
        borderColor: colors.border,
        borderStyle: "solid",
    },
    completed:
    {
      textDecorationLine: "line-through",
    },
    checkmark:
    {
      textAlign: "center",
      marginVertical: "auto",
      width: 25,
      height: 25,
      cursor: "pointer",
      userSelect: "none",
      position: "relative",
      alignItems:"center",
      borderWidth: 2,
      borderStyle:"solid",
      borderColor: colors.border,
      borderRadius: 6,
    },
    todoEditInput:
    {
      color: colors.text,
      flex:1,
      paddingVertical: 6,
      paddingHorizontal: 10,
      fontSize: 19,

      outline: "none",
    },
    todoText:
    {
      color: isCompleted?colors.textMuted: colors.text,
      textDecorationLine:isCompleted?"line-through": "none",
      flex:1,
      fontSize: 19,
      cursor: "pointer"
    },
    todoRightPart: 
    {
      gap: 6,
      opacity: 0.85,
      flexDirection:"row",
      alignContent: "center",
      justifyContent:"center",

    },
    todoLeftPart: 
    {
      justifyContent:"center",
      flexDirection:"row",
      alignContent: "center"
    },
    checkmarkCompleted:
    {
      borderWidth: 0
    }

});
