import React from 'react'
import AddStudent from '../Student/AddStudent/AddStudent'
import EditStudent from '../Student/EditStudent/EditStudent'
import { useState, useEffect } from 'react'
import Student from '../Student/Student/Student'
import { Button, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import background from '../../assets/Images/Background.jpg'
import api from '../../api/Students'


function StudentList() {

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('/students');
                setStudents(response.data)
                setEditedStudents(response.data)
            } catch (err) {
                console.log(`Error : ${err}`)
            }
        }
        fetchStudents();
    }, [])


    /* #region  States */
    const [students, setStudents] = useState([])

    const [editedStudents, setEditedStudents] = useState([])

    const [editedStudent, setEditedStudent] = useState({
        id: 0,
        fname: "",
        lname: "",
        age: 0,
        gender: "",
        imgSrc: ""
    })

    const [editButtonPopups, setEditButtonPopups] = useState([]);
    useEffect(()=>{
        setEditButtonPopups(
            Array(100).fill(false)
        )
    },[])

    const [addNewPopup, setAddNewPopup] = useState(false)

    const [student, setStudent] = useState({
        id: 0,
        fname: "",
        lname: "",
        age: 0,
        gender: "",
        imgSrc: ""
    })
    /* #endregion */

    /* #region  Edit Handlers */
    const resetEditedStudents = (id) => {
        const updatedEditedStudents=[...editedStudents]
        updatedEditedStudents[id]=[];
        setEditedStudents(updatedEditedStudents)
    }

    const twoWayBindingEdit = (e,index) => {
        let updatedEditStudents = [...editedStudents]
        updatedEditStudents[index][e.target.name] = e.target.value;
        setEditedStudents(updatedEditStudents);
    }

    const onEditGenderChange = (gender,index) => {
        let updatedEditStudents = [...editedStudents]
        gender === "male" ?
            updatedEditStudents[index].gender = "Male" :
            updatedEditStudents[index].gender = "Female";
        setEditedStudents(updatedEditStudents);
    }

    const onEditClickHandler = (s,index) => {
        console.log(editButtonPopups)
        let updatedEditPopups = [...editButtonPopups]
        !updatedEditPopups[s.id] ?
            updatedEditPopups[s.id] = true :
            updatedEditPopups[s.id] = false;
        setEditButtonPopups(updatedEditPopups);
        //setEditedStudents(students)
    }

    const onEditStudentHandler = async (s) => {
        try {
            const response = await api.put(`/students/${s.id}`,editedStudents[s.id]);
            setStudents(students.map(st => {return st.id === s.id ? {...response.data} : st}));
        } catch (err) {console.log(`Error : ${err}`)}
        resetEditedStudents(s.id);
        //setEditButtonPopups(false);
    }
    const setTrigger = (id) =>{
        const newEditButtonPopups = [...editButtonPopups]
        newEditButtonPopups[id]=false;
        setEditButtonPopups(newEditButtonPopups);
    }

    /* #endregion */

    /* #region  Add Hendlers */
    const twoWayBindingAdd = (e) => {
        let updatedStudent = { ...student }
        updatedStudent[e.target.name] = e.target.value;
        setStudent(updatedStudent);
    }

    const onAddNewHandler = async () => {
        let newStudent = { ...student }
        students.length === 0 ? newStudent.id = 0 : newStudent.id = students.length
        try {
            const response = await api.post('/students', newStudent);
            const newStudentList = [...students, response.data];
            setStudents(newStudentList);
        } catch (err) {
            console.log(`Error:${err}`)
        }
    }

    const onGenderChangeAddHandler = (gender) => {
        let updatedStudent = { ...student }
        gender === "male" ?
            updatedStudent.gender = "Male" :
            updatedStudent.gender = "Female";
        setStudent(updatedStudent);
    }
    /* #endregion */

    const onDeleteHandler = async (id) => {
        try {
            await api.delete(`/students/${id}`);
            let updated = students.filter(i => i.id !== id);
            setStudents(updated);
        } catch (err) {
            console.log(`Error:${err}`)
        }
    }

    return (
        <div style={{ backgroundImage: `url(${background})` }}>
            <Grid container columns={3}>
                <GridColumn></GridColumn>
                <GridColumn>
                    <GridRow>
                        <Button size='massive' color='olive' onClick={!addNewPopup ? () => setAddNewPopup(true) : () => setAddNewPopup(false)}>Add new Student !</Button>
                        <AddStudent
                            trigger={addNewPopup}
                            setTrigger={setAddNewPopup}
                            inputChanged={(e) => twoWayBindingAdd(e)}
                            addNewStudent={() => onAddNewHandler()}
                            genderRadioChanged={(gender) => onGenderChangeAddHandler(gender)} />
                    </GridRow>
                </GridColumn>
                <GridColumn></GridColumn>
                {
                    students.map((s, index) =>
                        <Grid.Column key={index}>
                            <Student
                                fname={students[index].fname}
                                lname={students[index].lname}
                                age={students[index].age}
                                gender={students[index].gender}
                                imgSrc={students[index].imgSrc}
                                deleteBtn={() => onDeleteHandler(s.id)}
                                editBtn={() => onEditClickHandler(s)}
                            />
                            <EditStudent
                                trigger={editButtonPopups[s.id]}
                                setTrigger={()=>setTrigger(s.id)}
                                editStudent={() => onEditStudentHandler(s)}
                                inputChanged={(e) => twoWayBindingEdit(e,index)}
                                fNameVal={editedStudents[s.id].fname}
                                lNameVal={editedStudents[s.id].lname}
                                ageVal={editedStudents[s.id].age}
                                imgSrcVal={editedStudents[s.id].imgSrc}
                                gender={editedStudents[s.id].gender}
                                genderChanged={(gender) => onEditGenderChange(gender,index)}
                            />
                        </Grid.Column>
                    )
                }

            </Grid>

        </div>
    )
}

export default StudentList