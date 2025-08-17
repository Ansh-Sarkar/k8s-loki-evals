import loki from 'k6/x/loki';

const timeout = 5000; // milliseconds
const conf = loki.Config("http://localhost:3000", timeout);
const client = loki.Client(conf);

export default () => {
	client.push();
}
