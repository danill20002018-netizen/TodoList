import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import type { Todo } from "@/types";
import TodoItem from "./TodoItem";
import {updateTodo} from "@/convex/todos";
import { useTheme, ThemeColors } from "@/context/ThemeContext";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, text: string)=> Promise<void>
  onDelete: (id: string) => Promise<void>;
}

export default function TodoList({todos, onToggle, onUpdate, onDelete}: TodoListProps) {
  const {colors} = useTheme()
  const styles= createStyles(colors)

  if (todos.length === 0) {
    return (
      <View>
        <Text style={styles.emptyText}>
          Список завдань порожній. Додайте нове завдання!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onUpdate}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //     colors={["#6366f1"]}
      //   />
      // }
    />
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    emptyText: 
    {
      color: colors.text,
      fontSize: 16,
    },
    listContent: 
    {
      flexDirection: "column",
      gap:8,
      paddingHorizontal: 40,
    }
});