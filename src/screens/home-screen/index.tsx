import Loader from "@/components/shared/loader";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Task from "@/components/tasks/task";
import TaskActions from "@/components/tasks/task-actions";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { ICategory, ITask } from "@/types";
import { getGreeting } from "@/utils/helpers";
import { AnimatedText, Box, Text } from "@/utils/theme";
import { format } from "date-fns";
import React from "react";
import { FlatList, Pressable } from "react-native";
import { ZoomInEasyDown } from "react-native-reanimated";
import useSWR from "swr";
import Icon from "react-native-vector-icons/Ionicons"; // Import komponen ikon

const today = new Date();

const greeting = getGreeting({ hour: new Date().getHours() });

const HomeScreen = () => {
  const { user, logout } = useUserGlobalStore();

  const { data: tasks, isLoading, mutate: mutateTasks } = useSWR<ITask[]>(
    "tasks/",
    fetcher
  );

  if (isLoading || !tasks) {
    return <Loader />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("error in handleLogout", error);
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box alignItems="flex-end">
          <Pressable onPress={handleLogout}>
            <Icon name="log-out-outline" size={30} color="red" />
          </Pressable>
        </Box>
        <AnimatedText
          variant="textXl"
          fontWeight="500"
          entering={ZoomInEasyDown.delay(500).duration(700)}
        >
          Good {greeting} {user?.name}
        </AnimatedText>
        <Text variant="textXl" fontWeight="500">
          It’s {format(today, "eeee, LLL dd")} - {tasks.length} tasks
        </Text>
        <Box height={26} />
        <TaskActions categoryId="" />
        <Box height={26} />
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Task task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
