import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const columns = [
  { field: "student_id", headerName: "student_id" },

  {
    field: "teacher_id",
    headerName: "teacher_id",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.teacher_id,
    renderCell: (params) => {
      const [selectedInfo, setSelectedInfo] = useState({});
      const [isUpdateMode, setIsUpdateMode] = useState(false);

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
    headerName: "class_section_id",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.class_section_id,
    renderCell: (params) => {
      const [selectedInfo, setSelectedInfo] = useState({});
      const [isUpdateMode, setIsUpdateMode] = useState(false);

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
    field: "status",
    headerName: "status",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.status,
    renderCell: (params) => {
      const [selectedInfo, setSelectedInfo] = useState({});
      const [isUpdateMode, setIsUpdateMode] = useState(false);

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

  {
    field: "date",
    headerName: "date",
    flex: 2,
    cellClassName: "name-column--cell",
    valueGetter: (params) => params.row.date,
    renderCell: (params) => {
      const [selectedInfo, setSelectedInfo] = useState({});
      const [isUpdateMode, setIsUpdateMode] = useState(false);

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
];
