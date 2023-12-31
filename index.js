const express = require('express');
const { URL } = require('url');
const { format } = require('date-fns');
const app = express();
const port = process.env.PORT || 3000;



app.get('/api', (req, res) => {
    try{
        const { slack_name, track } = req.query;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const current_day = daysOfWeek[new Date().getDay()];
        const current_time = new Date();
        const utc_time = format(current_time, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        const github_file_url = new URL('https://github.com/Fredrick-A-prime/HNG-TASK-1/blob/main/index.js')
        const github_repo_url = new URL('https://github.com/Fredrick-A-prime/HNG-TASK-1')

        const data = {
            slack_name,
            current_day,
            utc_time,
            track,
            github_file_url,
            github_repo_url,
            status_code: 200
        }
        res.status(200).json(data)
    } catch (error) {res.status(400).json('error')}
})

app.listen(port, () => console.log('API running on port 3000'));