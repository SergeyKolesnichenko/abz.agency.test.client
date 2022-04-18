import {useEffect, useRef, useState} from "react";
import UserCard from "./UserCard";
import ApiSupply from "./ApiSupply";
import {Box, Button, Container, Grid, Stack} from "@mui/material";

const countOfUsers = 6

function UserView() {

    const [users, setUsers] = useState([])
    let next_url = useRef(null)

    useEffect(() => {
        ApiSupply.loadUsersList(1, countOfUsers, (result) => {
            if(result.success) {
                setUsers(result.users)
                next_url.current = result.links.next_url;
            }
        })
    }, [])

    function viewMoreButtonClick() {
        console.log(`Here: ${next_url.current}`)

        if(next_url.current) {
            ApiSupply.loadUsersListFromLink(next_url.current, (result) => {
                if(result.success) {
                    setUsers(users.concat(result.users))
                    next_url.current = result.links.next_url;
                }
            })
        }
    }

    let viewMoreButton = null;

    if(next_url.current) {
        viewMoreButton = (
            <Stack  sx={{m: 2}} spacing={2} direction="row" justifyContent="center" alignItems="center">
                <Button variant="outlined" onClick={viewMoreButtonClick}>View more</Button>
            </Stack>
        )
    }

    return (
        <Box>
            <Grid container spacing={1} justifyContent="center">
                {users.map((user, index) =>
                    <Grid item key={index}>
                        <UserCard
                            id={user.id}
                            name={user.name}
                            phone={user.phone}
                            email={user.email}
                            position={user.position}
                            photo={user.photo}
                        />
                    </Grid>)}
            </Grid>

            {viewMoreButton}
        </Box>

    )
}

export default UserView;