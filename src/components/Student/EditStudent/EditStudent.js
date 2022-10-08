import React from 'react'
import './EditStudent.css'
import { Form, Icon } from 'semantic-ui-react'

function EditStudent(props) {
    return (props.trigger) ? (
        <div>
            <Form >
                <Form.Group widths='equal'>
                    <Form.Input fluid label='First name' placeholder='First name' name="fname" value={props.fNameVal} onChange={props.inputChanged} />
                    <Form.Input fluid label='Last name' placeholder='Last name' name="lname" value={props.lNameVal} onChange={props.inputChanged} />
                    <Form.Input fluid label='Age' placeholder='Age' name="age" value={props.ageVal} onChange={props.inputChanged} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Image URL' placeholder='Image URL' name="imgSrc" value={props.imgSrcVal} onChange={props.inputChanged} />
                </Form.Group>
                <Form.Group inline>
                    <label>Gender</label>
                    <Form.Radio
                        label='Male'
                        name="gender"
                        checked={
                            props.gender === "Male" ? true : false
                        }
                        value="male"
                        onChange={()=>props.genderChanged('male')}
                    />
                    <Form.Radio
                        label='Female'
                        name="gender"
                        checked={
                            props.gender === "Female" ? true : false
                        }
                        value="female"
                        onChange={()=>props.genderChanged('female')}
                    />
                </Form.Group>
                <Form.Group inline>
                    <Form.Button type="button"  width={9} color='green' onClick={()=>props.editStudent()}><Icon name='add' />Edit Student</Form.Button>
                    <Form.Button type="button" onClick={props.setTrigger}><Icon name='close' />Close</Form.Button>
                </Form.Group>
            </Form>

            {props.children}
        </div>
    ) : "";
}

export default EditStudent