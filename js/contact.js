function validateInput() {
    //create instances referring the obj from the html DOM
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!nameCheck(name)) {
        alert("please check your entered name: minimum two characters and only alpha");
        return false;
    }
    if (!emailCheck(email)) {
        alert("Please check your email format");
        return false;
    }
}

function nameCheck(name) {
    //set restriction for name, only alpha [a-zA-Z ], only two characters
    const name_regex = /^[a-zA-Z]{2,}\s?[a-zA-Z]{2,}?$/;
    //check if lastname firstname meet the requirements
    if (!name.match(name_regex)) {
        let warning = document.getElementById("warning_invalid");
        warning.innerHTML = "Name did not match pattern of: 1 letter or 2 letters \
            (no numbers or special characters)!";
        warning.setAttribute("class", "warnings");
        return false;
    }
    return true;
}

function emailCheck(email) {
    //set restriction for name, only alpha [a-zA-Z ], only two characters
    const regex_email = /^\S{2,64}@[\S{1,}\.\w{2,}]{4,253}$/;
    //check the facilitator in current semester
    if (!email.match(regex_email)) {
        let warning = document.getElementById("warning_invalid");
        warning.innerHTML = "Invalid email! Are you sure that is really your email?";
        warning.setAttribute("class", "warnings");
        return false;
    }
    return true;
}
