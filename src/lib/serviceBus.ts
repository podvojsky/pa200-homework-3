import { ServiceBusClient, ServiceBusMessage } from '@azure/service-bus';

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING!;
const queueName = process.env.SERVICE_BUS_QUEUE_NAME!;

const sbClient = new ServiceBusClient(connectionString);
const sender = sbClient.createSender(queueName);

export async function sendToQueue(messages: ServiceBusMessage[] | ServiceBusMessage) {
	if (Array.isArray(messages)) {
		console.log(messages);
		await sender.sendMessages(messages);
	} else {
		await sender.sendMessages([messages]);
	}
}