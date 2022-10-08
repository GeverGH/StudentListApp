import React from 'react'
import "./Student.css"

import { Button, Card, Icon, Image } from 'semantic-ui-react';

function Student(props) {
    return (
        <div>
            <Card>
                <Image src={props.imgSrc} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{props.fname} {props.lname}</Card.Header>
                    <Card.Meta>
                        <span>{props.age}</span>
                    </Card.Meta>
                    <Card.Description>
                        {props.gender}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <div className='ui two buttons'>
                        <Button color='red' onClick={props.deleteBtn} ><Icon name='trash alternate outline'/></Button>
                        <Button color='grey' onClick={props.editBtn}><Icon name='edit outline'/></Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}

export default Student;
