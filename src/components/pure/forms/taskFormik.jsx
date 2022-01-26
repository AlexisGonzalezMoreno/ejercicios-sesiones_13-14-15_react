import React, { useRef } from 'react';
import { LEVELS } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class'
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const loginShchema = Yup.object().shape(
    {
        taskName: Yup.string()
                .required('Task name is required'),
        taskDescription: Yup.string()
                .required('Task description is required'),
        level: Yup.string()
                .required('Level is required')
    }
);

const Taskformik = ({ add, lenght}) => {
    

    const initialCredentials = {
        taskName: '',
        taskDescription: '',
        completed: false,
        level: ''
    }

    const normalStyle = {
        color: 'blue',
        fontWeight: 'bold'
    }

    const urgentStyle = {
        color: 'yellow',
        fontWeight: 'bold'
    }

    const blockingStyle = {
        color: 'tomato',
        fontWeight: 'bold'
    }

    return (
        <div>
            <Formik
                //Initial values that the form will take
                initialValues={ initialCredentials }
                //Yup validation schema
                validationSchema={ loginShchema }
                //onSubmit event
                onSubmit={async (values) => {
                    await new Promise ((r) => setTimeout(r, 1000));
                    //We save the data in the localstorage
                    localStorage.setItem('credential', values);
                    const taskStr = JSON.stringify(values);
                    const array = [];
                    JSON.parse(taskStr, (key, value) => {
                        if(typeof value === 'string') {
                            array.push(value);
                        }
                    })

                    console.log(array);
                    let task = new Task(array[0], array[1], false, array[2])
                    add(task);
                }}
            >

            {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                    <Form>
                        <label htmlFor="taskName">Task name</label>
                        <Field id="taskName" type='text' name="taskName" placeholder="Insert task name" />

                        {/* Name errors */}
                        {
                            errors.taskName && touched.taskName &&
                            (
                                <ErrorMessage name='taskName' component='div' />
                            )
                        }

                        <label htmlFor="taskDescription">Task description</label>
                        <Field
                            id="taskDescription"
                            name="taskDescription"
                            placeholder="Insert task description"
                            type="text"
                        />

                        {/* Description errors */}
                        {
                            errors.taskDescription && touched.taskDescription &&
                            (
                                <ErrorMessage name='taskDescription' component='div' />
                            )
                        }

                        <label htmlFor="level">Level</label>
                        <select
                            name="level"
                            value={values.level}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ display: 'block' }}
                        >
                            <option value="" label="Select a level" />
                            <option style={ normalStyle } value="normal" label = { LEVELS.NORMAL } />
                            <option style={ urgentStyle } value="urgent" label = { LEVELS.URGENT } />
                            <option style={ blockingStyle } value="blocking" label = { LEVELS.BLOCKING } />
                        </select>

                        {/* Level errors */}
                        {
                            errors.level && touched.level &&
                            (
                                <ErrorMessage name='level' component='div' />
                            )
                        }

                        <button type="submit">
                            { lenght > 0 ? 'Add new task' : 'Create your first task'}
                        </button>
                        { isSubmitting ? (<p>Inserting task...</p>) : null }
                    </Form>
                 )}


            </Formik>
        </div>
    );
}

export default Taskformik;
