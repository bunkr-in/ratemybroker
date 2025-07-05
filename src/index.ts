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

// Define the Env interface
interface Env {
	// If you had other bindings (e.g., KV, R2, Services), they would go here.
	// ASSETS is handled implicitly by the runtime when configured in wrangler.jsonc
	// and doesn't typically appear in Env unless explicitly bound with a 'binding' name.
}

// Hardcoded broker data (overallRating will be calculated on fetch)
const brokerData: any[] = [
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
				organization: "NPropcare",
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
			},
			{
				name: "Vijay",
				organization: "Sri Krishna Enterprises",
				phone: "+917624952111",
				city: "Bangalore",
				localities: "Indiranagar, Eshwara Layout, Hoysala Nagar, Binnamangala",
				responsiveness: 4,
				qualityOfHouses: 4,
				areaNiceness: 4,
			},
			{
				name: "Adnan",
				organization: "Don't know",
				phone: "+919591473864",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout",
				responsiveness: 4,
				qualityOfHouses: 4,
				areaNiceness: 4,
			},
			{
				name: "Balaji",
				organization: "Balakrishna Enterprises",
				phone: "+919686078192",
				city: "Bangalore",
				localities: "Indirangar, Eshwara Layout",
				responsiveness: 2,
				qualityOfHouses: 3.5,
				areaNiceness: 3,
			},
			{
				name: "Imran MH",
				organization: "Fincaconnect",
				phone: "+919591373055",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout",
				responsiveness: 4,
				qualityOfHouses: 3.5,
				areaNiceness: 3,
			},
			{
				name: "Arun",
				organization: "Don't know",
				phone: "+919731214378",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout",
				responsiveness: 1,
				qualityOfHouses: 3.5,
				areaNiceness: 3,
			},
			{
				name: "Mani",
				organization: "Manjunath Real Estate",
				phone: "+919047243650",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout",
				responsiveness: 2,
				qualityOfHouses: 3.5,
				areaNiceness: 3,
			},
			{
				name: "M Usha Reddy",
				organization: "Don't know",
				phone: "+919066597514",
				city: "Bangalore",
				localities: "Indirangar, Kodihalli, Eshwara Layout",
				responsiveness: 3.5,
				qualityOfHouses: 4,
				areaNiceness: 4,
			},
		];



export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		switch (url.pathname) {
			case '/message':
				return new Response('Hello, World!');
			case '/random':
				return new Response(crypto.randomUUID());
			case '/api/brokers': {
				if (request.method === "GET") {
					const brokersWithCalculatedRating = (brokerData || []).map(broker => {
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
				} else {
					// For POST or any other method to /api/brokers
					return new Response('Method Not Allowed: Cannot modify hardcoded list.', { status: 405 });
				}
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
