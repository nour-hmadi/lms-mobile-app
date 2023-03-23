import { View, Text, TextInput } from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
const styles = {
  header: { backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
};

export default function Reports (){
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newData, setNewData] = useState({
    student_id: "",
    teacher_id: "",
    class_section_id: "",
    status: "",
    date: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const attendanceURL = "http://localhost:8000/api/attendances";

  const fetchallData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(attendanceURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch data ", response.data);
      setAllData(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchallData();
  }, []);
const columns = [
  {
    field: "ID",
    headerName: "ID",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.id,
    renderCell: (params) => {
      return isUpdateMode && selectedInfo.id === params.row.id ? (
        <TextInput
          style={{ borderWidth: 1, borderColor: "gray" }}
          value={selectedInfo.id || ""}
          onChangeText={(text) => {
            setSelectedInfo({ ...selectedInfo, id: text });
          }}
        />
      ) : (
        <View>
          <Text>{params.row.id}</Text>
        </View>
      );
    },
  }, 
   {
    field: "student_id",
    headerName: "Student ID",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.student_id,
    renderCell: (params) => {
      return isUpdateMode && selectedInfo.student_id === params.row.student_id ? (
        <TextInput
          style={{ borderWidth: 1, borderColor: "gray" }}
          value={selectedInfo.student_id || ""}
          onChangeText={(text) => {
            setSelectedInfo({ ...selectedInfo, student_id: text });
          }}
        />
      ) : (
        <View>
          <Text>{params.row.student_id}</Text>
        </View>
      );
    },
  },
  {
    field: "teacher_id",
    headerName: "Teacher ID",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.teacher_id,
    renderCell: (params) => {

      return isUpdateMode && selectedInfo.teacher_id === params.row.teacher_id ? (
        <TextInput
          style={{ borderWidth: 1, borderColor: "gray" }}
          value={selectedInfo.teacher_id || ""}
          onChangeText={(text) => {
            setSelectedInfo({ ...selectedInfo, teacher_id: text });
          }}
        />
      ) : (
        <View>
          <Text>{params.row.teacher_id}</Text>
        </View>
      );
    },
  },

  {
    field: "class_section_id",
    headerName: "Class Section ID",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.class_section_id,
    renderCell: (params) => {

      return isUpdateMode && selectedInfo.class_section_id === params.row.class_section_id ? (
        <TextInput
          style={{ borderWidth: 1, borderColor: "gray" }}
          value={selectedInfo.class_section_id || ""}
          onChangeText={(text) => {
            setSelectedInfo({ ...selectedInfo, class_section_id: text });
          }}
        />
      ) : (
        <View>
          <Text>{params.row.class_section_id}</Text>
        </View>
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.date,
    renderCell: (params) => {

      return isUpdateMode && selectedInfo.date === params.row.date ? (
        <TextInput
          style={{ borderWidth: 1, borderColor: "gray" }}
          value={selectedInfo.date || ""}
          onChangeText={(text) => {
            setSelectedInfo({ ...selectedInfo, date: text });
          }}
        />
      ) : (
        <View>
          <Text>{params.row.date}</Text>
        </View>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.status,
    renderCell: (params) => {
      return isUpdateMode && selectedInfo.status === params.row.status ? (
        <TextInput
          style={{ borderWidth: 1, borderColor: "gray" }}
          value={selectedInfo.status || ""}
          onChangeText={(text) => {
            setSelectedInfo({ ...selectedInfo, status: text });
          }}
        />
      ) : (
        <View>
          <Text>{params.row.status}</Text>
        </View>
      );
    },
  },


];
  return (
<View style={{ margin: 20 }}>
  <View>
    <Text>Student</Text>
    <Text>Attendance</Text>
  </View>

  <View style={{
    marginVertical: 40,
    height: "75%",
    backgroundColor: "transparent", // change this as per your requirement
    }}>
    <ScrollView>
      <Table>
      <Row data={columns.map(col => col.headerName)} style={styles.header} textStyle={{ ...styles.text, textAlign: 'center' }}/>
{
  alldata.map((data, index) => (
    <Row key={index} data={Object.values(data)} style={styles.row} textStyle={{ ...styles.text, textAlign: 'center' }}/>
  ))
}

      </Table>
    </ScrollView>
  </View>
</View>

  );
}

