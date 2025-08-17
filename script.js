import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // Ramp up to 100 virtual users in 1 minute
        { duration: '3m', target: 100 }, // Stay at 100 users for 3 minutes
        { duration: '1m', target: 0 },   // Ramp down to 0 users in 1 minute
    ],
};

export default function () {
    let url = 'http://localhost:3100/loki/api/v1/push';
    let payload = JSON.stringify({
        streams: [
            {
                stream: { job: 'test' },
                values: [[String(Date.now() * 1e6), 'This is a log line']],
            },
        ],
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);
    check(res, {
        'is status 204': (r) => r.status === 204,
    });
    sleep(1);
}

