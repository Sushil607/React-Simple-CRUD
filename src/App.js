import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
function App() {
  // Different States
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Functions
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !channel) {
      // Can add validation code here
      // console.log("Something went wrong....");
      alert("Please fill all the fields...");
      return;
    } else if (name && email && channel && isEditing) {
      setData(
        data.map((item) => {
          if (item.id === editID) {
            return { ...item, name, email, channel };
          } else {
            return { ...item };
          }
        })
      );
    } else {
      const newTeacher = {
        id: new Date().getTime().toString(),
        name,
        email,
        channel,
      };
      // console.log(newTeacher);
      setData([...data, newTeacher]);
    }
    setName("");
    setEmail("");
    setChannel("");
  };
  // Delete
  const deleteTeacher = (id) => {
    // console.log(`Delete ${id}`);
    const newTeachers = data.filter((teacher) => teacher.id !== id);
    setData(newTeachers);
  };
  // Editing
  const handleEdit = (id) => {
    setEditID(id);
    setIsEditing(true);
    // Get the specific teacher
    const specificTeacher = data.filter((teacher) => teacher.id === id)[0];
    console.log(specificTeacher);
    setName(specificTeacher.name);
    setEmail(specificTeacher.email);
    setChannel(specificTeacher.channel);
  };
  return (
    <div className="App">
      <h2>Favourite Youtubers </h2>
      {data.length ? (
        <Table striped hover>
          <tbody>
            <tr>
              <th>Sr.No.</th>
              <th>Name.</th>
              <th>Email</th>
              <th>Channel</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {data.map((teacher, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.channel}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(teacher.id)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteTeacher(teacher.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>Please add your favourites youtuber.</h3>
      )}
      <h2>Add a new youtuber</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label> <br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="email">Email</label> <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="channel">Channel Name</label> <br />
        <input
          type="text"
          id="channel"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />{" "}
        <br />
        <br />
        <Button type="submit" variant="success">
          Add Teacher
        </Button>
      </form>
    </div>
  );
}

export default App;
