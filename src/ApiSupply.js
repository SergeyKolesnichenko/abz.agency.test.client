class ApiSupply {
    api = "https://testtaskabzagency.herokuapp.com/api/v1/"

    getToken(callback) {
        fetch(`${this.api}token`)
            .then(res => res.json())
            .then(
                result => callback(result),

                error => callback({
                        success: false,
                        message: "Connection problems"
                    }
                )
            )
    }

    loadPositionsList(callback) {
        fetch(`${this.api}positions`)
            .then(res => res.json())
            .then(

                result => callback(result),

                error => callback({
                        success: false,
                        message: "Connection problems"
                    }
                )
            )
    }

    loadUsersList(page, count, callback) {
        fetch(`${this.api}users?page=${page.toString()}&count=${count.toString()}`)
            .then(res => res.json())
            .then(

                result => callback(result),

                error => callback({
                        success: false,
                        message: "Connection problems"
                    }
                )
            )
    }

    loadUsersListFromLink(link, callback) {
        fetch(link)
            .then(res => res.json())
            .then(

                result => callback(result),

                error => callback({
                        success: false,
                        message: "Connection problems"
                    }
                )
            )
    }

    postNewUser(name, phone, email, position_id, photo, token, callback) {
        var myHeaders = new Headers();
        //myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Token", token);

        let formdata = new FormData();
        formdata.append("photo", photo);
        formdata.append("name", name);
        formdata.append("phone", phone);
        formdata.append("email", email);
        formdata.append("position_id", position_id);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata
        };

        fetch(`${this.api}users`, requestOptions)
            .then(res => res.json())
            .then(

                result => callback(result),

                error => callback({
                        success: false,
                        message: "Connection problems"
                    }
                )
            )
    }
}

export default new ApiSupply()