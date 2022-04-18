import {useEffect, useState} from "react";
import {Avatar, Card, CardContent, CardHeader, Typography} from "@mui/material";

function UserCard(props) {

    return (
        <div className="UserCard">
            <Card sx={{maxWidth: 345, minWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={props.name}
                            src={props.photo}
                        ></Avatar>
                    }

                    title={props.name}
                    subheader={`ID: ${props.id}`}
                    />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Phone number: {props.phone}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Email: {props.email}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Position: {props.position}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserCard;