import {Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField} from "@mui/material";
import {Alert} from "@mui/lab";
import {useEffect, useState} from "react";
import ApiSupply from "./ApiSupply";
import {PhotoCamera} from "@mui/icons-material";


function AddingForm() {

    const [rawPositions, setRawPostions] = useState([])
    const [positions, setPositions] = useState([])

    useEffect(() => {
        ApiSupply.loadPositionsList(result => {
            if(result.success){
                setRawPostions(result.positions)
                setPositions(result.positions.map(i => i.name))
            }
        })
    }, [])

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);

    const [position, setPosition] = useState('');
    const [positionId, setPositionId] = useState(-1);

    const [messageList, setMessageList] = useState([])
    const [errorsList, setErrorsList] = useState([])


    useEffect(() => {
        let index = rawPositions.findIndex(x=>x.name === position)
        if(index !== -1)
            setPositionId(rawPositions[index].id)
    }, [position])


    const handleSelectChange = (event) => {
        setPosition(event.target.value);
    };

    const sendData = (event) => {
        ApiSupply.getToken((tokenInfo) => {
            if(!tokenInfo.success) {
                return
            }

            let { token } = tokenInfo

            if(positionId !== -1)
                ApiSupply.postNewUser(name, phone, email, positionId, file, token, (data) => {
                    console.log(data)

                    let errors = []
                    let messages = []

                    if(!data.success){
                        errors = ['Message: ' + data.message]

                        for(let i in data.fails){
                            for(let j of data.fails[i]){
                                errors.push(`${i}: ${j}`)
                            }
                        }
                    } else {
                        messages.push([`User with id=${data.user_id} was created`])
                        setName('')
                        setPhone('')
                        setEmail('')
                        setPosition('')
                        setPositionId(-1)
                    }

                    setErrorsList(errors)
                    setMessageList(messages)
                })
        })
    }

    return (
        <div className="AddingForm">
            <Stack spacing={2} justifyContent="center" alignItems="center">
                {errorsList.map(x=><Alert variant="filled" severity="error" sx={{width: 600}}>{x}</Alert>)}
                {messageList.map(x=><Alert variant="filled" severity="success" sx={{width: 600}}>{x}</Alert>)}
            </Stack>

            <Paper elevation={2} sx={{p: 2, m: 20, mt: 5}}>
                <Stack spacing={2} justifyContent="center" alignItems="center">
                    <TextField id="outlined-basic"
                               label="Name"
                               variant="outlined"
                               name="name"
                               sx={{width: 300}}
                               value={name}
                               onInput={e => setName(e.target.value)}
                    />

                    <TextField id="outlined-basic"
                               label="Email"
                               variant="outlined"
                               name="email"
                               sx={{width: 300}}
                               value={email}
                               onInput={e => setEmail(e.target.value)}
                    />

                    <TextField id="outlined-basic"
                               label="Phone"
                               variant="outlined"
                               name="phone"
                               sx={{width: 300}}
                               value={phone}
                               onInput={e => setPhone(e.target.value)}
                    />

                    <FormControl>
                        <InputLabel id="positionLabel">Position</InputLabel>
                        <Select
                            labelId="positionLabel"
                            id="demo-simple-select"
                            value={position}
                            label="Position"
                            onChange={handleSelectChange}
                            sx={{ width: 300 }}
                        >
                            {positions.map((i) => <MenuItem value={i}>{i}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <Button variant="contained" startIcon={<PhotoCamera/>} component="label" sx={{ width: 300 }}>
                        Upload File
                        <input type="file" onChange={x=>setFile(x.target.files[0])} hidden required/>
                    </Button>

                    <Button variant="contained" component="label" sx={{ width: 300 }}>
                        Confirm
                        <button onClick={sendData} hidden></button>
                    </Button>
                </Stack>
            </Paper>


        </div>
    )
}

export default AddingForm;