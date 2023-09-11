const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { URL } = require('url');



app.get('/api', (req, res) => {
    try{
        const { slack_name, track } = req.query;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const current_day = daysOfWeek[new Date().getDay()];
        const current_time = new Date();
        const current_time_iso = current_time.toISOString();
        const twoMinutesAgo = new Date(current_time.getTime() - 120000);
        const timeDifferenceInMilliseconds = current_time - twoMinutesAgo;

        if (timeDifferenceInMilliseconds > 120000) {
            return res.status(400).json({ error: 'Time validation failed' });
        }
        const utc_time = current_time_iso.slice(0, -1);
        const github_file_url = new URL('https://github.com/username/repo/blob/main/file_name.ext')
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
        res.status(201).json(data)
    } catch (error) {res.status(400).json('error')}
})

app.listen(port, () => console.log('API running on port 3000'));