import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  Picker,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Alert } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  form: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
  },
  button: {
    margin: 100,
  },
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default function AttendanceScreen() {
  const [formData, setFormData] = useState({
    student_id: "",
    teacher_id: "", // add a default value for teacher_id
    class_section_id: "",
    status: "",
  });
  const [userIds, setUserIds] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value ? "" : "This field is required" });
  };
  const logout = () => {
    window.localStorage.clear();
    window.location.reload(true);
  };

  const createAttendance = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("student_id", formData.student_id);
    data.append("teacher_id", formData.teacher_id);
    data.append("class_section_id", formData.class_section_id);
    data.append("status", formData.status);

    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8000/api/attendances", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        validateStatus: function (status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        },
      })
  //     .then((response) => {
  //       console.log(response.data);
  //       // ToastAndroid.show('Attendance recorded successfully!', ToastAndroid.SHORT);
  //       // showMessage({
  //       //   message: "Attendance recorded successfully!",
  //       //   type: "success",
  //       //   duration: 3000,
  //       // });

  //       setFormData({
  //         student_id: "",
  //         teacher_id: "",
  //         class_section_id: "",
  //         status: "",
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
  //       showMessage({
  //         message: "Error: " + error,
  //         type: "danger",
  //         duration: 3000,
  //       });
  //     });
  // };
  .then((response) => {
    console.log(response.data);
    Alert.alert(
      "Attendance recorded successfully!",
      "",
      [
        {
          text: "OK",
          onPress: () => {
            setFormData({
              student_id: "",
              teacher_id: "",
              class_section_id: "",
              status: "",
            });
          },
        },
      ],
      { cancelable: false }
    );
  })
  .catch((error) => {
    console.error(error);
    Alert.alert("Error", "Failed to record attendance.", [{ text: "OK" }], {
      cancelable: false,
    });
  });
};

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const studentUserIds = response.data
          .filter((user) => user.role === 3)
          .map((user) => user.id);
        setUserIds(studentUserIds);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch user IDs.");
      });
  };
  const handleStatusChange = (itemValue) => {
    setSelectedStatus(itemValue);
    setFormData({ ...formData, status: itemValue });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={{ margin: 15 }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button onPress={logout} title="Logout" />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text>Student ID</Text>
        <Picker
          selectedValue={formData.student_id}
          onValueChange={(value) => handleInputChange("student_id", value)}
        >
          {userIds.map((userId) => (
            <Picker.Item key={userId} label={String(userId)} value={userId} />
          ))}
        </Picker>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Teacher ID</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(value) => handleInputChange("teacher_id", value)}
          value={formData.teacher_id}
        />
        {errors.teacher_id && (
          <Text style={{ color: "red" }}>{errors.teacher_id}</Text>
        )}
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Class Section ID</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(value) => handleInputChange("class_section_id", value)}
          value={formData.class_section_id}
        />
        {errors.class_section_id && (
          <Text style={{ color: "red" }}>{errors.class_section_id}</Text>
        )}
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Status</Text>
      </View>
      <View>
        <Picker
          selectedValue={selectedStatus}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedStatus(itemValue);
            handleStatusChange(itemValue);
          }}
          mode="dropdown"
          style={styles.dropdown}
          itemStyle={styles.item}
        >
          <Picker.Item label="Present" value={1} />
          <Picker.Item label="Late" value={2} />
          <Picker.Item label="Absent" value={3} />
        </Picker>
        <View>
  <View>
    {Boolean(errors.status) && (
      <Text style={styles.error}>{errors.status}</Text>
    )}
  </View>
</View>


      </View>
      <View>
        <Button
          style={styles.button}
          title="Record Attendance"
          onPress={createAttendance}
        />
      </View>
    </View>
  );
}
