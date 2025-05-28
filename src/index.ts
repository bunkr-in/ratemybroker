/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Define the Env interface, including the Durable Object binding
interface Env {
	BROKER_STORE: DurableObjectNamespace;
	// If you had other bindings (e.g., KV, R2, Services), they would go here.
	// ASSETS is handled implicitly by the runtime when configured in wrangler.jsonc
	// and doesn't typically appear in Env unless explicitly bound with a 'binding' name.
}

// Define the Durable Object class
export class BrokerDataStore implements DurableObject {
	// state: DurableObjectState; // No longer needed for storage
	env: Env;
	private brokerData: any[]; // Store broker data in memory

	constructor(state: DurableObjectState, env: Env) {
		// this.state = state; // No longer needed for storage
		this.env = env;

		// Hardcoded broker data (overallRating will be calculated on fetch)
		this.brokerData = [
			{
				name: "Suresh",
				organization: "Raj Properties",
				phone: "+919663964954",
				city: "Bangalore",
				localities: "Indiranagar, Kodihalli, Tippasandra, Hoysala Nagar",
				responsiveness: 4,
				qualityOfHouses: 3.5,
				areaNiceness: 3,
			},
			{
				name: "Kumar",
				organization: "Don't know",
				phone: "+919972229737",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout",
				responsiveness: 4,
				qualityOfHouses: 3.5,
				areaNiceness: 3,
			},
			{
				name: "Aadithya",
				organization: "Krishna Properties",
				phone: "+919880096908",
				city: "Bangalore",
				localities: "Indirangar, Hoysala Nagar, Eshwara Layout",
				responsiveness: 3,
				qualityOfHouses: 4,
				areaNiceness: 3,
			},
			{
				name: "Raj",
				organization: "Arkay Consultants",
				phone: "+918105156687",
				city: "Bangalore",
				localities: "Indirangar, Defence Colony",
				responsiveness: 2,
				qualityOfHouses: 4,
				areaNiceness: 4,
			},
			{
				name: "Lathif",
				organization: "Embassy Property Consultant",
				phone: "+916364373100",
				city: "Bangalore",
				localities: "Indirangar, Hoysala Nagar, Tippasandra, Kodihalli, Domlur, Murgeshpalya",
				responsiveness: 2.5,
				qualityOfHouses: 4,
				areaNiceness: 2.5,
			},
			{
				name: "Sashi Menon",
				organization: "Don't know",
				phone: "+918147022675",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout",
				responsiveness: 4,
				qualityOfHouses: 3.5,
				areaNiceness: 3.5,
			},
			{
				name: "Rajesh",
				organization: "Don't know",
				phone: "+919986694035",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout, Defence Colony",
				responsiveness: 4,
				qualityOfHouses: 4,
				areaNiceness: 3.5,
			},
			{
				name: "N Mohammad",
				organization: "Don't know",
				phone: "+919606428941",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout, Hoysala Nagar",
				responsiveness: 2.5,
				qualityOfHouses: 4,
				areaNiceness: 3.5,
			},
			{
				name: "Vijay",
				organization: "Sri Subramaniya Enterprises",
				phone: "+8105581287",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout, Hoysala Nagar",
				responsiveness: 1,
				qualityOfHouses: 2,
				areaNiceness: 2,
			},
			{
				name: "Prasanth",
				organization: "Manjunath Realtors",
				phone: "+919945405777",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Domlur",
				responsiveness: 3,
				qualityOfHouses: 3,
				areaNiceness: 3,
			},
			{
				name: "Yogi",
				organization: "Manjunath Realtors",
				phone: "+919945405906",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Domlur",
				responsiveness: 3,
				qualityOfHouses: 3,
				areaNiceness: 3,
			}
		];
	}

	async fetch(request: Request): Promise<Response> {
		// const url = new URL(request.url); // Not strictly needed anymore for this logic

		if (request.method === "GET") {
			const brokersWithCalculatedRating = (this.brokerData || []).map(broker => {
				const overallRating = (broker.responsiveness + broker.qualityOfHouses + broker.areaNiceness) / 3;
				return {
					...broker,
					overallRating: parseFloat(overallRating.toFixed(2)) // Rounded to two decimal places
				};
			});

			// Sort brokers by overallRating in descending order
			const sortedBrokers = brokersWithCalculatedRating.sort((a, b) => b.overallRating - a.overallRating);

			return new Response(JSON.stringify(sortedBrokers), {
				headers: { 'Content-Type': 'application/json' },
			});
		} else if (request.method === "POST") {
			// POST requests are no longer supported as data is hardcoded
			return new Response('Method Not Allowed: Cannot add new brokers to hardcoded list.', { status: 405 });
		} else {
			return new Response('Method Not Allowed', { status: 405 });
		}
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		switch (url.pathname) {
			case '/message':
				return new Response('Hello, World!');
			case '/random':
				return new Response(crypto.randomUUID());
			case '/api/brokers': {
				// Get the Durable Object ID from a fixed name. This ensures you always
				// get the same instance of the Durable Object for this purpose.
				const id = env.BROKER_STORE.idFromName("allBrokers");
				// Get the Durable Object stub.
				const stub = env.BROKER_STORE.get(id);
				// Forward the request to the Durable Object and return its response.
				return stub.fetch(request);
			}
			default:
				// For requests that don't match an API route, Cloudflare Workers will
				// automatically attempt to serve static assets from the directory
				// specified in wrangler.jsonc ('./public' in this case).
				// If a matching asset is found, it's served. Otherwise, the runtime
				// typically returns a 404 or handles it based on its internal logic.
				// Explicitly returning a 404 here for unhandled paths ensures clarity if assets aren't found.
				return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
