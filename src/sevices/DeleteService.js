// import React, { useState } from "react";
// const DeleteService = (students,id) => {

//     const [students2, setStudents2] = useState(students)
//     const sId=id;
//     const onDeleteHandlerFunc = (sId) => {
//         let updated = students2.filter(i => i.id !== sId);
//         fetch('http://localhost:3200/students/' + sId, {
//             method: "DELETE"
//         })
//             .then(response => {
//                 setStudents2(updated);
//             })
//     }
//     return[onDeleteHandlerFunc(id)]
// }

// export default DeleteService