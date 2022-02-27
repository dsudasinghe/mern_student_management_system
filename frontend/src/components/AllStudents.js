import React, { useState, useEffect } from "react";
import axios from "axios";

function AllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:8070/student/")
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function deleteStudent(_id) {
    axios.delete(`http://localhost:8070/student/delete/${_id}`).then((res) => {
      console.log(res);
      console.log(res.data);
      const newStudentList = students.filter((student) => student._id !== _id);
      setStudents(newStudentList);
    });
  }

  return (
    <div>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Student Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
                <button type="button" className="btn btn-warning">
                  Edit
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteStudent(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllStudents;
