import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../../redux/actions";


const validate = (input) => {
    let errors = {}

    if (!input.name) {
        errors.name = 'Name required'
    } else if (input.name && !/^[a-zA-Z]*$/.test(input.name)) {
        errors.name = 'The name cannot contain numbers or special characters'
    }


    if (!input.height_min || input.height_min <= 0) {
        errors.height_min = 'Minimum height is required'
    }
    if (!input.height_max || input.height_max <= 0) {
        errors.height_max = 'Maximum height is required'
    }


    if (!input.weight_min || input.weight_min <= 0) {
        errors.weight_min = 'Minimum weight is required'
    }
    if (!input.weight_max || input.weight_max <= 0) {
        errors.weight_max = 'Maximum weight is required'
    }


    if (input.height_min >= input.height_max) {
        errors.aux = 'The minimum height cannot be bigger or equal than the maximum'
    }
    if (input.weight_min >= input.weight_max) {
        errors.aux2 = 'The minimum weight cannot be bigger or equal than the maximum'
    }


    if (input.height) {
        if (!/^[0-9]*$/) {
            errors.height = 'Only numbers allowed'
        }
    }
    if (input.weight_min) {
        if (input.weight_max) {
            if (!/^[0-9]*$/) {
                errors.weight_min = 'Only numbers allowed'
            }
        }
    }


    if (!input.life_span || input.life_span <= 0) {
        errors.life_span = 'Life span is required'
    }
    if (input.life_span) {
        if (!/^[0-9]*$/) {
            errors.life_span = 'Only numers allowed'
        }
    }

    return errors
};



export default function CreateDog() {

    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.allTemperaments);
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span: 0,
        image: '',
        temperament: []
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input);
    };

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    };

    function handleReset(e) {
        setInput({
            ...input,
            temperament: []
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postDog(input))
        alert('The dog was created!')
        setInput({
            name: '',
            height_min: 0,
            height_max: 0,
            weight_min: 0,
            weight_max: 0,
            life_span: 0,
            image: '',
            temperament: []
        })
        history.push('/home')
    };

    function handleDelete(e) {
        setInput({
            ...input,
            temperament: input.temperament.filter((d) => d !== e)
        })
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);
    //console.log(allTemperaments);

    return (
        <div>
            <Link to='/home'><button>Back home</button></Link>
            <h1>Create dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>NAME:</label>
                    <input
                        type="text"
                        value={input.name}
                        name='name'
                        onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.name && (
                        <p>{errors.name}</p>
                    )} */}
                </div>
                <div>
                    <label>HEIGHT MIN:</label>
                    <input
                        type="number"
                        value={input.height_min}
                        name='height_min'
                        onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.height_min && (
                        <p>{errors.height_min}</p>
                    )}
                    {errors.aux && (
                        <p>{errors.aux}</p>
                    )}
                    {errors.height && (
                        <p>{errors.height}</p>
                    )} */}
                </div>
                <div>
                    <label>HEIGHT MAX:</label>
                    <input
                        type="number"
                        value={input.height_max}
                        name='height_max'
                        onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.height_max && (
                        <p>{errors.height_max}</p>
                    )}
                    {errors.height && (
                        <p>{errors.height}</p>
                    )} */}
                </div>
                <div>
                    <label>WEIGHT MIN:</label>
                    <input
                        type="number"
                        value={input.weight_min}
                        name='weight_min'
                        onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.weight_min && (
                        <p>{errors.weight_min}</p>
                    )}
                    {errors.aux2 && (
                        <p>{errors.aux2}</p>
                    )} */}
                </div>
                <div>
                    <label>WEIGHT MAX:</label>
                    <input
                        type="number"
                        value={input.weight_max}
                        name='weight_max'
                        onChange={(e) => handleChange(e)}
                    />
                    {/*  {errors.weight_max && (
                        <p>{errors.weight_max}</p>
                    )} */}
                </div>
                <div>
                    <label>LIFE SPAN:</label>
                    <input
                        type="number"
                        value={input.life_span}
                        name='life_span'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>IMAGE:</label>
                    <input
                        type="text"
                        value={input.image}
                        name='image'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <h4>TEMPERAMENTS</h4>
                    <select onChange={(e) => handleSelect(e)}>
                        {allTemperaments.map((temp) => {
                            return (
                                <option key={temp.id} value={temp.name}>{temp.name}</option>
                            )
                        })}
                    </select>
                </div>
                {
                    errors &&
                        (errors.name ||
                            errors.height_min ||
                            errors.height_max ||
                            errors.weight_min ||
                            errors.weight_max ||
                            errors.aux ||
                            errors.aux ||
                            errors.life_span ||
                            !input.name.length ||
                            input.height_min <= 0 ||
                            input.height_max <= 0 ||
                            input.weight_min <= 0 ||
                            input.weight_max <= 0 ||
                            input.life_span <= 0 ||
                            input.height_min >= input.height_max ||
                            input.weight_min >= input.weight_max ||
                            !input.temperament.length)
                        ?

                        <div>The dog cannot be created</div>
                        :
                        <div>
                            <button type="submit">Create Dog</button>
                        </div>
                }
            </form>
            <div>
                <ul>{input.temperament.map((d, i) => {
                    return (
                        <div key={i++}>
                            <li>{d}</li>
                            <button onClick={() => handleDelete(d)}>X</button>
                        </div>
                    )
                })}
                </ul>
                <button type="button" onClick={(e) => handleReset(e)}>Reset temperaments</button>
            </div>

            <div>
                <h4>ERRORS:</h4>
                <div>
                    <h4>
                        {errors.name && (
                            <p> {errors.name} </p>
                        )}
                    </h4>

                    <h4>
                        {errors.height_min && (
                            <p>{errors.height_min}</p>
                        )}
                    </h4>

                    <h4>
                        {errors.height_max && (
                            <p>{errors.height_max}</p>
                        )}
                    </h4>

                    <h4>
                        {errors.weight_min && (
                            <p>{errors.weight_min}</p>
                        )}
                    </h4>

                    <h4>
                        {errors.weight_max && (
                            <p>{errors.weight_max}</p>
                        )}
                    </h4>

                    <h4>
                        {errors.life_span && (
                            <p>{errors.life_span}</p>
                        )}
                    </h4>

                    <h4>
                        {errors.temperament && (
                            <p>{errors.temperament}</p>
                        )}
                    </h4>

                    <h4>
                        {errors.aux && (
                            <p>{errors.aux}</p>
                        )}
                    </h4>

                    <h4>
                        {errors.aux2 && (
                            <p>{errors.aux2}</p>
                        )}
                    </h4>
                </div>
            </div>
        </div>
    )
}