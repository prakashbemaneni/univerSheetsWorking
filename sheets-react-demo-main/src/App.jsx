import React, { useState, useRef, useEffect } from 'react';
import UniverSheet from './components/UniverSheet/index';  // The UniverSheet component
import { getDefaultWorkbookData } from './assets/default-workbook-data';  // Function to get workbook data
import './index.css';  // Your custom styles

const App = () => {

   // Mocked user data
   const userData = {
    users: [
      { name: 'Prakash', address1: 'TC Palya', address2: 'KR Puram', contact: '12345', deviceName: 'Phone A', currentPlan: '120' },
      { name: 'John', address1: 'Main St', address2: 'Downtown', contact: '67890', deviceName: 'Phone B', currentPlan: '200' },
      { name: 'Sam', address1: 'Baker St', address2: 'London', contact: '54321', deviceName: 'Phone C', currentPlan: '150' }
    ]
  };
  const univerRef = useRef(null);  // Ref for UniverSheet
  const [search1, setSearch1] = useState('');  // Input field for user 1
  const [search2, setSearch2] = useState('');  // Input field for user 2
  const [selectedUser1, setSelectedUser1] = useState(null);  // Selected user 1
  const [selectedUser2, setSelectedUser2] = useState(null);  // Selected user 2
  const [data, setData] = useState(getDefaultWorkbookData('', ''));  // Initial empty data for UniverSheet

 

  // Function to handle input change for user 1
  const handleSearch1Change = (e) => {
    setSearch1(e.target.value);
  };

  // Function to handle input change for user 2
  const handleSearch2Change = (e) => {
    setSearch2(e.target.value);
  };

  // Select user 1 from suggestions
  const selectUser1 = (user) => {
    setSelectedUser1(user);
    setSearch1(user.name);
  };

  // Select user 2 from suggestions
  const selectUser2 = (user) => {
    setSelectedUser2(user);
    setSearch2(user.name);
  };

  // Handle comparison logic
  // const handleCompare = () => {
  //   if (selectedUser1 && selectedUser2) {
  //     const sheetData = getDefaultWorkbookData(selectedUser1, selectedUser2);  // Generate comparison sheet data
  //     setData(sheetData);  // Update the UniverSheet with the comparison data
  //     univerRef.current.univerAPI.current.updateWorkbookData(sheetData);  // Call API to update the sheet
  //   } else {
  //     alert("Please select two users to compare.");
  //   }
  // };
  const handleCompare = () => {
    if (selectedUser1 && selectedUser2) {
      console.log("selected data is : ", JSON.stringify(selectedUser1) + JSON.stringify(selectedUser2))
      const data = getDefaultWorkbookData(selectedUser1, selectedUser2);
      setData(data);
      console.log("after set data")
      // Access updateWorkbookData from univerRef
      if (univerRef.current && typeof univerRef.current.updateWorkbookData === 'function') {
        console.log("inside if data")
        univerRef.current.updateWorkbookData(data);
      } else {
        console.error('updateWorkbookData is not available');
      }
    } else {
      alert("Please select two users to compare.");
    }
  };

  return (
    <div>
      <h1>Compare Users</h1>

      {/* Input field for User 1 */}
      <input
        type="text"
        value={search1}
        onChange={handleSearch1Change}
        placeholder="Search User 1"
      />
      <ul>
        {userData.users
          .filter(user => user.name.toLowerCase().includes(search1.toLowerCase()))
          .map((user, index) => (
            <li key={index} onClick={() => selectUser1(user)}>
              {user.name}
            </li>
          ))}
      </ul>

      {/* Input field for User 2 */}
      <input
        type="text"
        value={search2}
        onChange={handleSearch2Change}
        placeholder="Search User 2"
      />
      <ul>
        {userData.users
          .filter(user => user.name.toLowerCase().includes(search2.toLowerCase()))
          .map((user, index) => (
            <li key={index} onClick={() => selectUser2(user)}>
              {user.name}
            </li>
          ))}
      </ul>

      {/* Compare Button */}
      <button onClick={handleCompare}>Compare</button>

      {/* UniverSheet Component */}
      <UniverSheet ref={univerRef} data={data} />
    </div>
  );
};

export default App;
