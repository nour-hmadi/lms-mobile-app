import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ScrollView } from "react-native";
import { Table, Row } from "react-native-table-component";
import { useState, useMemo } from 'react';


const styles = {
  header: { backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
};
const tableStyles = {
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexBasis: 100,
    flexGrow: 0,
    flexShrink: 0,
  },
};

export default function Reports() {
  const [selectedInfo, setSelectedInfo] = useState({});
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  

  const attendanceURL = "http://localhost:8000/api/attendances";
  const getPaginatedData = () => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return alldata.slice(start, end);
  };
  
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
  const renderCarousel = () => {
    const numPages = Math.ceil(alldata.length / rowsPerPage);
    const carouselItems = [];
  
    for (let i = 0; i < numPages; i++) {
      const isActive = i === page;
  
      carouselItems.push(
        <TouchableOpacity key={i} onPress={() => setPage(i)}>
          <View style={{ backgroundColor: isActive ? "blue" : "grey", width: 20, height: 20 }} />
        </TouchableOpacity>
      );
    }
  
    return <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>{carouselItems}</View>;
  };
  
  const columns = [
    { field: "student_id", headerName: "Student ID" },
    { field: "teacher_id", headerName: "Teacher ID" },
    { field: "class_section_id", headerName: "Class Section ID" },
    { field: "date", headerName: "Date" },
    { field: "status", headerName: "Status" },
  ];
  return (
    <View style={{ margin: 20 }}>
      <View>
        <Text>Student</Text>
        <Text>Attendance</Text>
      </View>

      <View
        style={{
          marginVertical: 40,
          height: "75%",
          backgroundColor: "transparent", // change this as per your requirement
        }}
      >
        <ScrollView>
  <Table style={tableStyles}>
    <Row
      data={columns.map((col) => col.headerName)}
      style={styles.header}
      textStyle={{ ...styles.text, textAlign: "center" }}
    />
    {getPaginatedData().map((data, index) => (
      <Row
        key={index}
        data={columns.map((col) => data[col.field])}
        style={styles.row}
        textStyle={{ ...styles.text, textAlign: "center" }}
      />
    ))}
  </Table>
  {renderCarousel()}
</ScrollView>

        {/* <ScrollView>
          <Table style={tableStyles}>
            <Row
              data={columns.map((col) => col.headerName)}
              style={styles.header}
              textStyle={{ ...styles.text, textAlign: "center" }}
            />
            {alldata.map((data, index) => (
              <Row
                key={index}
                data={columns.map((col) => data[col.field])}
                style={styles.row}
                textStyle={{ ...styles.text, textAlign: "center" }}
              />
            ))}
          </Table>
        </ScrollView> */}
      </View>
    </View>
  );
}
