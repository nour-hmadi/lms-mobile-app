import { useState } from 'react';
import { Menu, Divider } from 'react-native-paper';

const statusOptions = [
  { label: 'Present', value: 1 },
  { label: 'Late', value: 2 },
  { label: 'Absent', value: 3 },
];

export default function MyForm() {
  const [formData, setFormData] = useState({ status: '' });
  const [errors, setErrors] = useState({});

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  return (
    <Menu
      visible={true} // replace with your own logic to show/hide the dropdown menu
      onDismiss={() => console.log('dropdown menu dismissed')} // replace with your own logic to handle dismiss event
      anchor={<TextInput label="Status" value={formData.status} />} // replace with your own TextInput component
    >
      {statusOptions.map((option) => (
        <Menu.Item
          key={option.value}
          onPress={() => handleStatusChange(option.value)}
          title={option.label}
          value={option.value}
          selected={formData.status === option.value}
        />
      ))}
    </Menu>
  );
}
