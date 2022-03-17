export default class Provider {
    
	static getIdentityProviders() {
		return [
			{
				id: "inrupt",
				label: "Inrupt",
				image: "img/inrupt.svg",
				value: "https://inrupt.net/auth",
				registerLink: "https://inrupt.net/register",
			},
			{
				id: "solid-community",
				label: "Solid Community",
				image: "img/Solid.png",
				value: "https://solid.community",
				registerLink: "https://solid.community/register",
			}
		];
	}
}