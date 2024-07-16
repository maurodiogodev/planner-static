const formater = (date) => {
    return {
        day: {
            numeric: dayjs(date).format('DD'),
            dayoftheweek: {
                short: dayjs(date).format('ddd'),
                extended: dayjs(date).format('dddd')
            }
        },
        time: dayjs(date).format('hh:mm'),
        month: dayjs(date).format('MMMM'),
    }
}

const activity = {
    name: "Almoçar",
    date: new Date("2025-04-26 09:30"),
    completed: true
}

let activities = [
    activity,
    {
        name: "Academia em grupo",
        date: new Date("2025-04-27 13:30"),
        completed: false
    },
    {
        name: "Gaming session",
        date: new Date("2025-04-27 16:30"),
        completed: true
    },
]

// activities = []

const createActivity = (activity) => {

    let input = `
        <input
            onchange='completeActivity(event)'
            value='${activity.date}'
            type='checkbox' 
    `

    if (activity.completed) {
        input += 'checked'
    }

    input += '>'

    const format = formater(activity.date)

    return `
        <div class="card-bg">
            ${input}
            
            <div>

                <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50008 9.99999L9.16675 11.6667L12.5001 8.33332M18.3334 9.99999C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 9.99999C1.66675 5.39762 5.39771 1.66666 10.0001 1.66666C14.6025 1.66666 18.3334 5.39762 18.3334 9.99999Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41664 1.81833C9.46249 1.61593 10.5374 1.61593 11.5833 1.81833M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10083C15.5587 3.70019 16.3197 4.46406 16.9158 5.35083M1.8183 11.5833C1.6159 10.5375 1.6159 9.46252 1.8183 8.41667M16.8991 14.6742C16.2998 15.5587 15.5359 16.3198 14.6491 16.9158M18.1816 8.41667C18.384 9.46252 18.384 10.5375 18.1816 11.5833M3.1008 5.32583C3.70016 4.44128 4.46403 3.68023 5.3508 3.08417M5.3258 16.8992C4.44124 16.2998 3.6802 15.5359 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <span>${activity.name}</span>
            
            </div>

            <time class="short">
                ${format.day.dayoftheweek.short}.
                ${format.day.numeric} <br>
                ${format.time}
            </time>
            <time class="full">${format.day.dayoftheweek.extended}, 
            dia ${format.day.numeric} 
            de ${format.month} 
            às ${format.time}h</time>
        </div>
    `
}

const updateActivitiesList = () => {

    const section = document.querySelector("section")
    section.innerHTML = ''

    if (activities.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
        return
    }

    for (let activity of activities) {
        section.innerHTML += createActivity(activity)
    }
}

updateActivitiesList()

const saveActivity = (event) => {
    event.preventDefault()

    const formDatas = new FormData(event.target)

    const name = formDatas.get('activity')
    const day = formDatas.get('day')
    const time = formDatas.get('time')
    const date = `${day} ${time}`

    const newActivity = {
        name,
        date,
        completed: false
    }

    const alreadyBookedActivity = activities.find((activity) => {
        return activity.date == newActivity.date
    })

    if (alreadyBookedActivity) {
        return alert('Horário com atividade já agendada!')
    }

    activities = [newActivity, ...activities]

    updateActivitiesList()
}

const createDaysAvailableForScheduling = () => {

    const days = [
        '2024-02-28',
        '2024-02-29',
        '2024-03-01',
        '2024-03-02',
        '2024-03-03',
        '2024-03-04',
    ]

    let daysAvailableForScheduling = ''

    for (const day of days) {

        const format = formater(day)

        const formatedDay = `
            ${format.day.numeric}
            de ${format.month}
        `

        daysAvailableForScheduling += `<option value="${day}">${formatedDay}</option>`
    }

    document
        .querySelector("select[name='day']")
        .innerHTML = daysAvailableForScheduling
}

createDaysAvailableForScheduling()

const createTimesAvailableForScheduling = () => {

    let timesAvailableForScheduling = ''

    for (let i = 6; i < 23; i++) {

        const time = String(i).padStart(2, '0')

        timesAvailableForScheduling += `<option value="${time}:00">${time}:00</option>`
        timesAvailableForScheduling += `<option value="${time}:30">${time}:30</option>`

        document
            .querySelector("select[name='time']")
            .innerHTML = timesAvailableForScheduling
    }
}

createTimesAvailableForScheduling()

const completeActivity = (event) => {

    const input = event.target
    const activityDate = input.value

    const activityChanging = activities.find((activity) => {
        return activity.date == activityDate
    })

    if (!activityChanging) {
        return
    }

    activityChanging.completed = !activityChanging.completed

}