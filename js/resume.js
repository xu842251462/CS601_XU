const url_resume = "https://gist.githubusercontent.com/xu842251462/68f3da2cccdb5becc8e7a989aacd76ff/raw/8196e15c9b6fffa9689d676f8099b72d7d715e59/resume.json";
getResume(url_resume);

//fetch data from public url
async function getResume(url) {
    await fetch(url).then(
        function (response) {
            console.log(response.status);
            if (!response.ok) {
                throw new Error("HTTP status" + response.status);
            }
            return response.json();
        }
    ).then(
        (resume) => processData(resume))
}

//using jquery to form the resume form
function processData(inputJson) {
    let header = inputJson.header;
    $('#header #full-name').append(
        $(`<span>${header.name.first}</span>`).attr({id: `first-name`, class: `first-name`}),
        $(`<span>${header.name.last}</span>`).attr({id: `last-name`, class: `last-name`})
    );
    $('#header #contact #email').append(header.contact.email);
    $('#header #contact #phone').append(header.contact.phone);
    $('#header #contact #website').append($(`<a href="${header.contact.website}">${header.contact.website}</a>`));

    let education = inputJson.education;
    education.forEach(education => {
        let edu_ele = $(`<div/>`, {class: `ele`}).appendTo(`#education`);
        edu_ele.append(
            $(`<div>`, {class: `flex-row`}).append(
                $(`<div>${education.name}</div>`).attr({class: `name`}),
                $(`<div>${education.location}</div>`).attr({class: `location`})
            ),
            $(`<div>`, {class: `flex-row`}).append(
                $(`<div>${education.degree}</div>`).attr({class: `degree`}),
                $(`<div>${education.duration}</div>`).attr({class: `duration`})
            )
        );
        let courses = $(`<ul/>`, {class: `flex-row courses`}).appendTo(edu_ele);
        education.courses.forEach(course => {
            courses.append(
                $(`<li>${course}</li>`, {class: `edu-course-li`})
            );
        });
    });

    let experience = inputJson.experience;
    experience.forEach(exp => {
        let exp_ele = $(`<div/>`, {class: `ele`}).appendTo(`#experience`);
        exp_ele.append(
            $(`<div>`, {class: `row`}).append(
                $(`<div>${exp.title}</div>`).attr({class: `col-5 job-title`}),
                $(`<div>${exp.loc}</div>`).attr({class: `col-4 loc`}),
                $(`<div>${exp.duration}</div>`).attr({class: `col-3 align-right duration`})
            )
        );
        let descriptions = $(`<ul/>`, {class: `desc list-pad`}).appendTo(exp_ele);
        exp.desc.forEach(desc => {
            descriptions.append(
                $(`<li>${desc}</li>`, {class: `exp-desc-li`})
            );
        });
    });

    const skills = inputJson.skills;
    const languages = skills.languages.join(', ');
    const frameworks = skills.frameworks.join(', ');
    const tools = skills.tools.join(', ');
    $(`#skills`).append(
        $(`<div>`, { class: `row`, id: `skills-categories` }).append(
            $(`<div>Languages</div>`).attr({ class: `languages col-3` }),
            $(`<div>Frameworks</div>`).attr({ class: `frameworks col-3` }),
            $(`<div>Tools/Cloud Platforms & Services</div>`).attr({ class: `tools col-6` })
        ),
        $(`<div>`, { class: `row`, id: `skills-items`}).append(
            $(`<div>${languages}</div>`).attr({ class: `col-3` }),
            $(`<div>${frameworks}</div>`).attr({ class: `col-3` }),
            $(`<div>${tools}</div>`).attr({ class: `col-6` })
        )
    );

}

