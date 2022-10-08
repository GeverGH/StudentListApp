import React from 'react'
import { Form, Icon } from 'semantic-ui-react'

function AddStudent(props) {
    return (props.trigger) ? (
        <div>
            
                <Form >
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='First name' placeholder='First name' name="fname" onChange={props.inputChanged} />
                        <Form.Input fluid label='Last name' placeholder='Last name' name="lname" onChange={props.inputChanged} />
                        <Form.Input fluid label='Age' placeholder='Age' name="age" onChange={props.inputChanged} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Image URL' placeholder='Image URL' name="imgSrc" onChange={props.inputChanged} />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Gender</label>
                        <Form.Radio
                            label='Male'
                            name='gender' 
                            value="male" 
                            onChange={()=>props.genderRadioChanged('male')}
                        />
                        <Form.Radio
                            label='Female'
                            name='gender' 
                            value="female" 
                            onChange={()=>props.genderRadioChanged('female')}
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <Form.Button width={9} color='green' onClick={props.addNewStudent}><Icon name='add' />Add Student</Form.Button>
                        <Form.Button onClick={() => props.setTrigger(false)}><Icon name='close' />Close</Form.Button>
                    </Form.Group>
                </Form>
            
            {props.children}
        </div>
    ) : "";
}

export default AddStudent;